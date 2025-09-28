const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  console.log(req.url, req.method);

  const body = []

  req.on('data', chunk => {
    console.log(chunk)
    body.push(chunk)
  })

  req.on('end', () => {
    const fullBody = Buffer.concat(body).toString()
    console.log(fullBody)
  })

  if (req.url === "/") {
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<head><title>Backend</title></head>");
    res.write("<body><h1>Enter Your Details</h1>");
    res.write("<form action='submit-details' method='POST'>");
    res.write(
      '<input type="text" name="username" placeholder="Enter Your Name"/> <br>'
    );
    res.write('<label for="male">Male</label>');
    res.write('<input type="radio" value="male" name="gender" id="male"/>');
    res.write('<label for="female">Female</label>');
    res.write('<input type="radio" value="female" name="gender" id="female"/>');
    res.write('<br> <input type="submit" value="submit"/>');
    res.write("</form>");
    res.write("</body>");
    res.write("</html>");
    return res.end();
  } else if (
    req.url.toLowerCase() === "/submit-details" &&
    req.method === "POST"
  ) {
    fs.writeFileSync("user.txt", "Aashir Siddiqui");
    res.statusCode = 302;
    res.setHeader("Location", "/");
    return res.end();
  }

  res.setHeader("Content-Type", "text/html");
  res.write("<html>");
  res.write("<head><title>Backend</title></head>");
  res.write("<body><h1>Hello World</h1></body>");
  res.write("</html>");
  res.end();
});

const PORT = 3001;

server.listen(PORT, () => {
  console.log(`Server runing at http://localhost:${PORT}`);
});
