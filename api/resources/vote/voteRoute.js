const router = require('express').Router();
const { getAll } = require('./voteController');

// -- Get all votes --
// RETURN: id | value | voteable | voteable_id | createdAt | updatedAt | UserId
router.get('/', getAll);

module.exports = router;
