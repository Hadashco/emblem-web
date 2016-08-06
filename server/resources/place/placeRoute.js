var router = require('express').Router();
var sockets = require('../../sockets');
var Place = require('../../db/db').Place;

router.get('/', function(req, res) {
  Place.sync().then(() => {
    Place.findAll().then(result => {
      res.send(result);
    });
  });
});

router.post('/', function(req, res) {
  Place.sync().then(() => {
    Place.create({ long: req.body.long, lat: req.body.lat })
      .then(place => {
        sockets.broadcast('place/createPlace', place);
        res.send('Post successful.');
      });
  });
});

router.get('/:id', function(req, res) {
  console.log(req.params.id);
  res.send('this is a place with an id');
});

module.exports = router;
