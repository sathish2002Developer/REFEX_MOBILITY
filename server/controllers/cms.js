const fs = require("fs");
const path = require("path");
const { CmsPage } = require("../models");
const status = require("../helpers/response");

const ALLOWED_SLUGS = new Set([
  "home",
  "drive-for-us",
  "business-commute",
  "employee-transportation",
  "rac",
  "terms-and-conditions",
  "privacy-policy",
  "refunds-and-cancellation-policy",
]);
const CMS_JSON_PATH = path.join(__dirname, "../config/cms.json");
const SEED_PATHS = {
  home: path.join(__dirname, "../seeds/home_page.json"),
  "drive-for-us": path.join(__dirname, "../seeds/drive_for_us.json"),
  "business-commute": path.join(__dirname, "../seeds/business_commute_page.json"),
  "employee-transportation": path.join(__dirname, "../seeds/employee_transportation_page.json"),
  rac: path.join(__dirname, "../seeds/rac_landing_page.json"),
  "terms-and-conditions": path.join(__dirname, "../seeds/terms_and_conditions.json"),
  "privacy-policy": path.join(__dirname, "../seeds/privacy_policy.json"),
  "refunds-and-cancellation-policy": path.join(__dirname, "../seeds/refunds_and_cancellation.json"),
};

// When DB sync is skipped / optional, never wait on MySQL DNS timeouts for CMS.
const CMS_SNAPSHOT_ONLY =
  process.env.SKIP_DB_SYNC === "true" || process.env.START_WITHOUT_DB === "true";
let dbReadsEnabled = !CMS_SNAPSHOT_ONLY;

function formatPage(row) {
  if (!row) return null;
  return {
    slug: row.slug,
    pageTitle: row.page_title,
    metaDescription: row.meta_description,
    sections: row.sections || {},
    isActive: row.is_active,
    updatedAt: row.updated_at,
  };
}

function readJsonFile(filePath) {
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf-8").replace(/^\uFEFF/, "");
  return JSON.parse(raw);
}

function readCmsJsonSnapshot() {
  try {
    const payload = readJsonFile(CMS_JSON_PATH);
    return payload?.data || null;
  } catch (error) {
    console.warn("[CMS] Failed to read cms.json:", error.message);
    return null;
  }
}

function deepMergeObjects(base = {}, override = {}) {
  const merged = { ...base }
  Object.keys(override).forEach((key) => {
    const baseVal = base[key]
    const overrideVal = override[key]
    // Arrays from DB/admin always win (add/remove logos, FAQ, etc.)
    if (Array.isArray(overrideVal)) {
      merged[key] = overrideVal
      return
    }
    if (
      baseVal &&
      overrideVal &&
      typeof baseVal === 'object' &&
      typeof overrideVal === 'object' &&
      !Array.isArray(baseVal)
    ) {
      merged[key] = deepMergeObjects(baseVal, overrideVal)
    } else if (overrideVal !== undefined) {
      merged[key] = overrideVal
    }
  })
  return merged
}

function shouldUseSnapshotMeta(dbPage, snapshot) {
  if (!snapshot?.pageTitle) return false
  const title = String(dbPage.pageTitle || '').trim()
  const desc = String(dbPage.metaDescription || '').trim()
  if (!title || /test/i.test(title)) return true
  if (!desc || /^test$/i.test(desc) || desc.length < 30) return true
  return false
}

function mergePageWithSnapshot(dbPage, slug) {
  const snapshot = getPageFromSnapshot(slug)
  if (!snapshot) return dbPage

  const dbTime = new Date(dbPage.updatedAt || 0).getTime() || 0
  const snapTime = new Date(snapshot.updatedAt || 0).getTime() || 0
  // Prefer the newer source so snapshot-only admin saves (DB down) are not
  // overwritten by stale DB rows that still contain deleted logos.
  const newer = snapTime > dbTime ? snapshot : dbPage
  const older = snapTime > dbTime ? dbPage : snapshot

  const merged = {
    ...older,
    ...newer,
    sections: deepMergeObjects(older.sections || {}, newer.sections || {}),
    updatedAt: newer.updatedAt || older.updatedAt,
  }

  if (shouldUseSnapshotMeta(merged, snapshot)) {
    merged.pageTitle = snapshot.pageTitle || merged.pageTitle
    merged.metaDescription = snapshot.metaDescription || merged.metaDescription
  }

  return merged
}

