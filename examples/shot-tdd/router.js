const router = (req, res) => {
  if (req.url === '/') {
    res.writeHead(200, { 'content-type': 'text/plain' });
    res.write('Hello world.');
    res.end();
  }
};

module.exports = router;
