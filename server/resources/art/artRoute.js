const fs = require('fs-extra');
const path = require('path');
// const mkdirp = require('mkdirp');
const router = require('express').Router();
const db = require('../../db/db');
const { Art, Place, ArtPlace, TRAILING_DEC_SECTOR } = db;
const storagePath = path.join(__dirname.concat('/../../storage/art'));

// Post and store new art
router.post('/', (req, res) => {
  let fileType = req.headers['file-type'];
  Art.create({ type: fileType })
    .then(art => {
      art.setUser(req.user); // add creator ID
      let dir = `${storagePath}/${art.id}`;
      fs.mkdirs(dir, (err) => {
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

// Delete art and correspondig artPlace
router.post('/:id/delete', (req, res) => {
  Art.findById(req.params.id)
    .then(art => {
      let dir = `${storagePath}/${art.id}`;
      fs.remove(dir, err => {
        art.destroy()
          .then(() => {
            ArtPlace.destroy({ where: { ArtId: req.params.id } })
              .then(() => res.status(200).send(`ArtId ${req.params.id} and associated ArtPlaces deleted.`))
              .catch(err => res.status(401).send(JSON.stringify(err)));
          });
      });
    })
    .catch(err => res.status(401).send(JSON.stringify(err)));
});

// Get specific art
router.get('/:id', (req, res) => {
  Art.findById(req.params.id)
    .then(art => {
      res.status(200).json(art);
    })
    .catch(err => res.status(401).send(JSON.stringify(err)));
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

// Post art to a specific place
router.post('/:id/place', (req, res) => {
  let globalArt;
  Art.findById(req.params.id)
    .then(art => {
      globalArt = art;
      const sector = req.body.lat.toFixed(TRAILING_DEC_SECTOR) + req.body.long.toFixed(TRAILING_DEC_SECTOR);
      Place.findAll({ where: { sector } })
        .then(place => {
          if (place.length > 0) {
            globalArt.addPlace(place)
              .then(res.json(globalArt));
          } else {
            Place.create({
              long: req.body.long,
              lat: req.body.lat,
              sector,
            })
            .then(newPlace => {
              globalArt.addPlace(newPlace)
                .then(art => { res.json(art) });
            });
          }
        })
        .catch(err => res.status(401).send(JSON.stringify(err)));
    });
});

// Add comment to art
router.post('/:id/comment', (req, res) => {
  Art.findById(req.params.id)
    .then(art => {
      if (art) {
        art.createComment({
          title: req.body.title,
        })
        .then(comment => {
          comment.setUser(req.user); // add creator ID
          res.json(comment);
        })
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
  // vote value (+1 or -1)
router.post('/:id/vote', (req, res) => {
  let globalArt;
  Art.findById(req.params.id)
    .then(art => {
      if (art) {
        globalArt = art;
        art.createVote({
          value: req.body.vote,
        })
        .then(vote => {
          vote.setUser(req.user); // add creator ID
          if (req.body.vote > 0) globalArt.increment('upvotes');
          if (req.body.vote < 0) globalArt.increment('downvotes');
          res.status(200).json(vote);
        })
        .catch(err => res.status(401).send(JSON.stringify(err)));
      } else {
        res.status(200).send(JSON.stringify(`No artwork associated with id ${req.params.id}`));
      }
    });
});

// Get votes for a specific Art ID
router.get('/:id/vote', (req, res) => {
  Art.findById(req.params.id)
    .then(art => {
      if (art) {
        art.getVotes()
          .then(votes => {
            res.status(200).json(votes);
          })
          .catch(err => res.status(401).send(JSON.stringify(err)));
      } else {
        res.status(200).send(JSON.stringify(`No artwork associated with id ${req.params.id}`));
      }
    });
});

module.exports = router;
