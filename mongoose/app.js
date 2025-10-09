require("dotenv").config();

const path = require("path");
const express = require("express");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const mongoose = require("mongoose");

const storeRouter = require("./routes/storeRouter");
const hostRouter = require("./routes/hostRouter");
const authRouter = require("./routes/authRouter");
const rootDir = require("./utils/pathUtil");
const errorController = require("./controllers/errors");

const app = express();

// MongoDB Session Store
const store = new MongoDBStore({
  uri: process.env.MONGO_URL,
  collection: "sessions",
});

store.on("error", function (error) {
  console.log("Session Store Error:", error);
});

app.set("view engine", "ejs");
app.set("views", "views");

// Middleware
app.use(express.static(path.join(rootDir, "public")));
app.use(express.urlencoded({ extended: true }));

// Session Middleware (IMPORTANT: routes se pehle)
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: store,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7,
    },
  })
);

// Locals Middleware - Makes isLoggedIn available in all views
app.use((req, res, next) => {
  console.log("Session Data:", req.session);
  res.locals.isLoggedIn = req.session.isLoggedIn || false;
  res.locals.user = req.session.user || null;
  console.log("res.locals:", res.locals.user);
  next();
});

// Routes
app.use(authRouter);
app.use(storeRouter);

// Protected Routes Middleware - Host routes ko protect karo
app.use("/host", (req, res, next) => {
  if (req.session.isLoggedIn) {
    next();
  } else {
    console.log("Unauthorized access attempt to:", req.originalUrl);
    res.redirect("/login");
  }
});

app.use("/host", hostRouter);

app.use(errorController.pageNotFound);

const PORT = process.env.PORT || 3001;
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on address http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Failed to connect to MongoDB", err);
  });
