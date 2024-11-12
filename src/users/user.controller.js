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
      return res.json(getSuccessResponse("User Created Successfully", newUser));
    }

    return res.json(getFailureResponse("User Already Exist"));
  } catch (error) {
    next(error);
  }
};

exports.loginUser = async (req, res, next) => {
  return res.set().json(getSuccessResponse("Login Successfully", req.user));
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

    return res.json(getSuccessResponse("All Users fetched Successfully", users));
  } catch (error) {
    next(error);
  }
};

exports.getUserById = async (req, res, next) => {
  try {
    const user = req.user;
    const { userId } = req.params;

    if (user.userId == userId || user.role == "Admin") {
      const userExist = await USER_MODEL.findOne(
        { _id: userId, isDelete: false },
        { isDelete: 0, __v: 0, password: 0, createdAt: 0 }
      )
        .populate("responsibleUsers", "username -_id")
        .populate("verifierUser", "username -_id");
      return res.json(getSuccessResponse("GET USER BY ID", userExist));
    }
    return res.json(getFailureResponse(404, "No User Found"));
  } catch (error) {
    next(error);
  }
};

exports.updateUserById = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const payload = req.body;
    const options = { new: true };

    const user = await USER_MODEL.findByIdAndUpdate(userId, payload, options);

    if (user) {
      const { _id, createdAt, __v, isDelete, password, ...result } = user.toObject();
      return res.json(getSuccessResponse("User Updated Successfully", result));
    }
    return res.json(getFailureResponse(404, "No User Found"));
  } catch (error) {
    next(error);
  }
};

exports.deleteUserById = async (req, res, next) => {
  try {
    const { userId } = req.params;

    const user = await USER_MODEL.findByIdAndUpdate(userId, {
      isDelete: true,
    });

    if (user) {
      return res.json(getSuccessResponse("User Deleted Successfully"));
    }

    return res.json(getFailureResponse(404, "No Projects Found"));
  } catch (error) {
    next(error);
  }
};
