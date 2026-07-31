const fs = require("fs");
const path = require("path");

const CMS_JSON_PATH = path.join(__dirname, "../config/cms.json");
const SEED_PATHS = {
  rac: path.join(__dirname, "../seeds/rac_landing_page.json"),
  "employee-transportation": path.join(__dirname, "../seeds/employee_transportation_page.json"),
};

const ROUTE_TO_SLUG = {
  "/rac": "rac",
  "/corporate-car-rental": "rac",
  "/employee-transportation": "employee-transportation",
  "/ets": "employee-transportation",
};

function readJson(filePath) {
  if (!fs.existsSync(filePath)) return null;
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf-8").replace(/^\uFEFF/, ""));
  } catch {
    return null;
  }
}

function getPageMeta(slug) {
  const cms = readJson(CMS_JSON_PATH);
  const fromSnapshot = cms?.data?.[slug];
  if (fromSnapshot?.pageTitle) {
    return {
      pageTitle: fromSnapshot.pageTitle,
      metaDescription: fromSnapshot.metaDescription || "",
    };
  }

  const seed = readJson(SEED_PATHS[slug]);
  if (seed?.pageTitle) {
    return {
      pageTitle: seed.pageTitle,
      metaDescription: seed.metaDescription || "",
    };
  }

  return null;
}

function getLandingPageMetaByPath(urlPath) {
  const slug = ROUTE_TO_SLUG[String(urlPath || "").split("?")[0]];
  if (!slug) return null;
  return getPageMeta(slug);
}

function escapeHtml(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function injectMetaIntoHtml(html, { pageTitle, metaDescription }) {
  let next = html;
  if (pageTitle) {
    next = next.replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeHtml(pageTitle)}</title>`);
  }
  if (metaDescription) {
    next = next.replace(
      /<meta\s+name=["']description["']\s+content=["'][^"']*["']\s*\/?>/i,
      `<meta name="description" content="${escapeHtml(metaDescription)}"/>`
    );
  }
  return next;
}

module.exports = {
  ROUTE_TO_SLUG,
  getPageMeta,
  getLandingPageMetaByPath,
  injectMetaIntoHtml,
};
