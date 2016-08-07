const router = require('express').Router();
const sockets = require('../../sockets');
const Place = require('../../db/db').Place;

router.get('/', (req, res) => {
  Place.findAll().then(result => {
    res.send(result);
  });
});

router.post('/', (req, res) => {
  Place.create({ long: req.body.long, lat: req.body.lat })
    .then(place => {
      sockets.broadcast('place/createPlace', place);
      res.send(JSON.stringify(place));
    });
});

router.post('/:id', (req, res) => {
  Place.find({id: req.params.id})
    .then(place => {
      place.assignArtById(req.body.artId);
    });
});

router.get('/:id', (req, res) => {
  console.log(req.params.id);
  res.send('this is a place with an id');
});

module.exports = router;
