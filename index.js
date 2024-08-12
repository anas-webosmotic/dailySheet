require("dotenv").config();
const { createServer } = require("http");

const connectDatabase = require("./src/utils/db.connection");
const { app } = require("./src/app");

const port = parseInt(process.env.PORT);

connectDatabase().then(() => {
  createServer(app).listen(port, () => {
    console.log(`Server Running on ${port}`);
  });
});
