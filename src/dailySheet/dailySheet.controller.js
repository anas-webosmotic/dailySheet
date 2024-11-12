const moment = require("moment");

const { getSuccessResponse } = require("../utils/response");
const DAILYSHEET_MODEL = require("./dailySheet.model");

exports.addDailySheet = async (req, res, next) => {
  const payload = req.body;
  payload.userId = req.user.userId;

  payload.date = moment.utc(payload.date, "DD-MM-YYYY");
  const sheet = await DAILYSHEET_MODEL.create(payload);

  res.json(getSuccessResponse("HI FROM DAILYSHEET", sheet));
};

exports.getDailySheet = async (req, res, next) => {
  const { userId } = req.params;

  const sheets = await DAILYSHEET_MODEL.find(
    { userId: userId, isDelete: false },
    { isDelete: 0, __v: 0, createdAt: 0 }
  )
    .populate("userId", "username -_id")
    .populate("project", "projectName -_id");

  return res.json(getSuccessResponse("Sheet fetched successfully", sheets));
};
