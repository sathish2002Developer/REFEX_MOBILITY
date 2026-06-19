const router = require("express").Router();
const cmsController = require("../controllers/cms");

router.get("/pages", cmsController.listPages);
router.get("/pages/:slug", cmsController.getPageBySlug);
router.put("/pages/:slug", cmsController.updatePage);

module.exports = router;
