const createError = require("http-errors");
const { getFailureResponse } = require("../utils/response");
const { ValidationError } = require('express-validation')

exports.errorHandler = (err, req, res, next) => {
  console.log("=======err========",err);
  
  const status = err.status || 500;
  const errorMessage = err.message || "Something went wrong";

  res.status(status).json(getFailureResponse(status, errorMessage));
};

exports.notFoundHandler = (req, res, next) => {
  return next(createError(404, "Page Not Found"));
};

const getErrorMessage = (err) => {
  for (let entity of ['query','params','body']) {
    if (err.details[entity]) {
      return err.details[entity][0].message;
    }
  }
}

exports.validationError = function (err, req, res, next){
  if (err instanceof ValidationError) {
    let errorMessage = getErrorMessage(err);
    const status = err.statusCode;
    const errName = err.name;
    return res.status(err.statusCode).json(getFailureResponse(status, errorMessage, errName));
  }
  // return res.status(500).json(err);
  next(err);
}