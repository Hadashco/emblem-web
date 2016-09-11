const router = require('express').Router();
const { getAll, getMaxAtPlace, getMaxBetweenBounds,
        getAllBetweenBounds, getById, addCommentForId,
        getAllCommentsForId, addVoteForId, getVotesForId,
        deleteById } = require('./artPlaceController');

// -- GET all ArtPlaces --
// RETURNS: _id | active | upvotes | downvotes | createdAt | updatedAt| PlaceId | ArtId
router.get('/', getAll);

// -- GET highest ArtPlace for each place --
// RETURNS: PlaceId | markerColor | UserId | ArtId | ArtPlaceId | netVotes | lat | long
router.get('/max/rank', getMaxAtPlace);

// -- GET highest ArtPlace for each place between two bounds --
// RETURNS: PlaceId | markerColor | UserId | ArtId | lat | netVotes | long | ArtPlaceId
router.get('/max/between/:latMin/:latMax/:longMin/:longMax', getMaxBetweenBounds);

// -- GET all ArtPlaces between two bounds --
// RETURNS: PlaceId | markerColor | UserId | ArtId | lat | netVotes | long | ArtPlaceId
router.get('/between/:latMin/:latMax/:longMin/:longMax', getAllBetweenBounds);

// -- GET specific ArtPlace --
// RETURNS: _id | active | upvotes | downvotes | createdAt | updatedAt| PlaceId | ArtId
router.get('/:id', getById);

// -- POST comment to ArtPlace --
router.post('/:id/comment', addCommentForId);

// -- GET all comments for ArtPlace --
// RETURNS: id | title | commentable | commentable_id | createdAt | updatedAt | UserId
router.get('/:id/comment', getAllCommentsForId);

// -- POST vote, increment ArtPlace upvote / downvote --
router.post('/:id/vote', addVoteForId);

// -- GET votes for a specific ArtPlace ID --
// RETURNS: id | value | voteable | voteable_id | createdAt | updatedAt | UserId
router.get('/:id/vote', getVotesForId);

// -- DELETE (POST) a specific ArtPlace ID --
router.post('/:id/delete', deleteById);

module.exports = router;
