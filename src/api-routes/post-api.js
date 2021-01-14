const express = require("express");
const router = express.Router();
const myUsers = require("../models/myUsers");

const data = {
  item: "Another posted save item",
  qty: 1,
  size: {
    h: 25,
    w: 20,
    uom: "cm",
  },
  status: "A",
};

const newMyUsers = new myUsers(data);
//Using our router object instead of app
router.post("/save", (req, res) => {
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
//Exporting our router
module.exports = router;
