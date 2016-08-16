const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');
const router = require('express').Router();
const db = require('../../db/db');
const { Art, Place } = db;
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

/* ***************************************************************

                      TEST FROM MOBILE APP

*****************************************************************/

// Post art to a specific place
// Assumes that input includes:
    // artId in route
    // latitude, longitude
router.post('/:id/place', (req, res) => {
  let globalArt;
  Art.findById(req.params.id)
    .then(art => {
      globalArt = art;
      Place.findAll({ where: { lat: req.body.lat, long: req.body.long } })
        .then(place => {
          if (place) {
            globalArt.addPlace(place)
              .then(res.json(globalArt));
          } else {
            Place.create({
              long: req.body.long,
              lat: req.body.lat,
              sector: req.body.lat.toFixed(5) + req.body.long.toFixed(5),
            })
            .then(newPlace => {
              globalArt.addPlace(newPlace);
            })
            .then(res.json(globalArt));
          }
        })
        .catch(err => res.status(401).send(JSON.stringify(err)));
    });
});

// Add comment to art
// Assumes that input includes:
    // artId in route
    // comment title
router.post('/:id/comment', (req, res) => {
  let globalArt;
  Art.findById(req.params.id)
    .then(art => {
      if (art) {
        globalArt = art;
        art.createComment({
          title: req.body.title,
        })
        .then(() => res.json(globalArt))
        .catch(err => res.status(401).send(JSON.stringify(err)));
      } else {
        res.status(200).send(JSON.stringify(`No artwork associated with id ${req.params.id}`));
      }
    });
});

// Get all comments for art
router.get('/:id/comment', (req, res) => {
  Art.findById(req.params.id)
    .then(art => {
      if (art) {
        art.getComments()
          .then(comments => {
            res.status(200).json(comments);
          })
          .catch(err => res.status(401).send(JSON.stringify(err)));
      } else {
        res.status(200).send(JSON.stringify(`No artwork associated with id ${req.params.id}`));
      }
    });
});

// Add vote to vote model, increment art upvote / downvote
// Assumes that input includes:
    // artId in route
    // vote value (+1 or -1)
    // add to art upvote / downvote
router.post('/:id/vote', (req, res) => {
  Art.findById('/:id/vote', (req, res) => {
    // .then(art => {
    //   art.createVote({
    //     value: req.body.vote,
    //   })
    //   .then(()
    // })
  });
});

module.exports = router;
