const mongoose = require("mongoose");
const Joi = require("joi");
const express = require("express");
const router = express.Router();

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

router.get("/", async (req, res) => {
  const users = await User.find().sort("username");
  return res.send(users);
});

router.post("/", async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = new User({ username: req.body.username, email: req.body.email });
  user = await user.save();

  res.send(user);
});

router.put("/:id", async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findByIdAndUpdate(
    req.params.id,
    { username: req.body.username, email: req.body.email },
    { new: true }
  );

  if (!user)
    return res.status(404).send("The user with the given ID was not found.");

  res.send(user);
});

router.delete("/:id", async (req, res) => {
  const user = await User.findByIdAndRemove(req.params.id);

  if (!user)
    return res.status(404).send("The user with the given ID was not found.");

  res.send(user);
});

router.get("/:id", async (res, req) => {
  const user = await User.findById(req.params.id);

  if (!user)
    return res.status(404).send("The user with the given ID was not found.");

  res.send(user);
});

function validateUser(user) {
  const schema = Joi.object({
    name: Joi.string().min(5).max(50).required(),
    email: Joi.string().min(5).max(50).required(),
  });
  return schema.validate(user);
}

module.exports = router;
