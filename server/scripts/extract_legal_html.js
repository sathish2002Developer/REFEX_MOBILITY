const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "../..");
const OUT_DIR = path.join(ROOT, "client/src/content/legal");

function jsxToHtml(chunk) {
  return chunk
    .replace(/className=/g, "class=")
    .replace(/style=\{\{[^}]*\}\}/g, "")
    .replace(/\s+>/g, ">");
}

function extractWrapperContent(src, wrapperClass) {
  const re = new RegExp(
    `className="[^"]*${wrapperClass}[^"]*">([\\s\\S]*?)</div>\\s*</div>\\s*</div>\\s*</div>`
  );
  const match = src.match(re);
  if (!match) throw new Error(`wrapper ${wrapperClass} not found`);
  return match[1].trim();
}

fs.mkdirSync(OUT_DIR, { recursive: true });

const termsSrc = fs.readFileSync(path.join(ROOT, "client/src/pages/TermsAndConditions.jsx"), "utf-8");
const refundsSrc = fs.readFileSync(path.join(ROOT, "client/src/pages/RefundsAndCancellation.jsx"), "utf-8");
const privacySrc = fs.readFileSync(path.join(ROOT, "client/src/pages/PrivacyPolicy.jsx"), "utf-8");

const terms = jsxToHtml(extractWrapperContent(termsSrc, "terms-content-wrapper"));
fs.writeFileSync(path.join(OUT_DIR, "terms-body.html"), terms);

const refunds = jsxToHtml(extractWrapperContent(refundsSrc, "refunds-content-wrapper"));
fs.writeFileSync(path.join(OUT_DIR, "refunds-body.html"), refunds);

const privacyMatch = privacySrc.match(/className="privacy-policy-content">([\s\S]*?)<\/div>\s*<\/div>/);
if (!privacyMatch) throw new Error("privacy content not found");
const privacy = jsxToHtml(privacyMatch[1].trim());
fs.writeFileSync(path.join(OUT_DIR, "privacy-body.html"), privacy);

const HERO_BG = "https://refexmobility.com/wp-content/uploads/2025/07/drive-section-1-scaled.webp";
const SEEDS_DIR = path.join(ROOT, "server/seeds");

const legalPages = [
  {
    file: "terms_and_conditions.json",
    slug: "terms-and-conditions",
    pageTitle: "Terms and Conditions | Refex Mobility",
    metaDescription:
      "Most reliable, safe and sustainable mobility service for corporate travel. Trusted by enterprises driving clean transport goals.",
    heroTitle: "Terms And Conditions",
    html: terms,
  },
  {
    file: "privacy_policy.json",
    slug: "privacy-policy",
    pageTitle: "Privacy Policy | Refex Mobility",
    metaDescription:
      "India's safest, most reliable and on-time mobility service for corporates and premium travel. Trusted by businesses, driving sustainability goals.",
    heroTitle: "Privacy Policy",
    html: privacy,
  },
  {
    file: "refunds_and_cancellation.json",
    slug: "refunds-and-cancellation-policy",
    pageTitle: "Refunds And Cancellation Policy | Refex Mobility",
    metaDescription:
      "Most reliable, safe and sustainable mobility service for corporate travel. Trusted by enterprises driving clean transport goals.",
    heroTitle: "Refunds And Cancellation Policy",
    html: refunds,
  },
];

for (const page of legalPages) {
  const payload = {
    slug: page.slug,
    pageTitle: page.pageTitle,
    metaDescription: page.metaDescription,
    sections: {
      hero: { title: page.heroTitle, backgroundImage: HERO_BG },
      body: { html: page.html },
    },
  };
  fs.writeFileSync(path.join(SEEDS_DIR, page.file), `${JSON.stringify(payload, null, 2)}\n`, "utf-8");
}

console.log("Legal HTML files written to", OUT_DIR);
console.log("Legal seed JSON files written to", SEEDS_DIR);
