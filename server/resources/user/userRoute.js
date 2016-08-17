const router = require('express').Router();
const Art = require('../../db/db').Art;

// Get all art associated with a given user
router.get('/:id/art', (req, res) => {
  Art.findAll({ where: { UserId: req.user.dataValues.id } })
    .then(arts => {
      res.status(200).send(JSON.stringify(arts));
    });
});

// Update color for user (WIP)
router.post('/:id/color', (req, res) => {
  // Art.findAll({ where: { UserId: req.user.dataValues.id } })
  //   .then(arts => {
  //     res.status(200).send(JSON.stringify(arts));
  //   });
});

module.exports = router;
