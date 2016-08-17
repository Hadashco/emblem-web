const router = require('express').Router();
const db = require('../../db/db');
const { ArtPlace } = db;
const Sequelize = require('sequelize');

// Get all ArtPlaces
router.get('/', (req, res) => {
  ArtPlace.findAll().then(result => {
    res.status(200).json(result);
  });
});

// WIP
// Get highest ArtPlace for each place
// Must fall before
router.get('/maxrank', (req, res) => {
  // `SELECT ArtPlace._id, ArtPlace.upvotes, ArtPlace.downvotes, 
  //                         ArtPlace.createdAt, ArtPlace.PlaceId, ArtPlace.ArtId, 
  //                         Art.UserId, (ArtPlace.upvotes - ArtPlace.downvotes) AS netVotes
  //                  FROM ArtPlace INNER JOIN Art ON ArtPlace.ArtId = Art.id`

  // Sequelize.query("SELECT upvotes FROM ArtPlace", { type: Sequelize.QueryTypes.RAW })
  //   .then(result => res.status(200).json(result))
  //   .catch(err => res.status(401).send(JSON.stringify(err)));

  res.send('hi');
});

// Get specific ArtPlace
router.get('/:id', (req, res) => {
  ArtPlace.findById(req.params.id).then(result => {
    res.status(200).json(result);
  });
});

// Add comment to ArtPlace
// Assumes that input includes: 1) artPlaceId 2) comment title
router.post('/:id/comment', (req, res) => {
  ArtPlace.findById(req.params.id)
    .then(artPlace => {
      if (artPlace) {
        artPlace.createComment({
          title: req.body.title,
        })
        .then(comment => {
          comment.setUser(req.user); // add creator ID
          res.json(comment);
        })
        .catch(err => res.status(401).send(JSON.stringify(err)));
      } else {
        res.status(200).send(JSON.stringify(`No ArtPlace associated with id ${req.params.id}`));
      }
    });
});

// Get all comments for ArtPlace
router.get('/:id/comment', (req, res) => {
  ArtPlace.findById(req.params.id)
    .then(artPlace => {
      if (artPlace) {
        artPlace.getComments()
          .then(comments => {
            res.status(200).json(comments);
          })
          .catch(err => res.status(401).send(JSON.stringify(err)));
      } else {
        res.status(200).send(JSON.stringify(`No ArtPlace associated with id ${req.params.id}`));
      }
    });
});

// Add vote, increment ArtPlaec upvote / downvote
// Assumes that input includes: 1) artPlaceId in route 2) vote value (+1 or -1)
router.post('/:id/vote', (req, res) => {
  let globalArtPlace;
  ArtPlace.findById(req.params.id)
    .then(artPlace => {
      if (artPlace) {
        globalArtPlace = artPlace;
        artPlace.createVote({
          value: req.body.vote,
        })
        .then(vote => {
          vote.setUser(req.user); // add creator ID
          if (req.body.vote > 0) globalArtPlace.increment('upvotes');
          if (req.body.vote < 0) globalArtPlace.increment('downvotes');
          res.status(200).json(vote);
        })
        .catch(err => res.status(401).send(JSON.stringify(err)));
      } else {
        res.status(200).send(JSON.stringify(`No ArtPlace associated with id ${req.params.id}`));
      }
    });
});

// Get votes for a specific ArtPlace ID
router.get('/:id/vote', (req, res) => {
  ArtPlace.findById(req.params.id)
    .then(artPlace => {
      if (artPlace) {
        artPlace.getVotes()
          .then(votes => {
            res.status(200).json(votes);
          })
          .catch(err => res.status(401).send(JSON.stringify(err)));
      } else {
        res.status(200).send(JSON.stringify(`No ArtPlace associated with id ${req.params.id}`));
      }
    });
});


module.exports = router;
