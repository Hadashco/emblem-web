const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');
const router = require('express').Router();
const sockets = require('../../sockets');
const Art = require('../../db/db').Art;
const Place = require('../../db/db').Place;
const storagePath = path.join(__dirname.concat('/../../storage/art'));

// Post and store new art
router.post('/', (req, res) => {
  let fileType = req.headers['file-type'];
  Art.create({ type: fileType })
    .then(art => {
      art.setUser(req.user); // add creator ID
      let dir = `${storagePath}/${art.id}`;
      mkdirp(dir, (err) => {
        if (err) console.error(err);
        let wstream = fs.createWriteStream(`${dir}/${art.id}_FULL`);
        wstream.write(req.body);
        wstream.on('finish', () => {
          res.end(JSON.stringify({ id: art.id }));
        });
        wstream.on('error', (error) => {
          console.log(error, 'error!');
        });
        wstream.end();
      });
    })
    .catch(err => res.status(401).send(JSON.stringify(err)));
});

// Get specific art
router.get('/:id', (req, res) => {
  console.log(req.params.id);
  res.send('this is an art with an id');
});

// Get all art
router.get('/', (req, res) => {
  Art.findAll()
    .then(arts => {
      console.log(JSON.stringify(arts), 'this is what is being sent back');
      res.status(200).send(JSON.stringify(arts));
    })
    .catch(err => res.status(401).send(JSON.stringify(err)));
});

/****************************************************************

                      TEST FROM MOBILE APP

*****************************************************************/


// Get all art at a specific place
// Assumes that input includes:
    // latitude, longitude
router.get('/place', (req, res) => {
  Place.findAll({ where: { lat: req.body.lat, long: req.body.long } })
    .then(foundPlace => {
      if (foundPlace) {
        Art.findAll({ where: { placeId: foundPlace.id } })
          .then(arts => {
            res.json(arts);
          });
      } else {
        res.status(200).send(JSON.stringify('No art found at this location'));
      }
    })
    .catch(err => res.status(401).send(JSON.stringify(err)));
});


// Post art to a specific place
// Assumes that input includes:
    // artId
    // latitude, longitude
router.post('/place', (req, res) => {
  Place.findAll({ where: { lat: req.body.lat, long: req.body.long } })
    .then(foundPlace => {
      Art.findAll({ where: { id: req.body.artId } })
        .then(art => {
          if (foundPlace) {
            art.addPlace(foundPlace);
          } else {
            Place.create({
              long: req.body.long,
              lat: req.body.lat,
              sector: req.body.lat.toFixed(5) + req.body.long.toFixed(5),
            })
            .then(newPlace => {
              art.addPlace(newPlace);
            });
          }
        })
        .then(() => res.json(req.art))
        .catch(err => res.status(401).send(JSON.stringify(err)));
    });
});

module.exports = router;
