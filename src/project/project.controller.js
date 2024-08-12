const createError = require("http-errors");
const { getSuccessResponse, getFailureResponse } = require("../utils/response");
const PROJECT_MODEL = require("./project.model");

exports.addProject = async (req, res, next) => {
  try {
    const payload = req.body;

    const project = await PROJECT_MODEL.findOne({
      projectName: payload.projectName,
      clientName: payload.clientName,
      isDelete: false,
    });

    if (!project) {
      console.log("Helloo");

      const newProject = await PROJECT_MODEL.create(payload);
      console.log("Hell");
      return res.json(
        getSuccessResponse("Project Created Succesfully", newProject)
      );
    }

    return res.json(getFailureResponse("Project Already Exist for Client"));
  } catch (error) {
    next(error);
  }
};

exports.getProjects = async (req, res, next) => {
  try {
    const projects = await PROJECT_MODEL.find(
      { isDelete: false },
      { isDelete: 0, __v: 0, createdAt: 0 }
    ).populate("responsibleUsers", "username -_id");

    if (!projects)
      throw createError(404, getFailureResponse("No Projects Found"));

    return res.json(
      getSuccessResponse("All Projects Fetched Successfully", projects)
    );
  } catch (error) {
    next(error);
  }
};
