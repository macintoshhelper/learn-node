# learn-node
Learn Node and frameworks such as Express

### Vanilla Static File Handler:
- Put this into a static file handler module, and call it in the router.
    ```js
    var staticFile = (req, res) => {
        var filePath = path.join(publicPath, req.url);
        if (filePath.charAt(filePath.length-1) === '/') filePath = path.join(filePath, 'index.html');
        var extension = String(path.extname(filePath)).toLowerCase();

        var header = {'content-type': 'text/plain'};
        var mimeTypes = {
            '.html': 'text/html',
            '.js': 'text/javascript',
            '.css': 'text/css',
            '.json': 'application/json',
    /*        '.png': 'image/png',
            '.jpg': 'image/jpg',
            '.gif': 'image/gif',
            '.wav': 'audio/wav',
            '.mp4': 'video/mp4',
            '.woff': 'application/font-woff',
            '.ttf': 'application/font-ttf',
            '.eot': 'application/vnd.ms-fontobject',
            '.otf': 'application/font-otf',
            '.svg': 'application/image/svg+xml'*/
        };
        var contentType = mimeTypes[extension] || 'text/plain';

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
            res.writeHead(200, {'Content-Type': contentType});
            res.write(file, 'utf-8');
            res.end();
        })

    }

    ```
