 const router = require('express').Router();
const User = require('../db/db').User;

// Routes to be used during testing
router.get('/users', (req, res) => {
  User.findAll()
    .then(users => {
      res.status(200).send(JSON.stringify(users));
    });
});

module.exports = router;
