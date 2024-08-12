require("dotenv").config();
const createError = require("http-errors");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const JWTStrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;

const USER_MODEL = require("../users/user.model");
const { createToken } = require("../utils/createToken");

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, cb) => {
      try {
        const emailExist = await USER_MODEL.findOne({ email, isDelete: false });
        if (!emailExist) throw createError(404, "No User Found");

        const isValidPassword = await emailExist.checkPassword(password);
        if (!isValidPassword)
          throw createError(401, "Enter Proper Credentials");

        const jwtToken = createToken(
          emailExist._id.toString(),
          emailExist.role,
          emailExist.responsibleUsers,
          emailExist.verifierUser
        );

        cb(null, jwtToken);
      } catch (error) {
        cb(error);
      }
    }
  )
);

passport.use(
  "jwt",
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.ACCESS_TOKEN_KEY,
    },
    async (jwtPayload, cb) => {
      try {
        const user = await USER_MODEL.findOne({ _id: jwtPayload.userId });
        if (!user) throw createError.Unauthorized();

        cb(null, jwtPayload);
      } catch (error) {
        cb(error);
      }
    }
  )
);

exports.authorization = (roles) => {
  return (req, res, next) => {
    try {
      const user = req.user;
      if(!roles.includes(user.role)) throw createError("Not Authorized");
      next();
    } catch (error) {
      next(error);
    }
  };
};
