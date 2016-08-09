const passport = require('passport');
const setTokenCookie = require('../authService').setTokenCookie;

const router = require('express').Router();

// TODO: Change success / failure redirects
// Route to Facebook for authentication and login
router.get('/', passport.authenticate('facebook', {
  scope: ['email', 'public profile'],
  failureRedirect: '/login',
  successRedirect: 'http://localhost:3000/place',
  session: false,
}));

// Handle callback after Facebook user authentication
router.get('/callback', passport.authenticate('facebook', {
  failureRedirect: '/login',
  session: false,
}), setTokenCookie);

module.exports = router;
