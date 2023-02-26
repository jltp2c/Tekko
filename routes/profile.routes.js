const router = require("express").Router();
const Company = require("../models/company.model");
const { isSameUser, isLoggedIn } = require("../middlewares/route-guard");
const Insight = require("../models/insight.model");

/* GET  page */
router.get("/", async (req, res, next) => {
  const allCompanies = await Company.find();
  res.render("profile", { allCompanies });
});

//update get
router.get("/:id/edit", isSameUser, async (req, res, next) => {
  try {
    const id = req.params.id;
    let insightUpdate = await Insight.findById(id).populate("company");
    console.log(insightUpdate);
    res.render("updateReview", {
      insightUpdate,
      stylesheets: { stylesheets: ["updateReview"] },
    });
  } catch (error) {
    next(error);
  }
});

//  * ? This route should update a insight(user) and respond with
//  * ? the updated insight(user)
//  */
router.post("/:id/edit", isLoggedIn, async (req, res, next) => {
  const id = req.params.id;
  const insightToUpdate = req.body;
  console.log(insightToUpdate);
  try {
    if (!insightToUpdate) {
      return res.json({ message: `review not found` });
    } else {
      const updateInsight = await Insight.findByIdAndUpdate(
        id,
        insightToUpdate,
        {
          new: true,
        }
      );
      console.log(updateInsight);
      res.redirect("/profile");
    }
  } catch (error) {
    next(error);
  }
});

router.get("/:id/delete", isSameUser, async (req, res, next) => {
  const id = req.params.id;
  try {
    const deleteReview = await Insight.findByIdAndDelete(id);
    console.log(deleteReview);
    res.redirect("/profile");
  } catch (error) {
    next(error);
  }
});

module.exports = router;
