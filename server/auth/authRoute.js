const express = require('express');
const facebookSetup = require('./facebook/passport');
const facebookRouter = require('./facebook/facebookRoute');
const User = require('../db/db').User;
const isAuthenticated = require('./authService').isAuthenticated;

const config = {
  SESSION_SECRET: process.env.SESSION_SECRET,
  FACEBOOK_ID: process.env.FACEBOOK_ID,
  FACEBOOK_SECRET: process.env.FACEBOOK_SECRET,
};

facebookSetup(User, config);

const router = express.Router();

router.get('/isAuth', isAuthenticated(), (req, res) => {
  res.status(200).send();
});

router.use('/facebook', facebookRouter);

module.exports = router;
