const router = require('express').Router();
const sockets = require('../../sockets');
const db = require('../../db/db');
const { Place } = db;

// Add a new places
router.post('/', (req, res) => {
  const sector = req.body.lat.toFixed(5) + req.body.long.toFixed(5);
  Place.create({ long: req.body.long, lat: req.body.lat, sector })
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
  Place.findById(req.params.id)
    .then(place => {
      if (place) {
        res.status(200).json(place);
      } else {
        res.status(200).send('Place not found');
      }
    })
    .catch(err => res.status(401).send(JSON.stringify(err)));
});

// Get all art at a specific place
// Assumes that input includes: 1) placeId in route
router.get('/:id/art', (req, res) => {
  Place.findById(req.params.id)
    .then(place => {
      place.getArts()
        .then(arts => {
          res.status(200).json(arts);
        })
        .catch(err => res.status(401).send(JSON.stringify(err)));
    });
});

module.exports = router;
