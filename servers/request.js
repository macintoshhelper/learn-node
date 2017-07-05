var http = require('http');
var https = require('https');
var url = require('url');



var request = (urlString, callback) => {
    var parsedUrl = url.parse(urlString);
    var protocol = parsedUrl.protocol;
    var protocolRequest = (protocol === 'https:') ? https.request : http.request;

    var options = {
      hostname: parsedUrl.hostname,
    //   port: parsedUrl || (),
      path: parsedUrl.path,
      method: 'GET',
      headers: {
          "User-Agent": 'Awesome-Github-App'
      }
    };

    var req = protocolRequest(options, (res) => {
      res.setEncoding('utf8');

      var data = '';

      res.on('data', (chunk) => {
          data += chunk;
      });
      res.on('end', () => {
          callback(null, res, data);
      });
      res.on('error', (error) => {
          callback(error);
      })
    });

    req.on('error', (error) => {
      callback(error);
    });

    req.end();
}


request('https://api.github.com/users/google', (error, response, data) => {
    if (error) {
        console.log(error.message);
        return;
    }
    console.log("Data: \n", JSON.parse(data));
})
