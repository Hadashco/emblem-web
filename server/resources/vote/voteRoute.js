const router = require('express').Router();
const Vote = require('../../db/db').Vote;

router.get('/', (req, res) => {
  Vote.findAll().then(result => {
    res.send(result);
  });
});
