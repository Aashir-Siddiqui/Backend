const express = require("express");

const requestHandler = require("./user");

const app = express();

app.get('/',(req, res, next) => {
  console.log("First middleware", req.url, req.method);
  next();
});

app.post('/submit-details',(req, res, next) => {
  console.log("Second middleware", req.url, req.method);
  res.send("<h1>Hello from Express</h1>");
});

app.use('/',(req, res, next) => {
  console.log("Another middleware", req.url, req.method);
  res.send("<h1>Hello from Another middleware</h1>");
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server runing at http://localhost:${PORT}`);
});
