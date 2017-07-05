# learn-node
Learn Node and frameworks such as Express

## Getting Started

### Mac Setup
```sh
# Install Homebrew package manager
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"

brew update

brew install node
```

### Debian Setup
```sh
apt-get update
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.2/install.sh | bash
source ~/.profile

# Where 8 is the current Node version
nvm install 8
nvm use 8
```

## Useful Functions

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
