const path = require('path');
const express = require('express');

const router = require('./routes/router');

const app = express();

app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'hbs');

app.use(router);

app.use((req, res/*, next*/) => {
  const err = new Error('Error 404: Page not found');
  err.status = 404;
  res.status(err.status);
  res.send(err);
  // next(err);
});

app.use((err, req, res) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
