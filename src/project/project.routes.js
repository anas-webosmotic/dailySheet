const { Router } = require("express");
const passport = require("passport");
const { validate } = require("express-validation");
const { adminAuthorization } = require("../middlewares/auth.middleware");
const {
  getProjects,
  addProject,
  getProjectById,
  updateProjectById,
  deleteProjectById,
} = require("./project.controller");
const {
  addProjectValidation,
  getProjectValidation,
  updateProjectValidation,
} = require("./project.validation");

const projectRoute = Router();

projectRoute.post(
  "/projects",
  passport.authenticate("jwt", { session: false }),
  adminAuthorization(),
  validate(addProjectValidation),
  addProject
);
projectRoute.get(
  "/projects",
  passport.authenticate("jwt", { session: false }),
  adminAuthorization(),
  getProjects
);

projectRoute.get(
  "/projects/:projectId",
  passport.authenticate("jwt", { session: false }),
  adminAuthorization(),
  validate(getProjectValidation),
  getProjectById
);

projectRoute.put(
  "/projects/:projectId",
  passport.authenticate("jwt", { session: false }),
  adminAuthorization(),
  validate(updateProjectValidation),
  updateProjectById
);

projectRoute.delete(
  "/projects/:projectId",
  passport.authenticate("jwt", { session: false }),
  adminAuthorization(),
  validate(getProjectValidation),
  deleteProjectById
);

exports.projectRoute = projectRoute;
