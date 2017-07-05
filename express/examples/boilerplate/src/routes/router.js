const express = require('express');

const home = require('./home');

const router = express.Router();

router.get('/', home);
// router.get('/api/:variable/:variable?', module);

module.exports = router;
