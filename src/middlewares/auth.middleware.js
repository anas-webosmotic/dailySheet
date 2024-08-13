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

exports.authorization = () => {
  return async (req, res, next) => {
    try {
      const { userId } = req.params;
      console.log(`===  return  userId ===>>`, userId);

      const user = await USER_MODEL.findOne({ _id: userId, isDelete: false });
      console.log(`===  return  user ===>>`, user);

      const userPayload = req.user;
      console.log(`===  return  userPayload ===>>`, userPayload);

      console.log("====== REQUEST METHOD ======>>>", req.method);

      if (req.method == "GET") {
        if (
          userId !== userPayload.userId &&
          user.verifierUser.toString() !== userPayload.userId &&
          !user.responsibleUsers.includes(userPayload.userId) &&
          userPayload.role !== "Admin"
        ) {
          throw createError(403, "Not Authorized");
        }
      } else if (req.method == "PUT") {
        if (
          userId !== userPayload.userId &&
          user.verifierUser.toString() !== userPayload.userId &&
          userPayload.role !== "Admin"
        ) {
          throw createError(403, "Not Authorized");
        }
      } else {
        if ((userId !== userPayload.userId) & (userPayload.role !== "Admin")) {
          throw createError(403, "Not Authorized");
        }
      }
      return next();
    } catch (error) {
      next(error);
    }
  };
};

exports.adminAuthorization = () => {
  return (req, res, next) => {
    try {
      const user = req.user;
      if (user.role !== "Admin") throw createError(403, "Not Authorized");
      next();
    } catch (error) {
      next(error);
    }
  };
};

exports.userAuthorization = () => {
  return (req, res, next) => {
    try {
      const user = req.user;
      if (user.role !== "Admin" && user.userId !== req.params.userId)
        throw createError(403, "Not Authorized");
      next();
    } catch (error) {
      next(error);
    }
  };
};

// exports.authorization = () => {
//   return async (req, res, next) => {
//     try {
//       const { userId } = req.params;
//       console.log(`===  return  userId ===>>`, userId);

//       const user = await USER_MODEL.findOne({ _id: userId, isDelete: false });
//       console.log(`===  return  user ===>>`, user);

//       const userPayload = req.user;
//       console.log(`===  return  userPayload ===>>`, userPayload);

//       console.log("====== REQUEST METHOD ======>>>",req.method);

//       if(req.method == "GET"){
//         if (userId == userPayload.userId) {
//           return next();
//         } else if (user.verifierUser.toString() == userPayload.userId) {
//           console.log("INISDE VERIFIER");

//           return next();
//         }else if(user.responsibleUsers.includes(userPayload.userId)){
//           console.log("INISDE RESPONSIBLE");
//           return next();
//         }
//       }else if(req.method == "PUT"){
//         if (userId == userPayload.userId) {
//           return next();
//         } else if (user.verifierUser.toString() !== userPayload.userId) {
//           return next();
//         }
//       }else{
//         return next();
//         // if (userId == userPayload.userId) {
//         // }
//       }
//       console.log("HELLOOOo ERORRRRRRRRrrrrrr");

//       throw createError(403,"Not Authorized");
//     } catch (error) {
//       next(error);
//     }
//   };
// };
