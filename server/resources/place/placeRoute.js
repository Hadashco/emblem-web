const router = require('express').Router();
const { postNewPlace, getAll, findByLatLong,
        getMaxArtPlaceAtPlaceId,
        getAllArtPlaceAtLatLong,
        getById, getArtAtId } = require('./placeController');

// Add a new places
router.post('/', postNewPlace);

// Get all places
router.get('/', getAll);

// Get highest single ranked ArtPlace at a place
router.get('/find/maxArtPlace/:placeId', getMaxArtPlaceAtPlaceId);

<<<<<<< HEAD
// Find a place
router.get('/find/:lat/:long', findByLatLong);
=======
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
          .catch(err => res.status(500).send(JSON.stringify(err)));
      } else {
        res.status(200).send(`No PlaceId corresponds with lat (${req.params.lat}) - long (${req.params.long})`)
      }
    })
    .catch(err => res.status(500).send(JSON.stringify(err)));
});
>>>>>>> dropzone looks good, started login page beautification

// Find all art at a lat / long (place ID unknown)
router.get('/find/artPlace/:lat/:long', getAllArtPlaceAtLatLong);

// Get a specific place
<<<<<<< HEAD
router.get('/:id', getById);

// Get all art at a specific place
// Assumes that input includes: 1) placeId in route
router.get('/:id/art', getArtAtId);
=======
router.get('/:id', (req, res) => {
  Place.findById(req.params.id)
    .then(place => {
      if (place) {
        res.status(200).json(place);
      } else {
        res.status(200).send('Place not found');
      }
    })
    .catch(err => res.status(500).send(JSON.stringify(err)));
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
        .catch(err => res.status(500).send(JSON.stringify(err)));
    });
});
>>>>>>> dropzone looks good, started login page beautification

module.exports = router;
