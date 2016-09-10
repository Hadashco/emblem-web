const Vote = require('../../db/db').Vote;

module.exports = {
  getAll: (req, res) => {
    Vote.findAll().then(result => {
      res.send(result);
    })
    .catch(err => res.status(500).json(err));
  },
};
