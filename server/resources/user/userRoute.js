const router = require('express').Router();
const Art = require('../../db/db').Art;

// Update color for user
router.post('/color', (req, res) => {
  req.user.updateAttributes({ markerColor: req.body.color })
    .then(() => res.status(200).send(`Color updated to ${req.body.color}`))
    .catch(err => res.status(401).json(err));  
});

// Get all art associated with a given user
router.get('/art', (req, res) => {
  Art.findAll({ where: { UserId: req.user.dataValues.id } })
    .then(arts => {
      res.status(200).send(JSON.stringify(arts));
    });
});

module.exports = router;
