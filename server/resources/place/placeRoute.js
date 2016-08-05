var router = require('express').Router();
var Place = require('./placeModel');

router.get('/', function(req, res) {
  res.send('this is a bunch of places');
});

router.get('/:id', function(req, res) {
  res.send('this is a place with an id');
});

module.exports = router;
