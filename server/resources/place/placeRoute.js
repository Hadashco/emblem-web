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

// Find a place
router.get('/find/:lat/:long', findByLatLong);

// Find all art at a lat / long (place ID unknown)
router.get('/find/artPlace/:lat/:long', getAllArtPlaceAtLatLong);

// Get a specific place
router.get('/:id', getById);

// Get all art at a specific place
// Assumes that input includes: 1) placeId in route
router.get('/:id/art', getArtAtId);

module.exports = router;
