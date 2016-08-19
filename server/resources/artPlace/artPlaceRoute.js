const router = require('express').Router();
const dbFile = require('../../db/db');
const { ArtPlace, db } = dbFile;
const Sequelize = require('sequelize');

// Get all ArtPlaces
router.get('/', (req, res) => {
  ArtPlace.findAll().then(result => {
    res.status(200).json(result);
  });
});

// Get highest ArtPlace for each place
router.get('/max/rank', (req, res) => {
  const qry = `SELECT DISTINCT ON ("ArtPlace"."PlaceId") "ArtPlace"."PlaceId", "Art"."UserId", "ArtPlace"."ArtId", ("ArtPlace".upvotes - "ArtPlace".downvotes) AS "netVotes", "Place".lat, "Place".long
               FROM "Place" INNER JOIN ("ArtPlace"  INNER JOIN "Art" ON "ArtPlace"."ArtId" = "Art".id) ON "ArtPlace"."PlaceId" = "Place".id
               ORDER BY "ArtPlace"."PlaceId", ("ArtPlace".upvotes - "ArtPlace".downvotes) DESC`;
  db.query(qry, { type: Sequelize.QueryTypes.SELECT })
    .then(result => res.status(200).json(result))
    .catch(err => {
      console.log('artPlace/max/rank error:', err);
      res.status(401).send(JSON.stringify(err));
    });
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

// Add vote, increment ArtPlace upvote / downvote
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

router.post('/:id/delete', (req, res) => {
  ArtPlace.destroy({ where: { _id: req.params.id } })
    .then(() => res.status(200).send(`Successfully deleted ArtPlaceId ${req.params.id}`))
    .catch(err => res.status(401).send(JSON.stringify(err)));
});

module.exports = router;
