const express = require("express");
const userRoute = require("./users/user.route");
const { projectRoute } = require("./project/project.routes");
const { dailySheetRoute } = require("./dailySheet/dailySheet.route");
const { notFoundHandler, errorHandler, validationError } = require("./middlewares/error.middleware");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", userRoute);
app.use("/api", projectRoute);
app.use("/api", dailySheetRoute);

app.use(validationError);
app.use(notFoundHandler);
app.use(errorHandler);

exports.app = app;
