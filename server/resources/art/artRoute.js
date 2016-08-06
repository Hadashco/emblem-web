const router = require('express').Router();
const sockets = require('../../sockets');
const Art = require('../../db/db').Art;

router.post('/', (req, res) => {
  console.log(req.body);
  res.end('posted');
  // Art.create({type: ''})
  //   .then(place => {
  //     sockets.broadcast('place/createPlace', place);
  //     res.send(JSON.stringify(place));
  //   });
});

router.get('/:id', (req, res) => {
  console.log(req.params.id);
  res.send('this is an art with an id');
});

module.exports = router;
