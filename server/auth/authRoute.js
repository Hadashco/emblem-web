const express = require('express');
const facebookSetup = require('./facebook/passport');
const facebookRouter = require('./facebook/facebookRoute');
const User = require('../db/db').User;

const config = {
  SESSION_SECRET: process.env.SESSION_SECRET,
  FACEBOOK_ID: process.env.FACEBOOK_ID,
  FACEBOOK_SECRET: process.env.FACEBOOK_SECRET,
};

facebookSetup(User, config);

const router = express.Router();
router.use('/facebook', facebookRouter);

module.exports = router;
