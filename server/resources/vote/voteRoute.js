const router = require('express').Router();
const { getAll } = require('./voteController');

router.get('/', getAll);

module.exports = router;
