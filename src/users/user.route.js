const { Router } = require("express");
const passport = require("passport");
const { validate } = require("express-validation");
const {
  addUser,
  loginUser,
  getUsers,
  getUserById,
  updateUserById,
  deleteUserById,
} = require("./user.controller");
const { adminAuthorization, userAuthorization } = require("../middlewares/auth.middleware");
const { addUserValidation, getUserValidation, updateUserValidation } = require("./user.validation");

const userRoute = Router();

userRoute.post(
  "/sign-up",
  passport.authenticate("jwt", { session: false }),
  adminAuthorization(),
  validate(addUserValidation),
  addUser
);
userRoute.post(
  "/sign-in",
  passport.authenticate("local", { session: false }),
  loginUser
);
userRoute.get(
  "/users",
  passport.authenticate("jwt", { session: false }),
  adminAuthorization(),
  getUsers
);
userRoute.get(
  "/users/:userId",
  passport.authenticate("jwt", { session: false }),
  userAuthorization(),
  validate(getUserValidation),
  getUserById
);

userRoute.put(
  "/users/:userId",
  passport.authenticate("jwt", { session: false }),
  adminAuthorization(),
  validate(updateUserValidation),
  updateUserById
);

userRoute.delete(
  "/users/:userId",
  passport.authenticate("jwt", { session: false }),
  adminAuthorization(),
  validate(getUserValidation),
  deleteUserById
);

module.exports = userRoute;
