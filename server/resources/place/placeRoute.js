var router = require('express').Router();
var Place = require('./placeModel');

router.get('/', function(req, res) {
  Place.sync().then(() => {
    // create to be removed
    Place.create({longitude: 2.44, latitude: 3.22}).then(() => {
      Place.findAll().then(result => {
        console.log(result);
        res.send(result);
      });
    });
  });
});

router.get('/:id', function(req, res) {
  res.send('this is a place with an id');
});

module.exports = router;
