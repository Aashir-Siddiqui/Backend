const sumHandler = (req, res) => {
  console.log("Inside sum handler", req.url);

  const body = [];
  req.on("data", (chunk) => body.push(chunk));
  req.on("end", () => {
    const parsedBody = Buffer.concat(body).toString();
    const params = new URLSearchParams(parsedBody);
    const objBody = Object.fromEntries(params);
    const result = Number(objBody.num1) + Number(objBody.num2);
    console.log(objBody, result);
    res.setHeader("Content-Type", "text/html");
    res.write(`<html>
        <head><title>Calculator</title></head>
        <body>
        <h1>Sum is ${result}</h1>
        <a href="/calculator">Go back to calculator</a>
        </body>
        </html>`);
    return res.end();
  });
};

exports.sumHandler = sumHandler;
