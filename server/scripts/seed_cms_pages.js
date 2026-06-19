require("dotenv").config();
const fs = require("fs");
const path = require("path");
const { sequelize, CmsPage } = require("../models");
const { syncCmsJsonSnapshot } = require("../controllers/cms");

const SEED_FILES = [
  path.join(__dirname, "../seeds/home_page.json"),
  path.join(__dirname, "../seeds/drive_for_us.json"),
  path.join(__dirname, "../seeds/business_commute_page.json"),
  path.join(__dirname, "../seeds/terms_and_conditions.json"),
  path.join(__dirname, "../seeds/privacy_policy.json"),
  path.join(__dirname, "../seeds/refunds_and_cancellation.json"),
];

const LEGAL_CONTENT_DIR = path.join(__dirname, "../../client/src/content/legal");
const HERO_BG = "https://refexmobility.com/wp-content/uploads/2025/07/drive-section-1-scaled.webp";

const LEGAL_PAGES = [
  {
    seedFile: "terms_and_conditions.json",
    slug: "terms-and-conditions",
    pageTitle: "Terms and Conditions | Refex Mobility",
    metaDescription:
      "Most reliable, safe and sustainable mobility service for corporate travel. Trusted by enterprises driving clean transport goals.",
    heroTitle: "Terms And Conditions",
    htmlFile: "terms-body.html",
  },
  {
    seedFile: "privacy_policy.json",
    slug: "privacy-policy",
    pageTitle: "Privacy Policy | Refex Mobility",
    metaDescription:
      "India's safest, most reliable and on-time mobility service for corporates and premium travel. Trusted by businesses, driving sustainability goals.",
    heroTitle: "Privacy Policy",
    htmlFile: "privacy-body.html",
  },
  {
    seedFile: "refunds_and_cancellation.json",
    slug: "refunds-and-cancellation-policy",
    pageTitle: "Refunds And Cancellation Policy | Refex Mobility",
    metaDescription:
      "Most reliable, safe and sustainable mobility service for corporate travel. Trusted by enterprises driving clean transport goals.",
    heroTitle: "Refunds And Cancellation Policy",
    htmlFile: "refunds-body.html",
  },
];

function ensureLegalSeedFiles() {
  for (const page of LEGAL_PAGES) {
    const html = fs.readFileSync(path.join(LEGAL_CONTENT_DIR, page.htmlFile), "utf-8");
    const payload = {
      slug: page.slug,
      pageTitle: page.pageTitle,
      metaDescription: page.metaDescription,
      sections: {
        hero: { title: page.heroTitle, backgroundImage: HERO_BG },
        body: { html },
      },
    };
    const outPath = path.join(__dirname, "../seeds", page.seedFile);
    fs.writeFileSync(outPath, `${JSON.stringify(payload, null, 2)}\n`, "utf-8");
  }
}

function readJson(filePath) {
  const raw = fs.readFileSync(filePath, "utf-8").replace(/^\uFEFF/, "");
  return JSON.parse(raw);
}

async function upsertPage(pageData) {
  const { slug, pageTitle, metaDescription, sections } = pageData;
  const [row, created] = await CmsPage.findOrCreate({
    where: { slug },
    defaults: {
      slug,
      page_title: pageTitle,
      meta_description: metaDescription || "",
      sections: sections || {},
      is_active: true,
    },
  });

  if (!created) {
    await row.update({
      page_title: pageTitle,
      meta_description: metaDescription || "",
      sections: sections || {},
      is_active: true,
    });
  }

  return row;
}

async function main() {
  ensureLegalSeedFiles();
  await sequelize.authenticate();
  await sequelize.sync({ alter: true });

  for (const file of SEED_FILES) {
    const pageData = readJson(file);
    await upsertPage(pageData);
    console.log(`Seeded CMS page: ${pageData.slug}`);
  }

  await syncCmsJsonSnapshot();
  console.log("Updated server/config/cms.json");
  await sequelize.close();
}

main().catch(async (error) => {
  console.error("CMS seed failed:", error);
  try { await sequelize.close(); } catch (_) {}
  process.exit(1);
});
