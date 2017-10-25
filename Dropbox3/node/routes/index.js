var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Ready to go, your grace.....' });
});

module.exports = router;
