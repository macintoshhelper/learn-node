const fs = require('fs');
const path = require('path');

const dbConnection = require('./db_connection.js');

fs.readFile(path.join(__dirname, './db_build.sql')
  .then((err, res) => {
    console.log('Database created with the result ', res);
    return process.exit();
  })
  .catch(err => throw err);
