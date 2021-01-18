const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { Schema } = mongoose;

const saltRounds = 10;

const UsersSchema = new Schema({
  email: String,
  hash: String,
  salt: String,
});

UsersSchema.methods.setPassword = function (password) {
  this.salt = bcrypt.genSaltSync(saltRounds);
  this.hash = bcrypt.hashSync(password, this.salt);
};

UsersSchema.methods.validatePassword = function (password) {
  if (bcrypt.compareSync(password, this.hash)) {
    return this.hash;
  } else {
    return false;
  }
};

UsersSchema.methods.generateRefreshJWT = function () {
  return jwt.sign(
    {
      email: this.email,
      id: this._id,
    },
    "secret",
    { expiresIn: "1h" }
  );
};
UsersSchema.methods.generateJWT = function () {
  return jwt.sign(
    {
      email: this.email,
      id: this._id,
    },
    "secret",
    { expiresIn: "1m" }
  );
};

UsersSchema.methods.toAuthJSON = function () {
  return {
    _id: this._id,
    email: this.email,
    token: this.generateJWT(),
    refreshToken: this.generateRefreshJWT(),
  };
};

mongoose.model("Users", UsersSchema);