function getPageFromSnapshot(slug) {
  const data = readCmsJsonSnapshot();
  if (data?.[slug]) return data[slug];

  const seedPath = SEED_PATHS[slug];
  if (seedPath) {
    const seed = readJsonFile(seedPath);
    if (seed) {
      return {
        slug: seed.slug,
        pageTitle: seed.pageTitle,
        metaDescription: seed.metaDescription,
        sections: seed.sections || {},
        isActive: true,
      };
    }
  }
  return null;
}

function writePageToSnapshot(slug, pageData) {
  let payload = { updatedAt: new Date().toISOString(), data: {} };
  try {
    if (fs.existsSync(CMS_JSON_PATH)) {
      payload = JSON.parse(fs.readFileSync(CMS_JSON_PATH, "utf-8"));
      if (!payload.data) payload.data = {};
    }
  } catch (_) {
    payload = { updatedAt: new Date().toISOString(), data: {} };
  }
  payload.data[slug] = pageData;
  payload.updatedAt = new Date().toISOString();
  fs.mkdirSync(path.dirname(CMS_JSON_PATH), { recursive: true });
  fs.writeFileSync(CMS_JSON_PATH, `${JSON.stringify(payload, null, 2)}\n`, "utf-8");
}

async function syncCmsJsonSnapshot() {
  try {
    const rows = await CmsPage.findAll({ order: [["slug", "ASC"]] });
    const data = {};
    for (const row of rows) {
      data[row.slug] = formatPage(row);
    }
    const payload = { updatedAt: new Date().toISOString(), data };
    fs.mkdirSync(path.dirname(CMS_JSON_PATH), { recursive: true });
    fs.writeFileSync(CMS_JSON_PATH, `${JSON.stringify(payload, null, 2)}\n`, "utf-8");
  } catch (error) {
    console.warn("[CMS] syncCmsJsonSnapshot skipped:", error.message);
  }
}

exports.listPages = async (req, res) => {
  try {
    if (dbReadsEnabled) {
      try {
        const rows = await CmsPage.findAll({
          where: { is_active: true },
          order: [["slug", "ASC"]],
        });
        return status.responseStatus(res, 200, "CMS pages retrieved successfully", {
          pages: rows.map(formatPage),
        });
      } catch (dbError) {
        dbReadsEnabled = false;
        console.warn("[CMS] DB disabled after listPages failure:", dbError.message);
      }
    }

    const data = readCmsJsonSnapshot();
    if (data) {
      return status.responseStatus(res, 200, "CMS pages retrieved successfully", {
        pages: Object.values(data),
      });
    }
    return status.responseStatus(res, 500, "Error fetching CMS pages");
  } catch (error) {
    console.error("[CMS] listPages error:", error);
    return status.responseStatus(res, 500, "Error fetching CMS pages", null, error.message);
  }
};

