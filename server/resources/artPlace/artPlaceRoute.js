const router = require('express').Router();
const { getAll, getMaxAtPlace, getMaxBetweenBounds,
        getAllBetweenBounds, getById, addCommentForId,
        getAllCommentsForId, addVoteForId, getVotesForId,
        deleteById } = require('./artPlaceController');

// Get all ArtPlaces
router.get('/', getAll);

// Get highest ArtPlace for each place
router.get('/max/rank', getMaxAtPlace);

// Get highest ArtPlace for each place between two bounds
router.get('/max/between/:latMin/:latMax/:longMin/:longMax', getMaxBetweenBounds);

// Get all ArtPlaces between two bounds
router.get('/between/:latMin/:latMax/:longMin/:longMax', getAllBetweenBounds);

// Get specific ArtPlace
router.get('/:id', getById);

// Add comment to ArtPlace
// Assumes that input includes: 1) artPlaceId 2) comment title
router.post('/:id/comment', addCommentForId);

// Get all comments for ArtPlace
router.get('/:id/comment', getAllCommentsForId);

// Add vote, increment ArtPlace upvote / downvote
// Assumes that input includes: 1) artPlaceId in route 2) vote value (+1 or -1)
router.post('/:id/vote', addVoteForId);

// Get votes for a specific ArtPlace ID
router.get('/:id/vote', getVotesForId);

router.post('/:id/delete', deleteById);

module.exports = router;
