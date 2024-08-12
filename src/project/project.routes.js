const { Router } = require("express");
const passport = require("passport");
const { validate } = require("express-validation");
const {} = require("../middlewares/auth.middleware");
const { getProjects, addProject } = require("./project.controller");
const { addProjectValidation } = require("./project.validaiton");

const projectRoute = Router();

projectRoute.post(
  "/projects",
  passport.authenticate("jwt", { session: false }),
  validate(addProjectValidation),
  addProject
);
projectRoute.get(
  "/projects",
  passport.authenticate("jwt", { session: false }),
  getProjects
);

exports.projectRoute = projectRoute;
