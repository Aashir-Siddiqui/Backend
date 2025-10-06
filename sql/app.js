const path = require("path");

const express = require("express");

const storeRouter = require("./routes/storeRouter");
const hostRouter = require("./routes/hostRouter");
const rootDir = require("./utils/pathUtil");
const errorController = require("./controllers/errors");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.static(path.join(rootDir, "public")));

app.use(express.urlencoded());
app.use(storeRouter);
app.use("/host", hostRouter);

app.use(errorController.pageNotFound);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
