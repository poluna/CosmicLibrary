const config = require("config");
const mongoose = require("mongoose");
const express = require("express");
const genres = require("./routes/genres");
const users = require("./routes/users");
const home = require("./routes/home");
const auth = require("./routes/auth");
const app = express();

if (!config.get("jwtPrivateKey")) {
  console.error("FATAL ERROR: jwtPrivateKey is not defined");
  process.exit(1);
}

mongoose
  .connect("mongodb://localhost/dbtest")
  .then(() => console.log("Connect to MongoDB..."))
  .catch((err) => console.log("Could not connect to MongoDB..."));

app.use(express.json());
app.use("/api/genres", genres); // for any routes that starts with "/api/genres" use this router (genres)
app.use("/api/users", users);
app.use("/api/auth", auth);
app.use("/", home);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
