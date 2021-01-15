const path = require("path");
require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
require("./src/models/myUsers");
require("./src/config/passport");

app.use(bodyParser.json());

app.use(require("./src/api-routes"));

const PORT = process.env.MY_PORT;
const uri = process.env.MONGO_DB;

app.use(morgan("tiny"));

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.on("connected", () => {
  console.log("Connected!");
});

app.listen(PORT, console.log(`Server listening at the port ${PORT}`));
