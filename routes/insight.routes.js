const router = require("express").Router();
const Insight = require("../models/insight.model");
const Company = require("../models/company.model");
const { isSameUser, isLoggedIn } = require("../middlewares/route-guard");

/* GET  salaries page */
router.get("/", isLoggedIn, async (req, res, next) => {
  const allSalaries = await Insight.find().populate("company");
  // console.log(allSalaries);

  const companyName = await Insight.find({ name: Company.name });
  // console.log(companyName);

  res.render("salaries", {
    allSalaries,
    companyName,
    stylesheets: { stylesheets: ["salaries"] },
  });
});

router.post("/", async (req, res, next) => {
  try {
    const reviewToCreate = { ...req.body };
    // console.log(reviewToCreate);

    let company = await Company.findOne({ name: reviewToCreate.company });
    if (!company) {
      company = await Company.create({ name: reviewToCreate.company });
    }
    const insight = await Insight.create({
      ...reviewToCreate,
      company: company._id,
      creator: req.session.currentUser._id,
    });
    // console.log("Insight: ", insight);
    res.status(200).json(insight);
  } catch (error) {
    next(error);
  }
});

router.get("/userInfos", isLoggedIn, async (req, res, next) => {
  try {
    // console.log(req.session.currentUser);
    let user = await Insight.find({
      creator: req.session.currentUser._id,
    }).populate("company");
    res.status(200).json(user);
    // console.log(user);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
