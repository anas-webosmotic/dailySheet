const { connect, connection } = require("mongoose");

const connectDatabase = () => {
  return connect("mongodb://localhost:27017/dailySheet");
};

connection.on("connected", () => {
  console.log("Database Connected");
});

module.exports = connectDatabase;
