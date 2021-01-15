const mongoose = require("mongoose");

//Defining schema
const Schema = mongoose.Schema;
const myItemsSchema = new Schema({
  item: String,
  qty: Number,
  size: {
    h: Number,
    w: Number,
    uom: String,
  },
  status: String,
});

const myItems = mongoose.model("myItems", myItemsSchema);
module.exports = myItems;
