const mongoose = require("mongoose");

//Defining schema
const Schema = mongoose.Schema;
const myUsersSchema = new Schema({
  item: String,
  qty: Number,
  size: {
    h: Number,
    w: Number,
    uom: String,
  },
  status: String,
});

const myUsers = mongoose.model("myUsers", myUsersSchema);
module.exports = myUsers;
/*
export const myUsers = mongoose.model("myUsers", myUsersSchema);
export default { myUsers };
*/
/*
module.exports = {
  usersModel: function () {
    const myUsers = mongoose.model("myUsers", myUsersSchema);
  },
};
*/
