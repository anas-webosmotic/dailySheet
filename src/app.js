const express = require("express");
const { userRoute } = require("./users/user.routes");
const { projectRoute } = require("./project/project.routes");
const { dailySheetRoute } = require("./dailySheet/dailySheet.routes");
const { notFoundHandler, errorHandler, validationError } = require("./middlewares/error.middleware");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", userRoute);
app.use("/api", projectRoute);
app.use("/api/dailySheet/:userId", dailySheetRoute);

app.use(validationError);
app.use(notFoundHandler);
app.use(errorHandler);

exports.app = app;
