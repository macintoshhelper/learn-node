var http = require('http');
var fs = require('fs');
var path = require('path');

var port = 3000;

var utils = {
    printPublicFile: function(relativePath, callback) {
        var filePath = path.join(__dirname, '../public/' + relativePath);

        fs.readFile(filePath, function(err, file) {
            var resData = {
                error: false,
            }
            if (err) {
                callback(err);
                return;
            }

            fileType = relativePath.split('.')[1];


            var contentTypeTable = {
                "html": "text/html",
                "css": "text/css",
                "js": "text/javascript",
                "ico": "image/x-icon"
            }
            if (contentTypeTable[fileType] === undefined) contentTypeTable[fileType] = "text/text";

            var contentType = contentTypeTable[fileType];

            resData.contentType = contentType;
            resData.responseString = file.toString();

            callback(null, resData);
        });
    }
}

var handler = function(req, res) {
    // console.log('Request object: ' + req);
    // console.log('Response object: ' + res)
    var url = req.url;
    // console.log("URL accessed: " + url);

    if (url.startsWith('/public/')) {
        relativePath = url.split('/public/')[1];

        utils.printPublicFile(relativePath, function(err, resData) {
            if (err) {
                console.log(err);
                res.statusCode(500);
                res.end();
                return;
            }

            // Generate response
            res.writeHead(200, {'content-type': resData.contentType})
            // res.send(fileString);
            // console.log(resData.responseString);
            res.end(resData.responseString);

        })



    } else {
        res.writeHead(404, {'content-type': 'text/html'})
        res.end('<h1 style="text-align: center">404 error - Page not Found</h1>');  // Move into callbacks
    }

}
var server = http.createServer(handler)

function startServer() {
    server.listen(port, function(err) {
        if (err) {
            throw err;
        }
        console.log('The server is running on port: ' + port);
    })
}

startServer();

// console.log(server);
