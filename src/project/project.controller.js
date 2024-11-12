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
      const newProject = await PROJECT_MODEL.create(payload);
      return res.json(
        getSuccessResponse("Project Created Successfully", newProject)
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

    if (!projects) throw createError(404, "No Projects Found");

    return res.json(
      getSuccessResponse("All Projects Fetched Successfully", projects)
    );
  } catch (error) {
    next(error);
  }
};

exports.getProjectById = async (req, res, next) => {
  try {
    const { projectId } = req.params;

    const projects = await PROJECT_MODEL.findOne(
      { _id: projectId, isDelete: false },
      { isDelete: 0, __v: 0, createdAt: 0 }
    ).populate("responsibleUsers", "username -_id");

    if (!projects) throw createError(404, "No Projects Found");

    return res.json(
      getSuccessResponse("All Projects Fetched Successfully", projects)
    );
  } catch (error) {
    next(error);
  }
};

exports.updateProjectById = async (req, res, next) => {
  try {
    const { projectId } = req.params;
    const payload = req.body;
    const options = { new: true };

    const projects = await PROJECT_MODEL.findByIdAndUpdate(
      projectId,
      payload,
      options
    );

    if (projects) {
      const { _id, createdAt, __v, isDelete, ...result } = projects.toObject();
      return res.json(
        getSuccessResponse("Project Updated Successfully", result)
      );
    }

    return res.json(getFailureResponse(404, "No Projects Found"));
  } catch (error) {
    next(error);
  }
};

exports.deleteProjectById = async (req, res, next) => {
  try {
    const { projectId } = req.params;

    const project = await PROJECT_MODEL.findByIdAndUpdate(projectId, {
      isDelete: true,
    });

    if (project) {
      return res.json(getSuccessResponse("Project Deleted Successfully"));
    }

    return res.json(getFailureResponse(404, "No Projects Found"));
  } catch (error) {
    next(error);
  }
};
