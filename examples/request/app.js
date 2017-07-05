const http = require('http');
const https = require('https');
const url = require('url');


const request = (urlString, callback) => {
  const parsedUrl = url.parse(urlString);
  const protocol = parsedUrl.protocol;
  const protocolRequest = (protocol === 'https:') ? https.request : http.request;

  const options = {
    hostname: parsedUrl.hostname,
  //   port: parsedUrl || (),
    path: parsedUrl.path,
    method: 'GET',
    headers: {
      'User-Agent': 'Awesome-Github-App',
    },
  };

  const req = protocolRequest(options, (res) => {
    res.setEncoding('utf8');

    let data = '';

    res.on('data', (chunk) => {
      data += chunk;
    });
    res.on('end', () => {
      callback(null, res, data);
    });
    res.on('error', (error) => {
      callback(error);
    });
  });

  req.on('error', (error) => {
    callback(error);
  });

  req.end();
};


request('https://api.github.com/users/google', (error, response, data) => {
  if (error) {
    return console.log(error.message);
  }
  return console.log('Data: \n', JSON.parse(data));
});
