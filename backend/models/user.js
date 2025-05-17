const { string, required } = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const UserSchema = new Schema({
  name: {
    type: string,
    required: true,
  },
  email: {
    type: string,
    required: true,
    unique: true,
  },
  Password: {
    type: string,
    required: true,
  },
});
const UserModel = mongoose.model("users", UserSchema);
module.exports = UserModel;
