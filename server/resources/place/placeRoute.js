const router = require('express').Router();
const sockets = require('../../sockets');
const db = require('../../db/db');
const { Place, TRAILING_DEC_SECTOR } = db;

// Add a new places
router.post('/', (req, res) => {
  const sector = req.body.lat.toFixed(TRAILING_DEC_SECTOR) + req.body.long.toFixed(TRAILING_DEC_SECTOR);
  Place.findOne({ where: { sector } })
    .then(place => { 
      if (place) {
        res.status(200).json(place); // Prevent duplicate entry of same place
      } else {
        Place.create({ long: req.body.long, lat: req.body.lat, sector })
          .then(place => {
            place.setUser(req.user); // add creator ID
            sockets.broadcast('place/createPlace', place);
            res.send(JSON.stringify(place));
          });
      }
    });
});

// Get all places
router.get('/', (req, res) => {
  Place.findAll().then(result => {
    res.send(result);
  });
});

// Find a place
router.get('/find/:lat/:long', (req, res) => {
  const sector = Number(req.params.lat).toFixed(TRAILING_DEC_SECTOR) + Number(req.params.long).toFixed(TRAILING_DEC_SECTOR);
  Place.findOne({ where: { sector } })
    .then(place => {
      if (place) {
        res.status(200).json(place);
      } else {
        return Place.create({ long: req.params.long, lat: req.params.lat, sector });
      }
    })
    .then(place => {
      place.setUser(req.user);
      sockets.broadcast('place/createPlace', place);
      res.status(201).json(place);
    });
});

// Find art at a lat / long (place ID unknown)
router.get('/find/art/:lat/:long', (req, res) => {
  const sector = Number(req.params.lat).toFixed(TRAILING_DEC_SECTOR) + Number(req.params.long).toFixed(TRAILING_DEC_SECTOR);
  Place.findOne({ where: { sector } })
    .then(place => {
      if (place) {
        place.getArts()
          .then(arts => {
            res.status(200).json(arts);
          })
          .catch(err => res.status(401).send(JSON.stringify(err)));
      } else {
        res.status(200).send(`No PlaceId corresponds with lat (${req.params.lat}) - long (${req.params.long})`)
      }
    })
    .catch(err => res.status(401).send(JSON.stringify(err)));
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
