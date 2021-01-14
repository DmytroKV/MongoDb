const mongoose = require("mongoose");
const express = require("express");
const app = express();
const morgan = require("morgan");
const myUsers = require("../models/myUsers");

const PORT = process.env.PORT || 5000;
const uri =
  "mongodb+srv://dbUser:qB7viqjbHjkdfa9@cluster0.otyvk.mongodb.net/test";

app.use(morgan("tiny"));

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.on("connected", () => {
  console.log("Connected!");
});

const data = {
  item: "Another posted item",
  qty: 1,
  size: {
    h: 25,
    w: 20,
    uom: "cm",
  },
  status: "A",
};

//instance for saving
const newMyUsers = new myUsers(data);
app.post("/save", (req, res) => {
  //saving data to MongoDB
  newMyUsers.save((error) => {
    if (error) {
      console.log("Error occured while saving!");
      res.status(400).json({ error });
    } else {
      console.log("Data has been saved!");
      res.status(201).json({ status: "Data has been saved!" });
    }
  });
});
app.get("/show", (req, res) => {
  myUsers //usersModel.myUsers
    .find({})
    .then((data) => {
      console.log("Data: ", data);
      res.json(data);
    })
    .catch((error) => {
      console.log("error: ", error);
    });
});

app.listen(PORT, console.log(`Server listening at the port ${PORT}`));
