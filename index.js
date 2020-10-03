require("express-async-errors");
const winston = require("winston");
const config = require("config");
const mongoose = require("mongoose");
const express = require("express");
const genres = require("./routes/genres");
const users = require("./routes/users");
const home = require("./routes/home");
const auth = require("./routes/auth");
const error = require("./middleware/error");
const app = express();

process.on("uncaughtException", (ex) => {
  winston.error(ex.message, ex);
  process.exit(1);
});

process.on("unhandledRejection", (ex) => {
  winston.error(ex.message, ex);
  process.exit(1);
});

winston.add(new winston.transports.File({ filename: "logfile.log" }));

if (!config.get("jwtPrivateKey")) {
  console.error("FATAL ERROR: jwtPrivateKey is not defined");
  process.exit(1);
}

mongoose
  .connect("mongodb://localhost/dbtest", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("Connect to MongoDB..."))
  .catch((err) => console.log("Could not connect to MongoDB..."));

app.use(express.json());
app.use("/api/genres", genres); // for any routes that starts with "/api/genres" use this router (genres)
app.use("/api/users", users);
app.use("/api/auth", auth);
app.use("/", home);
app.use(error);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
