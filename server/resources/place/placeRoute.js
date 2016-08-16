const router = require('express').Router();
const sockets = require('../../sockets');
const Place = require('../../db/db').Place;

// Add a new place
router.post('/', (req, res) => {
  // sector = lat.toFixed(5) + long.toFixed(5);
  Place.create({ long: req.body.long, lat: req.body.lat, sector: req.body.sector })
    .then(place => {
      place.setUser(req.user); // add creator ID
      sockets.broadcast('place/createPlace', place);
      res.send(JSON.stringify(place));
    });
});

// Get all places
router.get('/', (req, res) => {
  Place.findAll().then(result => {
    res.send(result);
  });
});

// Get a specific place
router.get('/:id', (req, res) => {
  console.log(req.params.id);
  res.send('this is a place with an id');
});

module.exports = router;
