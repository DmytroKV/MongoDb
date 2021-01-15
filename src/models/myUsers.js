const mongoose = require("mongoose");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { throws } = require("assert");

const { Schema } = mongoose;

const saltRounds = 10;

const UsersSchema = new Schema({
  email: String,
  hash: String,
  salt: String,
});

UsersSchema.methods.setPassword = function (password) {
  this.salt = crypto.randomBytes(16).toString("hex");
  this.hash = crypto
    .pbkdf2Sync(password, this.salt, 10000, 512, "sha1")
    .toString("hex");
};

UsersSchema.methods.validatePassword = function (password) {
  const hash = crypto
    .pbkdf2Sync(password, this.salt, 10000, 512, "sha1")
    .toString("hex");
  return this.hash === hash;
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
