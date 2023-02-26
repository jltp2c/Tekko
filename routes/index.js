const router = require("express").Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index", { stylesheets: ["main"] });
});

/*links auth, user,profile,insights roots to this page*/

router.use("/auth", require("./auth.routes"));
router.use("/profile", require("./profile.routes"));
router.use("/insight", require("./insight.routes"));
router.use("/company", require("./company.routes"));

module.exports = router;
