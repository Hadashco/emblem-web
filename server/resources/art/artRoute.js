const fs = require('fs-extra');
const path = require('path');
// const mkdirp = require('mkdirp');
const router = require('express').Router();
const db = require('../../db/db');
const { Art, Place, ArtPlace, TRAILING_DEC_SECTOR } = db;
const storagePath = path.join(__dirname.concat('/../../storage/art'));

var AWS = require('aws-sdk'); 

// Set up region for requests
AWS.config.update({
  region: 'us-east-1',
  accessKeyId: process.env.AWS_ID,
  secretAccessKey: process.env.AWS_SECRET
});

// Create reference to existing bucket
const s3bucket = new AWS.S3({params: { Bucket: 'hadashco-emblem' } });


/* ***************************************************************

                      BEGIN AWS PORTION

*****************************************************************/
// Art can be accessed at the following link:
//  'https://s3.amazonaws.com/hadashco-emblem/' + art.id

// Post and store new art
router.post('/', (req, res) => {
  let fileType = req.headers['file-type'];
  Art.create({ type: fileType })
    .then(art => {
      art.setUser(req.user); // add creator ID
      const params = {
        ACL: 'public-read', 
        Key: art.id.toString(), 
        Body: req.body,
        ContentEncoding: 'base64', // binary
        ContentType: fileType,
      };
      
      s3bucket.upload(params, err, data => {
        if (err) {
          console.log('Error uploading data:', err);
          res.status(301).json(err);
        } else {
          console.log("Successfully uploaded data to myBucket/myKey");
          res.status(400).json('https://s3.amazonaws.com/hadashco-emblem/' + art.id);
        }
      });
    })
    .catch(err => res.status(401).send(JSON.stringify(err)));
});

router.get('/:id/download', (req, res) => {
  Art.findById(req.params.id)
    .then(art => {
      const params = { Key: art.id.toString() };

      s3bucket.getObject(params, function(err, data) {
        if (!err) {
          // Reference additional Body properties: http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#getObject-property
          res.send(data.Body);
        } else {
          res.status(500).send(err);
        }
      });
    })
    .catch(err => res.status(401).send(JSON.stringify(err)));
})

// Delete art and correspondig artPlace
router.post('/:id/delete', (req, res) => {
  Art.destroy({ where: { id: req.params.id } })
      .then(() => {
        const params = { Key: req.params.id.toString() };

        s3bucket.deleteObject(params, function(err, data) {
          if (!err) {
            res.send(data.Body);
          } else {
            res.status(500).send(err);
          }
        });
        res.status(200).send(`ArtId ${req.params.id} and associated ArtPlaces deleted.`);  
      })
      .catch(err => res.status(401).send(JSON.stringify(err)));
});

/* ***************************************************************

                      END AWS PORTION

*****************************************************************/

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
      res.status(200).send(JSON.stringify(arts));
    })
    .catch(err => {
      console.log('Get art error ', err);
      res.status(400).send(JSON.stringify(err));
    });
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
