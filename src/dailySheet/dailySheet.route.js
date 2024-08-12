const { Router } = require("express");
const passport = require("passport");
const { validate } = require("express-validation");
const {} = require("../middlewares/auth.middleware");
const { addDailySheet, getDailySheet } = require("./dailySheet.controller");
const { addDailySheetValidation } = require("./dailySheet.validation");

const dailySheetRoute = Router();

dailySheetRoute.post(
  "/dailySheet",
  passport.authenticate("jwt", { session: false }),
  validate(addDailySheetValidation),
  addDailySheet
);

dailySheetRoute.get(
  "/dailySheet/:userId",
  passport.authenticate("jwt", { session: false }),
  getDailySheet
);

exports.dailySheetRoute = dailySheetRoute;
