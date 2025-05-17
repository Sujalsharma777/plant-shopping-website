const joi = require("joi");
const { Schema } = require("mongoose");
const signupvaildation = (req, res, next) => {
  const schema = joi.object({
    name: joi.string().min(3).max(100).required(),
    email: joi.string().email(3).required(),
    password: joi.string().min(4).max(100).required(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: "bad request ", error });
  }
  next();
};
const loginvaildation = (req, res, next) => {
  const schema = joi.object({
    email: joi.string().email(3).required(),
    password: joi.string().min(4).max(100).required(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: "bad request ", error });
  }
  next();
};
module.exports = {
  signupvaildation,
  loginvaildation,
};
