const Joi = require("joi").extend(require("@joi/date"));
Joi.objectId = require("joi-objectid")(Joi);

const taskCategoryStrings = [
  "Other",
  "Task",
  "Task-Review",
  "Reopen-bug",
  "Reopen-CR",
  "R&D",
  "Personal Learing/Session",
  "Work with/Helped to",
  "Internal Meeting",
  "Client Meeting",
  "Interview",
  "Client Interview",
  "Client Bid",
  "Client Inquiry/Quote",
  "HR Activity",
  "Partial/Half-day",
  "Holiday/Leave",
  "CLient Tracker",
  "Training to",
  "POC/Demo Creation",
  "Testing",
  "Technical Disruption",
  "Likedin",
  "Instagram",
  "Blog",
  "Attended Event",
];

exports.addDailySheetValidation = {
  body: Joi.object({
    // userId: Joi.objectId().required(),
    date: Joi.date().format("DD-MM-YYYY").raw().required(),
    taskCategory: Joi.valid(...taskCategoryStrings).required(),
    project: Joi.objectId().required(),
    taskType: Joi.valid("Planned","Unplanned").required(),
    description: Joi.string().required(),
    status: Joi.valid("In Progress","Completed","Hold","Canceled").required(),
    plannedDuration: Joi.number().required(),
    actualDuration: Joi.number().required(),
  }),
  params: Joi.object({
    userId:Joi.objectId()
  })
};

exports.getDailySheetValidation = {
  params: Joi.object({
    userId: Joi.objectId()
  })
}
