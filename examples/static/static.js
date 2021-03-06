const http = require('http');
const fs = require('fs');
const path = require('path');

const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname, './public');

const header = { 'content-type': 'text/plain' };

const staticFile = (req, res) => {
  // var parsedUrl = url.parse(req.url);
  let filePath = path.join(publicPath, req.url);
  if (filePath.charAt(filePath.length - 1) === '/') filePath = path.join(filePath, 'index.html');
  const extension = String(path.extname(filePath)).toLowerCase();

  const mimeTypes = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpg',
    '.gif': 'image/gif',
    '.wav': 'audio/wav',
    '.mp4': 'video/mp4',
    '.woff': 'application/font-woff',
    '.ttf': 'application/font-ttf',
    '.eot': 'application/vnd.ms-fontobject',
    '.otf': 'application/font-otf',
    '.svg': 'application/image/svg+xml',
  };
  const contentType = mimeTypes[extension] || 'text/plain';

  fs.readFile(filePath, (error, file) => {
    if (error) {
      if (error.code === 'ENOENT') {
        res.writeHead(404, header);
        res.write('Error 404: Page not Found');
        res.end();
      } else {
        res.writeHead(500, header);
        res.write('Error 500: Internal Server Error');
        res.end();
      }
      return;
    }
    res.writeHead(200, { 'Content-Type': contentType });
    res.write(file, 'utf-8');
    res.end();
  });
};

const router = (req, res) => {
  const url = req.url;
  if (url === '/dynamic') {
    res.writeHead(200, header);
    res.write('Welcome to a dynamic page!');
    res.end();
  } else {
    staticFile(req, res);
  }
};


const startServer = () => {
  const server = http.createServer(router);

  server.listen(port, (error) => {
    if (error) throw error;
    console.log(`Server is running on port: ${port}`);
  });
};

startServer();
