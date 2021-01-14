const express = require("express");
const router = express.Router();
const myUsers = require("../models/myUsers");

//Using our router object instead of app
router.get("/show", (req, res) => {
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
//Exporting our router
module.exports = router;
