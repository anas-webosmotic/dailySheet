const { mongoose, Schema } = require("mongoose");

const projectSchema = new Schema({
  projectName: {
    type: String,
    required: true,
  },
  clientName: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  profiles: [
    {
      type: String,
      required: true,
    },
  ],
  responsibleUsers: [
    {
      type: Schema.Types.ObjectId,
      ref: "userModel",
      required: true,
    },
  ],
  projectType: [
    {
      type: String,
      required: true,
    },
  ],
  source: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  isDelete: {
    type: String,
    default: false,
  },
});

module.exports = mongoose.model("projectModel", projectSchema);
