require("dotenv").config();
const jwt = require("jsonwebtoken");

exports.createToken = (userId, role, responsibleUsers, verifierUser) => {
  const payload = { userId, role, responsibleUsers, verifierUser };
  const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_KEY, {
    expiresIn: "24h",
  });
  return accessToken;
};
