const router = require('express').Router();
const { postNewPlace, getAll, findByLatLong,
        getMaxArtPlaceAtPlaceId,
        getAllArtPlaceAtLatLong,
        getById, getArtAtId } = require('./placeController');

// -- POST a new places --
router.post('/', postNewPlace);

// -- GET all places --
// RETURN: id | long | lat | sector | createdAt | updatedAt | UserId
router.get('/', getAll);

// -- GET highest single ranked ArtPlace at a place --
// RETURN: PlaceId | markerColor | UserId | ArtId | lat | netVotes | long | ArtPlaceId
router.get('/find/maxArtPlace/:placeId', getMaxArtPlaceAtPlaceId);

<<<<<<< HEAD
// -- GET (Find) a place --
// RETURN: id | long | lat | sector | updatedAt | createdAt
=======
// Find a place
>>>>>>> sector boxes working
router.get('/find/:lat/:long', findByLatLong);


// -- GET (Find) all art at a lat / long (place ID unknown) --
// RETURN: PlaceId | markerColor | UserId | ArtId | lat | netVotes | long | ArtPlaceId | upvote | downvote
router.get('/find/artPlace/:lat/:long', getAllArtPlaceAtLatLong);

<<<<<<< HEAD
// -- GET a specific place --
// RETURN: id | long | lat | sector | createdAt | updatedAt | UserId
=======
// Get a specific place
>>>>>>> sector boxes working
router.get('/:id', getById);

// -- GET all art at a specific place --
// RETURN: id | type | upvotes | downvotes | createdAt | updatedAt | UserId |
// ArtPlace {_id | active | upvotes | downvotes | createdAt | updatedAt | PlaceId | ArtId}
router.get('/:id/art', getArtAtId);

module.exports = router;
