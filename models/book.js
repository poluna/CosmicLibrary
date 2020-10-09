const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlegnth: 5,
    maxlength: 50,
  },
  author: {
    name: {
      type: String,
      required: true,
    },
    surname: {
      type: String,
      required: true,
    },
  },
  date: {
    type: Date,
    required: true,
  },
  isbn: {
    type: String,
    required: true,
  },
});

const Book = mognoose.model("Book", bookSchema);

function validateBook(book) {
  const schema = Joi.object({
    title: Joi.string().min(5).max(50).required(),
  });
  return schema.validate(book);
}

exports.Book = Book;
exports.validate = validateGenre;
