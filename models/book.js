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
  year: {
    type: String,
    required: true,
  },
  isbn: {
    type: String,
    required: true,
  },
});

const Book = mongoose.model("Book", bookSchema);

function validateBook(book) {
  const schema = Joi.object({
    title: Joi.string().min(5).max(50).required(),
  });
  return schema.validate(book);
}

exports.Book = Book;
exports.validate = validateBook;
