const router = require('express').Router();
const { postNewArt, downloadById, getFromDbById, deleteById,
        getAllFromDb, postToPlaceById, addCommentById,
        getAllCommentsForId, voteById, getAllVotesForId,
      } = require('./artController');

/* **************** BEGIN AWS PORTION *************************/
// Art can be accessed at the following link:
//  'https://s3.amazonaws.com/hadashco-emblem/' + art.id

// POST and store new art
router.post('/', postNewArt);

// GET art by id from AWS as octet stream
// RETURNS: Octet stream
router.get('/:id/download', downloadById);

// POST (DELETE) art and corresponding artPlace
router.post('/:id/delete', deleteById);

/* **************** END AWS PORTION ****************************/

// GET specific art
// RETURNS: id | type | upvotes | downvotes | createdAt | updatedAt | UserId
router.get('/:id', getFromDbById);

// GET all art
// RETURNS: id | type | upvotes | downvotes | createdAt | updatedAt | UserId
router.get('/', getAllFromDb);

// POST art to a specific place
router.post('/:id/place', postToPlaceById);

/* ************* ART VOTE / COMMENT NOT IN USE *****************/

// POST comment to art
router.post('/:id/comment', addCommentById);

// GET all comments for art
router.get('/:id/comment', getAllCommentsForId);

// POST vote to vote model, increment art upvote / downvote
  // vote value (+1 or -1)
router.post('/:id/vote', voteById);

// GET votes for a specific Art ID
router.get('/:id/vote', getAllVotesForId);

module.exports = router;
