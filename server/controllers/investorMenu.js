const { InvestorMenuItem, sequelize } = require("../models");
const status = require("../helpers/response");

const DEFAULT_MENU = [
  { id: "scheme", label: "Scheme of Amalgamation / Arrangement", hasSubItems: false },
  { id: "annual-return", label: "Annual Return", hasSubItems: true },
  { id: "notice", label: "General Meetings", hasSubItems: false },
  { id: "policies", label: "Policies", hasSubItems: false },
];

function normalizeSlug(str) {
  return String(str || "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

function rowsToItems(rows) {
  return rows.map((r) => ({
    id: r.slug,
    label: r.label,
    hasSubItems: r.has_sub_items,
    sortOrder: r.sort_order,
  }));
}

function applyPreferredOrder(items) {
  const priority = {
    scheme: 0,
    "scheme-of-amalgamation-arrangement": 0,
    "annual-return": 10,
    policies: 20,
    notice: 30,
  };

  return [...items].sort((a, b) => {
    const pa = priority[a.id] ?? 1000;
    const pb = priority[b.id] ?? 1000;
    if (pa !== pb) return pa - pb;
    const sa = typeof a.sortOrder === "number" ? a.sortOrder : 0;
    const sb = typeof b.sortOrder === "number" ? b.sortOrder : 0;
    if (sa !== sb) return sa - sb;
    return String(a.label || "").localeCompare(String(b.label || ""));
  });
}

exports.getInvestorMenu = async (req, res) => {
  try {
    const rows = await InvestorMenuItem.findAll({
      order: [["sort_order", "ASC"]],
    });
    if (!rows.length) {
      return status.responseStatus(res, 200, "Investor menu retrieved successfully", {
        items: applyPreferredOrder(DEFAULT_MENU),
        fromDefaults: true,
      });
    }
    return status.responseStatus(res, 200, "Investor menu retrieved successfully", {
      items: applyPreferredOrder(rowsToItems(rows)),
      fromDefaults: false,
    });
  } catch (error) {
    console.error("Error fetching investor menu:", error);
    return status.responseStatus(res, 500, "Error fetching investor menu", null, error.message);
  }
};

exports.saveInvestorMenu = async (req, res) => {
  try {
    const { items } = req.body;
    if (!Array.isArray(items) || items.length === 0) {
      return status.responseStatus(res, 400, "items must be a non-empty array");
    }

    const normalized = [];
    const seen = new Set();
    for (let i = 0; i < items.length; i++) {
      const raw = items[i];
      const slug = normalizeSlug(raw.id || raw.slug);
      if (!slug) {
        return status.responseStatus(res, 400, `Invalid menu slug at index ${i}`);
      }
      if (seen.has(slug)) {
        return status.responseStatus(res, 400, `Duplicate menu slug: ${slug}`);
      }
      seen.add(slug);
      const label = String(raw.label || "").trim();
      if (!label) {
        return status.responseStatus(res, 400, `Menu label required for ${slug}`);
      }
      normalized.push({
        slug,
        label,
        has_sub_items: !!raw.hasSubItems,
        sort_order: i,
      });
    }

    await sequelize.transaction(async (t) => {
      await InvestorMenuItem.destroy({ where: {}, transaction: t });
      for (const row of normalized) {
        await InvestorMenuItem.create(row, { transaction: t });
      }
    });

    return status.responseStatus(res, 200, "Investor menu saved successfully", {
      items: normalized.map((r, i) => ({
        id: r.slug,
        label: r.label,
        hasSubItems: r.has_sub_items,
        sortOrder: i,
      })),
    });
  } catch (error) {
    console.error("Error saving investor menu:", error);
    return status.responseStatus(res, 500, "Error saving investor menu", null, error.message);
  }
};
