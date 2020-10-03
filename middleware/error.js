const winston = require("winston");

// this function catches any errors in the request process in pipeline
module.exports = function (err, req, res, next) {
  winston.error(err.message, err);
  res.status(500).send("Something failed.");
};
