const router = require('express').Router();
const db = require('../../db/db');
const { Art, Place, ArtPlace, Comment, Vote } = db;


router.get('/', (req, res) => {
  ArtPlace.findAll().then(result => {
    res.status(200).json(result);
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

module.exports = router;
