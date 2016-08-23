const passport = require('passport');
const setTokenCookie = require('../authService').setTokenCookie;
const signToken = require('../authService').signToken;
const router = require('express').Router();

// TODO: Change success / failure redirects
// Route to Facebook for authentication and login
router.get('/', passport.authenticate('facebook', {
  scope: ['email', 'public_profile'],
  failureRedirect: '/login',
  session: false,
}));

router.get('/token', passport.authenticate('facebook-token'),
  (req, res) => {
    if (req.user) {
      res.status(200).send(signToken(req.user.id));
    } else {
      res.sendStatus(401);
    }
  });

router.get('/callback', passport.authenticate('facebook', {
  failureRedirect: '/login',
  session: false,
}), setTokenCookie);

module.exports = router;
