const validateObjectId = require("../middleware/validateObjectId");
const { Book } = require("../models/book");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const books = await Book.find().sort("title");
  return res.send(books);
});

router.get("/:id", validateObjectId, async (req, res) => {
  const book = await Book.findById(req.params.id);

  if (!book)
    return res.status(404).send("The book with the given ID was not found.");

  res.send(book);
});

module.exports = router;
