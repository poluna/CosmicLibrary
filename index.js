const express = require("express");
const genres = require("./routes/genres");

const home = require("./routes/home");
const app = express();

app.use(express.json());
app.use("/api/genres", genres); // for any routes that starts with "/api/genres" use this router (genres)
app.use("/", home);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
