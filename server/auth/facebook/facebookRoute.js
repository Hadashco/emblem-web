const passport = require('passport');
const setTokenCookie = require('../authService').setTokenCookie;

const router = require('express').Router();

router.get('/', passport.authenticate('facebook', {
  scope: ['email', 'public profile'],
  failureRedirect: '/login',
  session: false,
}));

router.get('/callback', passport.authenticate('facebook', {
  failureRedirect: '/login',
  session: false,
}), setTokenCookie);

module.exports = router;
