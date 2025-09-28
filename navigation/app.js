const http = require("http");

const server = http.createServer((req, res) => {

  if(req.url === '/home'){
    res.write('<h1>Home Page</h1>')
  }else if(req.url === '/about'){
    res.write('<h1>About Page</h1>')
  }else if(req.url === '/service'){
    res.write('<h1>Service Page</h1>')
  }else if(req.url === '/contact'){
    res.write('<h1>Contact Page</h1>')
  }

  res.write(`
    <html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Navigation</title>
</head>
<body>
  <nav>
    <ul>
      <li><a href="/home">Home</a></li>
      <li><a href="/about">About</a></li>
      <li><a href="/service">Service</a></li>
      <li><a href="/contact">Contact</a></li>
    </ul>
  </nav>
</body>
</html>
    `);
});

const PORT = 3001;

server.listen(PORT, () => {
  console.log(`Server runing at http://localhost:${PORT}`);
});
