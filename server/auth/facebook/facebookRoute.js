const passport = require('passport');
const setTokenCookie = require('../authService').setTokenCookie;

const router = require('express').Router();

// TODO: Change success / failure redirects
// Route to Facebook for authentication and login
router.get('/', passport.authenticate('facebook', {
  scope: ['email', 'public_profile'],
  failureRedirect: '/login', // TODO: Change to Login or similar
  session: false,
}));

router.get('/callback', passport.authenticate('facebook', {
  failureRedirect: '/login', // TODO: Change to Login or similar
  session: false,
}), setTokenCookie);

module.exports = router;
