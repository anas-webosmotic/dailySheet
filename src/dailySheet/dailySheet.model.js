const { mongoose, Schema } = require("mongoose");

const dailySheetSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "userModel",
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  taskCategory: {
    type: String,
    required: true
  },
  project:{
    type: Schema.Types.ObjectId,
    ref: "projectModel",
    required: true
  },
  taskType: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  plannedDuration: {
    type: String,
    required: true
  },
  actualDuration: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  isDelete: {
    type: String,
    default: false
  }
});

module.exports = mongoose.model("dailySheetModel",dailySheetSchema);