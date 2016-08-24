const sockets = require('../../sockets');
const dbFile = require('../../db/db');
const { Place, db, TRAILING_DEC_SECTOR } = dbFile;
const Sequelize = require('sequelize');


module.exports = {
  // Add a new places
  postNewPlace: (req, res) => {
    const sector = req.body.lat.toFixed(TRAILING_DEC_SECTOR) +
                   req.body.long.toFixed(TRAILING_DEC_SECTOR);
    Place.findOne({ where: { sector } })
      .then(place => {
        if (place) {
          res.status(200).json(place); // Prevent duplicate entry of same place
        } else {
          Place.create({ long: req.body.long, lat: req.body.lat, sector })
            .then(newPlace => {
              newPlace.setUser(req.user); // add creator ID
              sockets.broadcast('place/createPlace', newPlace);
              res.send(JSON.stringify(newPlace));
            });
        }
      })
      .catch(err => {
        console.log(`POST to place/ ERROR: ${err}`);
        res.status(500).send(JSON.stringify(err));
      });
  },

  // Get all places
  getAll: (req, res) => {
    Place.findAll().then(result => {
      res.send(result);
    })
    .catch(err => res.status(500).json(err));
  },

  // Find a place
  findByLatLong: (req, res) => {
    const sector = Number(req.params.lat).toFixed(TRAILING_DEC_SECTOR) +
                   Number(req.params.long).toFixed(TRAILING_DEC_SECTOR);
    Place.findOne({ where: { sector } })
      .then(place => {
        if (place) {
          return res.status(200).json(place);
        }
        return Place.create({ long: req.params.long, lat: req.params.lat, sector });
      })
      .then(place => {
        place.setUser(req.user);
        sockets.broadcast('place/createPlace', place);
        res.status(201).json(place);
      })
      .catch(err => {
        console.log(`GET from place/find/:lat/:long ERROR: ${err}`);
        res.status(500).send(JSON.stringify(err));
      });
  },


  // Get highest single ranked ArtPlace at a lat/long
  getMaxArtPlaceAtPlaceId: (req, res) => {
    const qry = `SELECT DISTINCT ON ("ArtPlace"."PlaceId") "ArtPlace"."PlaceId", 
                        "User"."markerColor", "Art"."UserId", "ArtPlace"."ArtId", "Place".lat,
                        ("ArtPlace".upvotes - "ArtPlace".downvotes) AS "netVotes", "Place".long,
                        "ArtPlace"."_id" AS "ArtPlaceId" 
                 FROM "Place" INNER JOIN  ("ArtPlace"  INNER JOIN 
                        ("Art" INNER JOIN "User" ON "Art"."UserId" = "User".id) ON 
                        "ArtPlace"."ArtId" = "Art".id) ON "ArtPlace"."PlaceId" = "Place".id 
                 WHERE "Place".id='${req.params.placeId}'
                 ORDER BY "ArtPlace"."PlaceId", ("ArtPlace".upvotes - "ArtPlace".downvotes) DESC`;
    db.query(qry, { type: Sequelize.QueryTypes.SELECT })
      .then(result => res.status(200).json(result))
      .catch(err => {
        console.log('GET from place/find/maxArtPlace/:placeId ERROR:', err);
        res.status(500).send(JSON.stringify(err));
      });
  },


  // Find all art at a lat / long (place ID unknown)
  getAllArtPlaceAtLatLong: (req, res) => {
    const sector = Number(req.params.lat).toFixed(TRAILING_DEC_SECTOR) +
                   Number(req.params.long).toFixed(TRAILING_DEC_SECTOR);

    const qry = `SELECT "ArtPlace"."PlaceId", "User"."markerColor", "Art"."UserId", 
                        "ArtPlace"."ArtId", ("ArtPlace".upvotes - "ArtPlace".downvotes)
                        AS "netVotes", "Place".lat, "Place".long, "ArtPlace"."_id" AS "ArtPlaceId"  
                 FROM "Place" INNER JOIN  ("ArtPlace"  INNER JOIN 
                        ("Art" INNER JOIN "User" ON "Art"."UserId" = "User".id) ON 
                        "ArtPlace"."ArtId" = "Art".id) ON "ArtPlace"."PlaceId" = "Place".id 
                 WHERE "Place"."sector"='${sector}'
                 ORDER BY "ArtPlace"."PlaceId", ("ArtPlace".upvotes - "ArtPlace".downvotes) DESC`;
    db.query(qry, { type: Sequelize.QueryTypes.SELECT })
      .then(result => res.status(200).json(result))
      .catch(err => {
        console.log('GET from place/find/artPlace/:lat/:long ERROR:', err);
        res.status(500).send(JSON.stringify(err));
      });
  },

  // Get a specific place
  getById: (req, res) => {
    Place.findById(req.params.id)
      .then(place => {
        if (place) {
          res.status(200).json(place);
        } else {
          res.status(200).send('Place not found');
        }
      })
      .catch(err => res.status(500).send(JSON.stringify(err)));
  },

  // Get all art at a specific place
  // Assumes that input includes: 1) placeId in route
  getArtAtId: (req, res) => {
    Place.findById(req.params.id)
      .then(place => {
        place.getArts()
          .then(arts => {
            res.status(200).json(arts);
          })
          .catch(err => res.status(500).send(JSON.stringify(err)));
      });
  },
};