exports.getPageBySlug = async (req, res) => {
  try {
    const slug = String(req.params.slug || "").trim();
    if (!ALLOWED_SLUGS.has(slug)) {
      return status.responseStatus(res, 404, "CMS page not found");
    }

    // Snapshot-first / snapshot-only: avoid multi-second MySQL DNS timeouts that
    // delay landing sections (Problem/Fix, logos, etc.) after refresh.
    if (!dbReadsEnabled) {
      const snapshotPage = getPageFromSnapshot(slug);
      if (snapshotPage) {
        return status.responseStatus(res, 200, "CMS page retrieved successfully", snapshotPage);
      }
      return status.responseStatus(res, 404, "CMS page not found");
    }

    let row = null;
    try {
      row = await CmsPage.findOne({ where: { slug, is_active: true } });
    } catch (dbError) {
      dbReadsEnabled = false;
      console.warn("[CMS] DB disabled after read failure, using snapshot:", dbError.message);
    }

    if (row) {
      return status.responseStatus(
        res,
        200,
        "CMS page retrieved successfully",
        mergePageWithSnapshot(formatPage(row), slug)
      );
    }

    const snapshotPage = getPageFromSnapshot(slug);
    if (snapshotPage) {
      return status.responseStatus(res, 200, "CMS page retrieved successfully", snapshotPage);
    }

    return status.responseStatus(res, 404, "CMS page not found");
  } catch (error) {
    console.error("[CMS] getPageBySlug error:", error);
    const snapshotPage = getPageFromSnapshot(String(req.params.slug || "").trim());
    if (snapshotPage) {
      return status.responseStatus(res, 200, "CMS page retrieved successfully", snapshotPage);
    }
    return status.responseStatus(res, 500, "Error fetching CMS page", null, error.message);
  }
};

exports.updatePage = async (req, res) => {
  try {
    const slug = String(req.params.slug || "").trim();
    if (!ALLOWED_SLUGS.has(slug)) {
      return status.responseStatus(res, 404, "CMS page not found");
    }

    const { pageTitle, metaDescription, sections, isActive } = req.body || {};
    const formatted = {
      slug,
      pageTitle: pageTitle || getPageFromSnapshot(slug)?.pageTitle || "Home",
      metaDescription: metaDescription ?? "",
      sections: sections || {},
      isActive: isActive !== undefined ? !!isActive : true,
      updatedAt: new Date().toISOString(),
    };

    let savedViaDb = false;
    if (dbReadsEnabled) {
      try {
        let row = await CmsPage.findOne({ where: { slug } });
        if (!row) {
          const seed = SEED_PATHS[slug] ? readJsonFile(SEED_PATHS[slug]) : null;
          row = await CmsPage.create({
            slug,
            page_title: seed?.pageTitle || formatted.pageTitle,
            meta_description: seed?.metaDescription ?? formatted.metaDescription,
            sections: seed?.sections || formatted.sections,
            is_active: true,
          });
        }

        if (row) {
          const updates = {};
          if (pageTitle !== undefined) {
            const title = String(pageTitle).trim();
            if (!title) return status.responseStatus(res, 400, "pageTitle cannot be empty");
            updates.page_title = title;
          }
          if (metaDescription !== undefined) updates.meta_description = String(metaDescription);
          if (sections !== undefined) {
            if (typeof sections !== "object" || sections === null || Array.isArray(sections)) {
              return status.responseStatus(res, 400, "sections must be an object");
            }
            updates.sections = sections;
          }
          if (isActive !== undefined) updates.is_active = !!isActive;

          if (Object.keys(updates).length) {
            await row.update(updates);
            await row.reload();
          }
          formatted.pageTitle = row.page_title;
          formatted.metaDescription = row.meta_description;
          formatted.sections = row.sections;
          formatted.isActive = row.is_active;
          formatted.updatedAt = row.updated_at;
          savedViaDb = true;
        }
      } catch (dbError) {
        dbReadsEnabled = false;
        console.warn("[CMS] DB disabled after save failure, writing snapshot:", dbError.message);
      }
    }

    // Always write this page into cms.json so admin edits persist without DB.
    writePageToSnapshot(slug, formatted);
    if (!savedViaDb) {
      console.warn("[CMS] Saved page to snapshot only:", slug);
    }

    return status.responseStatus(res, 200, "CMS page updated successfully", formatted);
  } catch (error) {
    console.error("[CMS] updatePage error:", error);
    return status.responseStatus(res, 500, "Error updating CMS page", null, error.message);
  }
};

exports.syncCmsJsonSnapshot = syncCmsJsonSnapshot;
