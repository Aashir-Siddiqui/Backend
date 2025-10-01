const { sumHandler } = require("./sum");

const requestHandler = (req, res) => {
  console.log(req.url, req.method);
  if (req.url === "/") {
    res.setHeader("Content-Type", "text/html");
    res.write(`<html>
        <head><title>Calculator</title></head>
        <body>
        <h1>Welcome to Calculator</h1>
        <a href="/calculator">Go to Calculator</a>
        </body>
        </html>`);
    return res.end();
  } else if (req.url.toLowerCase() === "/calculator") {
    res.setHeader("Content-Type", "text/html");
    res.write(`<html>
        <head><title>Calculator</title></head>
        <body>
        <h1>Here is your calculator</h1>
        <form action="/calculate-result" method="POST">
        <input type="number" name="num1" placeholder="Enter first number" />
        <input type="number" name="num2" placeholder="Enter second number" />
        <button type="submit">Calculate Sum</button>
        </form>
        </body>
        </html>`);
    return res.end();
  } else if (
    req.url.toLowerCase() === "/calculate-result" &&
    req.method === "POST"
  ) {
    return sumHandler(req, res);
  }

  res.setHeader("Content-Type", "text/html");
  res.write(`<html>
    <head><title>Calculator</title></head>
    <body>
    <h1>Page does not exist</h1>
    <a href="/">Go to home</a>
    </body>
    </html>`);
  res.end();
};

exports.requestHandler = requestHandler;
