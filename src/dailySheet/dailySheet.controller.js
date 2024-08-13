const createError = require("http-errors");
const moment = require("moment");

const { getSuccessResponse, getFailureResponse } = require("../utils/response");
const DAILYSHEET_MODEL = require("./dailySheet.model");

exports.addDailySheet = async (req, res, next) => {
  const payload = req.body;
  payload.userId = req.user.userId;
  console.log(`===  exports.addDailySheet=  userId ===>>`, payload.userId)

  payload.date = moment.utc(payload.date, "DD-MM-YYYY");
  const sheet = await DAILYSHEET_MODEL.create(payload);
  console.log(`===  exports.getDailySheet=  SHEET ===>>`, sheet);

  res.json(getSuccessResponse("HI FROM DAILYSHEET", sheet));
};

exports.getDailySheet = async (req, res, next) => {
  const { userId } = req.params;
  // console.log(`===  exports.getDailySheet=async  userId ===>>`, userId);

  const sheets = await DAILYSHEET_MODEL.find(
    { userId: userId, isDelete: false },
    { isDelete: 0, __v: 0, createdAt: 0 }
  )
    .populate("userId", "username -_id")
    .populate("project", "projectName -_id");

  return res.json(getSuccessResponse("Sheet fetched successfully", sheets));
};
