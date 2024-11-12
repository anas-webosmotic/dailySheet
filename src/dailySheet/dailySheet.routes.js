const { Router } = require("express");
const passport = require("passport");
const { validate } = require("express-validation");
const { authorization } = require("../middlewares/auth.middleware");
const { addDailySheet, getDailySheet } = require("./dailySheet.controller");
const { addDailySheetValidation, getDailySheetValidation } = require("./dailySheet.validation");

const dailySheetRoute = Router({ mergeParams: true });

dailySheetRoute.post(
  "/",
  // "/dailySheet",
  passport.authenticate("jwt", { session: false }),
  validate(addDailySheetValidation),
  authorization(),
  addDailySheet
);

dailySheetRoute.get(
  "/",
  // "/dailySheet/:userId",
  passport.authenticate("jwt", { session: false }),
  validate(getDailySheetValidation),
  authorization(),
  getDailySheet
);

exports.dailySheetRoute = dailySheetRoute;
