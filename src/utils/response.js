exports.getSuccessResponse = (message, data) => {
  let response = {
    message,
    status: "Successful",
  };
  if (data) response.data = data;
  return response;
};

exports.getFailureResponse = (statusCode = 400 , message, errName) => {
    return {
        status : errName || "error",
        error: {
            statusCode,
            message
        }
    }
};