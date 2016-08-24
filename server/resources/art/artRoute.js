const router = require('express').Router();
const { postNewArt, downloadById, getFromDbById, deleteById,
        getAllFromDb, postToPlaceById, addCommentById,
        getAllCommentsForId, voteById, getAllVotesForId,
      } = require('./artController');

/* **************** BEGIN AWS PORTION *************************/
// Art can be accessed at the following link:
//  'https://s3.amazonaws.com/hadashco-emblem/' + art.id

// Post and store new art
router.post('/', postNewArt);

router.get('/:id/download', downloadById);

// Delete art and corresponding artPlace
router.post('/:id/delete', deleteById);

/* **************** END AWS PORTION ****************************/

// Get specific art
router.get('/:id', getFromDbById);

// Get all art
router.get('/', getAllFromDb);

// Post art to a specific place
router.post('/:id/place', postToPlaceById);

// Add comment to art
router.post('/:id/comment', addCommentById);

// Get all comments for art
router.get('/:id/comment', getAllCommentsForId);

// Add vote to vote model, increment art upvote / downvote
  // vote value (+1 or -1)
router.post('/:id/vote', voteById);

// Get votes for a specific Art ID
router.get('/:id/vote', getAllVotesForId);

module.exports = router;
