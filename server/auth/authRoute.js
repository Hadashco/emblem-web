const express = require('express');
const config = require('../.config');
const facebookSetup = require('./facebook/passport');
const facebookRouter = require('./facebook/facebookRoute');
const User = require('../db/db').User;

facebookSetup(User, config);

const router = express.Router();
router.use('/facebook', facebookRouter);

module.exports = router;
