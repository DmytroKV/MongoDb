const path = require("path");
require("dotenv").config({
  path: path.join("", "", "settings.env"),
});
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const morgan = require("morgan");

//separate router for GET
const getRoutes = require("../api-routes/get-api");
//separate router for POST
const postRoutes = require("../api-routes/post-api");

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

//Appending GET
app.use("/get-routes", getRoutes);
//Appending POST
app.use("/post-routes", postRoutes);

app.listen(PORT, console.log(`Server listening at the port ${PORT}`));

//Links:
//http:localhost:5000/get-routes/      - GET (main page)
//http:localhost:5000/get-routes/show  - GET
//http:localhost:5000/post-routes/save - POST
