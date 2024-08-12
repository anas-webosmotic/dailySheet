const { Router } = require("express");
const passport = require("passport");
const { validate } = require("express-validation");
const {
  addUser,
  loginUser,
  getUsers,
  getUserById,
} = require("./user.controller");
const {} = require("../middlewares/auth.middleware");
const { addUserValidation } = require("./user.validation");

const userRoute = Router();

userRoute.post("/sign-up", validate(addUserValidation), addUser);
userRoute.post(
  "/sign-in",
  passport.authenticate("local", { session: false }),
  loginUser
);
userRoute.get(
  "/users",
  passport.authenticate("jwt", { session: false }),
  getUsers
);
userRoute.get(
  "/users/:userId",
  passport.authenticate("jwt", { session: false }),
  getUserById
);

module.exports = userRoute;
