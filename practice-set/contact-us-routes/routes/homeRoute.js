const path = require("path");

const express = require("express");

const homeRoute = express.Router();

const rootDir = require("../utils/pathUtil");

homeRoute.get("/", (req, res) => {
  console.log("Handling / for GET", req.url, req.method);
  res.sendFile(path.join(rootDir, "views", "home.html"));
});

module.exports = homeRoute;
