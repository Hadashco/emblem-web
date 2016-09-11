const dbFile = require('../../db/db');
const { ArtPlace, db, Vote } = dbFile;
const Sequelize = require('sequelize');

module.exports = {
  // Get all ArtPlaces
  getAll: (req, res) => {
    ArtPlace.findAll().then(result => {
      res.status(200).json(result);
    });
  },

  // Get highest ArtPlace for each place
  getMaxAtPlace: (req, res) => {
    const qry = `SELECT DISTINCT ON ("ArtPlace"."PlaceId") "ArtPlace"."PlaceId", "User"."markerColor", 
                        "Art"."UserId", "ArtPlace"."ArtId", "ArtPlace"."_id" AS "ArtPlaceId",
                        ("ArtPlace".upvotes - "ArtPlace".downvotes) AS "netVotes", "Place".lat, "Place".long 
                 FROM "Place" INNER JOIN  ("ArtPlace"  INNER JOIN 
                        ("Art" INNER JOIN "User" ON "Art"."UserId" = "User".id) ON 
                        "ArtPlace"."ArtId" = "Art".id) ON "ArtPlace"."PlaceId" = "Place".id 
                 ORDER BY "ArtPlace"."PlaceId", ("ArtPlace".upvotes - "ArtPlace".downvotes) DESC`;
    db.query(qry, { type: Sequelize.QueryTypes.SELECT })
      .then(result => res.status(200).json(result))
      .catch(err => {
        console.log('artPlace/max/rank error:', err);
        res.status(500).send(JSON.stringify(err));
      });
  },

  // Get highest ArtPlace for each place between two bounds
  getMaxBetweenBounds: (req, res) => {
    const qry = `SELECT DISTINCT ON ("ArtPlace"."PlaceId") "ArtPlace"."PlaceId", 
                        "User"."markerColor", "Art"."UserId", "ArtPlace"."ArtId", "Place".lat,
                        ("ArtPlace".upvotes - "ArtPlace".downvotes) AS "netVotes", "Place".long,
                        "ArtPlace"."_id" AS "ArtPlaceId" 
                 FROM "Place" INNER JOIN  ("ArtPlace"  INNER JOIN 
                        ("Art" INNER JOIN "User" ON "Art"."UserId" = "User".id) ON 
                        "ArtPlace"."ArtId" = "Art".id) ON "ArtPlace"."PlaceId" = "Place".id 
                 WHERE "Place"."lat" BETWEEN ${req.params.latMin} AND ${req.params.latMax} 
                        AND "Place"."long" BETWEEN ${req.params.longMin} AND ${req.params.longMax}
                 ORDER BY "ArtPlace"."PlaceId", ("ArtPlace".upvotes - "ArtPlace".downvotes) DESC`;
    db.query(qry, { type: Sequelize.QueryTypes.SELECT })
      .then(result => res.status(200).json(result))
      .catch(err => {
        res.status(500).send(JSON.stringify(err));
      });
  },

  // Get all ArtPlaces between two bounds
  getAllBetweenBounds: (req, res) => {
    const qry = `SELECT "ArtPlace"."PlaceId", "User"."markerColor", "Art"."UserId", "ArtPlace"."ArtId", 
                        ("ArtPlace".upvotes - "ArtPlace".downvotes) AS "netVotes", 
                        "Place".lat, "Place".long, "ArtPlace"."_id" AS "ArtPlaceId" 
                 FROM "Place" INNER JOIN  ("ArtPlace"  INNER JOIN 
                        ("Art" INNER JOIN "User" ON "Art"."UserId" = "User".id) ON 
                        "ArtPlace"."ArtId" = "Art".id) ON "ArtPlace"."PlaceId" = "Place".id 
                 WHERE "Place"."lat" BETWEEN ${req.params.latMin} AND ${req.params.latMax} 
                        AND "Place"."long" BETWEEN ${req.params.longMin} AND ${req.params.longMax}
                 ORDER BY ("ArtPlace".upvotes - "ArtPlace".downvotes) DESC`;
    db.query(qry, { type: Sequelize.QueryTypes.SELECT })
      .then(result => res.status(200).json(result))
      .catch(err => {
        console.log('artPlace/max/rank error:', err);
        res.status(500).send(JSON.stringify(err));
      });
  },

  // Get specific ArtPlace
  getById: (req, res) => {
    ArtPlace.findById(req.params.id).then(result => {
      res.status(200).json(result);
    });
  },

  // Add comment to ArtPlace
  // Assumes that input includes: 1) artPlaceId 2) comment title
  addCommentForId: (req, res) => {
    ArtPlace.findById(req.params.id)
      .then(artPlace => {
        if (artPlace) {
          artPlace.createComment({
            title: req.body.title,
          })
          .then(comment => {
            comment.setUser(req.user); // add creator ID
            res.status(200).json(comment);
          })
          .catch(err => res.status(500).send(JSON.stringify(err)));
        } else {
          res.status(200).send(JSON.stringify(`No ArtPlace associated with id ${req.params.id}`));
        }
      });
  },

  // Get all comments for ArtPlace
  getAllCommentsForId: (req, res) => {
    ArtPlace.findById(req.params.id)
      .then(artPlace => {
        if (artPlace) {
          artPlace.getComments()
            .then(comments => {
              res.status(200).json(comments);
            })
            .catch(err => res.status(500).send(JSON.stringify(err)));
        } else {
          res.status(200).send(JSON.stringify(`No ArtPlace associated with id ${req.params.id}`));
        }
      });
  },

  // Add vote, increment ArtPlace upvote / downvote
  // Assumes that input includes: 1) artPlaceId in route 2) vote value (+1 or -1)
  addVoteForId: (req, res) => {
    let globalArtPlace;
    ArtPlace.findById(req.params.id)
      .then(artPlace => {
        if (artPlace) {
          globalArtPlace = artPlace;
          // Increase total count of upvotes / downvotes as appropriate
          if (req.body.vote > 0) globalArtPlace.increment('upvotes');
          if (req.body.vote < 0) globalArtPlace.increment('downvotes');
          // check to see if vote exists from this user at artPlace
          artPlace.getVotes({ where: { UserId: req.user.id } })
            .then(votes => {
              // if a vote already exists for user, update
              if (votes.length > 0) {
                Vote.findOne({ where: { id: votes[0].dataValues.id } })
                  .then(foundVote => {
                    // Nullify previous vote
                    if (foundVote.value > 0) globalArtPlace.decrement('upvotes');
                    if (foundVote.value < 0) globalArtPlace.decrement('downvotes');
                    foundVote.setDataValue('value', req.body.vote);
                    res.status(200).json(foundVote);
                  });
              } else {
              // if no vote exists for user on this piece, add one
                artPlace.createVote({
                  value: req.body.vote,
                })
                .then(vote => {
                  vote.setUser(req.user); // add creator ID
                  res.status(200).json(vote);
                })
                .catch(err => res.status(500).send(JSON.stringify(err)));
              }
            });
        } else {
          res.status(200).send(JSON.stringify(`No ArtPlace associated with id ${req.params.id}`));
        }
      });
  },

  // Get votes for a specific ArtPlace ID
  getVotesForId: (req, res) => {
    ArtPlace.findById(req.params.id)
      .then(artPlace => {
        if (artPlace) {
          artPlace.getVotes()
            .then(votes => {
              res.status(200).json(votes);
            })
            .catch(err => res.status(500).send(JSON.stringify(err)));
        } else {
          res.status(200).send(JSON.stringify(`No ArtPlace associated with id ${req.params.id}`));
        }
      });
  },

  deleteById: (req, res) => {
    ArtPlace.destroy({ where: { _id: req.params.id } })
      .then(() => res.status(200).send(`Successfully deleted ArtPlaceId ${req.params.id}`))
      .catch(err => res.status(500).send(JSON.stringify(err)));
  },
};
