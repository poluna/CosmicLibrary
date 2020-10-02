const mongoose = require("mongoose");
const Joi = require("joi");

const usersSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlegnth: 5,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    minlegnth: 5,
    maxlength: 50,
  },
});

const User = mongoose.model("User", usersSchema);

function validateUser(user) {
  const schema = Joi.object({
    username: Joi.string().min(5).max(50).required(),
    email: Joi.string().min(5).max(50).required(),
  });
  return schema.validate(user);
}

exports.User = User;
exports.validate = validateUser;
