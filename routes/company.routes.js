const router = require("express").Router();
const { isSameUser, isLoggedIn } = require("../middlewares/route-guard");
const Company = require("../models/company.model");
const Insight = require("../models/insight.model");

//Get company page

router.get("/", isLoggedIn, async (req, res, next) => {
  try {
    // console.log(req.query);
    let oneCompany = null;
    let reviews = null;
    let globalNote = null;
    const allCompanies = await Company.find();

    if (req.query.company) {
      oneCompany = await Company.findById(req.query.company);
      reviews = await Insight.find({ company: req.query.company });
      globalNote =
        reviews.reduce((acc, val) => {
          return acc + val.company_note;
        }, 0) / reviews.length;
    }

    res.render("company", {
      allCompanies,
      oneCompany,
      reviews,
      globalNote,
      stylesheets: { stylesheets: ["company"] },
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
