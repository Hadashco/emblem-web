const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');
const router = require('express').Router();
const sockets = require('../../sockets');
const Art = require('../../db/db').Art;
const storagePath = path.join(__dirname.concat('/../../storage/art'));

router.post('/', (req, res) => {
  let fileType = req.headers['file-type'];
  Art.create({ type: fileType })
    .then(art => {
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
    });
});

router.get('/', (req, res) => {
  Art.findAll()
    .then(arts => {
      res.status(200).send(arts);
    });
});

router.get('/:id', (req, res) => {
  console.log(req.params.id);
  res.send('this is an art with an id');
});

router.get('/', (req, res) => {
  Art.findAll()
    .then(arts => {
      res.status(200).send(JSON.stringify(arts));
    });
});

module.exports = router;
