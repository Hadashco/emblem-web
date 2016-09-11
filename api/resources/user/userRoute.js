const router = require('express').Router();
const { changeColor, getUserArt } = require('./userController');

// -- Update color for user --
router.post('/color', changeColor);

// -- Get all art associated with a given user --
// RETURN: id | type | upvotes | downvotes | createdAt | updatedAt | UserId
router.get('/art', getUserArt);

module.exports = router;
