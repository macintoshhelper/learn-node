# Learn `pg` npm module - PostgreSQL Node client

## Getting Started
Installation:
```sh
npm i pg
```

Importing pool:
```js
const { Pool } = require('pg');

```

## Connecting

Connection URL syntax:
```
postgresql://[user[:password]@][hostname][:port][/dbname][?param1=value1&...]
```

Minimum example:
```js
const { Pool } = require('pg');

// Create a params object from the URL (use config variables!)
const params = url.parse('postgresql://user:password@hostname:5432/dbname');
const dbName = params.pathname.split('/')[1];
const [username, password] = params.auth.split(':');

// Options object with all the connection extracted parameters
const options = {
  host: params.hostname,
  port: params.port,
  database: params.pathname.split('/')[1],
  max: 2,
  user: username,
  password,
};

// SSL should be enabled if you're not testing locally
options.ssl = (options.host !== 'localhost');

// Where connection is an exportable object
const connection = new Pool(options);
```
