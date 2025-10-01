const express = require("express");
const { url } = require("inspector");

const app = express();

app.use((req, res, next) => {
  console.log("This is my first middleware", req.url, req.method);
  next();
});

app.get("/", (req, res) => {
  console.log("Handling / for GET", req.url, req.method);
  res.send("<h1>This is home page</h1>");
});

app.get("/contact", (req, res) => {
  console.log("Handling /contact for GET", req.url, req.method);
  res.send(`<h1>Contact form here</h1>
    <form action="/contact" method="POST">
      <input type="text" name="name" placeholder="Enter your name" />
      <input type="email" name="email" placeholder="Enter your email" />
      <button type="submit">Submit</button>
    </form>`);
});

app.post("/contact", (req, res) => {
  console.log("Handling /contact for POST", req.url, req.method);
  res.send("<h1>Form submitted successfully</h1>");
});

const port = 3000;
app.listen(port, () => {
  console.log(`Express is listening on port ${port}`);
});
