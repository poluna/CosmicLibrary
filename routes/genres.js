const mongoose = require("mongoose");
const Joi = require("joi");
const debug = require("debug");
const express = require("express");
const router = express.Router();

const genresSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlegnth: 4,
    maxlength: 50,
  },
});

const Genre = mongoose.model("Genre", genresSchema);

// we don't have to use whole "/api/genres"
router.get("/", async (req, res) => {
  debug(`Showing genres`);
  const genres = await Genre.find().sort("name");
  return res.send(genres);
});

router.post("/", async (req, res) => {
  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let genre = new Genre({ name: req.body.name });
  genre = await genre.save();

  res.send(genre); 
}); 

router.put("/:id", async (req, res) => {
  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = await Genre.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    { new: true }
  );

  if (!genre)
    return res.status(404).send("The genre with the given ID was not found.");

  res.send(genre);
});

router.delete("/:id", async (req, res) => {
  const genre = await Genre.findByIdAndRemove(req.params.id);

  if (!genre)
    return res.status(404).send("The genre with the given ID was not found.");

  res.send(genre);
});

router.get("/:id", async (res, req) => {
  const genre = await Genre.findById(req.params.id);

  if (!genre)
    return res.status(404).send("The genre with the given ID was not found.");

  res.send(genre);
});

function validateGenre(genre) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });
  return schema.validate(genre);
}

module.exports = router;
