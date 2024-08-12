const createError = require("http-errors");
const { getSuccessResponse, getFailureResponse } = require("../utils/response");
const USER_MODEL = require("./user.model");

exports.addUser = async (req, res, next) => {
  try {
    const payload = req.body;

    const user = await USER_MODEL.findOne({
      email: payload.email,
      isDelete: false,
    });
    if (!user) {
      const newUser = await USER_MODEL.create(payload);
      return res.json(getSuccessResponse("User Created Succesfully", newUser));
    }

    return res.json(getFailureResponse("User Already Exist"));
  } catch (error) {
    next(error);
  }
};

exports.loginUser = async (req, res, next) => {
  return res.set().json(getSuccessResponse("Login Succesfully", req.user));
};

exports.getUsers = async (req, res, next) => {
  try {
    const users = await USER_MODEL.find(
      { isDelete: false },
      { isDelete: 0, __v: 0, password: 0 }
    )
      .populate("responsibleUsers", "username -_id")
      .populate("verifierUser", "username -_id");
    if (!users) throw createError("404", getFailureResponse("No User Found"));

    return res.json(getSuccessResponse("All Users fetched Succesfully", users));
  } catch (error) {
    next(error);
  }
};

exports.getUserById = async (req, res, next) => {
  try {
    const { userId } = req.user;
    console.log(req.params.userId);
    console.log(req.user.userId);

    if (userId == req.params.userId) {
      const userExist = await USER_MODEL.findOne(
        { _id: userId, isDelete: false },
        { isDelete: 0, __v: 0, password: 0, createdAt: 0 }
      );
      res.json(getSuccessResponse("GET USER BY ID", userExist));
    }
    res.send("DIFFERENT ID");
  } catch (error) {
    next(error);
  }
};
