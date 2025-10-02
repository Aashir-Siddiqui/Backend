const path = require("path");

const express = require("express");
const homeRoute = require("./routes/homeRoute");
const contactRoute = require("./routes/contactRoute");
const rootDir = require("./utils/pathUtil");

const app = express();

app.use(express.urlencoded());

app.use(homeRoute);
app.use(contactRoute);

app.use((req, res) => {
  res.status(404).sendFile(path.join(rootDir, "views", "404.html"));
});

const port = 3000;
app.listen(port, () => {
  console.log(`Express is listening on port ${port}`);
});
