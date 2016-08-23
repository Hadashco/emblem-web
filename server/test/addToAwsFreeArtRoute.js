/*
 * TODO: 
 *  1. From terminal, navigate to 'server' folder and run:
       npm install --save fs-extra 
 *  2. Add storage folder for artwork, update storagePath accordingly
 *  3. Replace existing AWS routes in 'server/resources/art/artRoute.js'
 *  4. Delete router.get('/:id/download')
 *     Revise all client GET requests to '/:id/download' to point to storagePath

const fs = require('fs-extra');
const path = require('path');
const storagePath = path.join(__dirname.concat('/../../storage'));

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

*/
