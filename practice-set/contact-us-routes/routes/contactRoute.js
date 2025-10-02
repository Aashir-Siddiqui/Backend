const path = require("path");

const express = require("express");

const contactRoute = express.Router();
const rootDir = require("../utils/pathUtil");

contactRoute.get("/contact", (req, res) => {
  console.log("Handling /contact for GET", req.url, req.method);
  res.sendFile(path.join(rootDir, "views", "contact-form.html"));
});

contactRoute.post("/contact", (req, res) => {
  console.log("Handling /contact for POST", req.url, req.method);
  res.sendFile(path.join(rootDir, "views", "contact-success.html"));
});

module.exports = contactRoute;