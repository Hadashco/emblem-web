const router = require('express').Router();
const sockets = require('../../sockets');
const Place = require('../../db/db').Place;
const Art = require('../../db/db').Art;

router.get('/', (req, res) => {
  Place.findAll().then(result => {
    res.send(result);
  });
});

router.post('/', (req, res) => {
  Place.create({ long: req.body.long, lat: req.body.lat })
    .then(place => {
      sockets.broadcast('place/createPlace', place);
      res.send(JSON.stringify(place));
    });
});

router.post('/:id', (req, res) => {
  Art.findById(req.params.id)
    .then(art => {
      return Place.find({id: req.params.id})
        .then(place => {
          return place.addArt(art);
        })
        .then(() => {
          res.send('updated');
        });
    });
});

router.get('/:id', (req, res) => {
  console.log(req.params.id);
  res.send('this is a place with an id');
});

module.exports = router;
