const router = require('express').Router();
const sockets = require('../../sockets');
const db = require('../../db/db');
const { Place, ArtPlace } = db;

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
  Place.findById(req.params.id)
    .then(place => {
      if (place) {
        res.status(200).json(place);
      } else {
        res.status(200).json('Place not found');
      }
    })
    .catch(err => res.status(401).send(JSON.stringify(err)));
});


/* ***************************************************************

                      TEST FROM MOBILE APP

*****************************************************************/

// Get all art at a specific place
// Assumes that input includes:
  // placeId in route
router.get('/:id/art', (req, res) => {
  Place.findById(req.params.id)
    .then(foundPlace => {
      if (foundPlace) {
        ArtPlace.findAll({ where: { PlaceId: req.params.id } })
          .then(arts => {
            if (arts) {
              res.json(arts);
            } else {
              res.status(200).send(JSON.stringify(`No art found with placeId ${req.params.id}`));
            }
          });
      } else {
        res.status(200).send(JSON.stringify('Place not found'));
      }
    })
    .catch(err => res.status(401).send(JSON.stringify(err)));
});

module.exports = router;
