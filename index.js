const mongoose = require("mongoose");
const express = require("express");
const genres = require("./routes/genres");
const customers = require("./routes/customers");
const home = require("./routes/home");
const app = express();

mongoose
  .connect("mongodb://localhost/dbtest")
  .then(() => console.log("Connect to MongoDB..."))
  .catch((err) => console.log("Could not connect to MongoDB..."));

app.use(express.json());
app.use("/api/genres", genres); // for any routes that starts with "/api/genres" use this router (genres)
app.use("/api/customers", customers);
app.use("/", home);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
