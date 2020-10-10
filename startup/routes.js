const express = require("express");
const genres = require("../routes/genres");
const books = require("../routes/books");
const users = require("../routes/users");
const home = require("../routes/home");
const auth = require("../routes/auth");
const error = require("../middleware/error");

module.exports = function (app) {
  app.use(express.json());
  app.use("/api/genres", genres); // for any routes that starts with "/api/genres" use this router (genres)
  app.use("/api/users", users);
  app.use("/api/books", books);
  app.use("/api/auth", auth);
  app.use("/", home);
  app.use(error);
};
