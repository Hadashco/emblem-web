const jwt = require('jsonwebtoken');
const User = require('../db/db').User;
const config = require('../config.js');
const expressJwt = require('express-jwt');

const EXPIRY = 60 * 60 * 5;
const SECRET = config.secrets.session;
const validateJwt = expressJwt({ secret: SECRET });

// Include access_token query param in req.header for validateJwt
const accessTokenHeader = (req, res, next) => {
  }
  next();
};

// Convert req.user after validateJwt
// Object with an id to User instance from database
const populateReqUser = (req, res, next) => {
  User.find({ where: { id: req.user.id } })
    .then(user => {
      if (!user) {
        return res.status(401).end();
      }
      req.user = user;
      return next();
    })
    .catch(err => next(err));
};

// TODO: Confirm this combination works
//       Should validate tokens, attach user to a request 
const isAuthenticated = (req, res, next) => {
  accessTokenHeader(req, res, next)
    .validateJwt()
    .populateReqUser(req, res, next);
};

const signToken = id => jwt.sign({ id: id }, SECRET, { expiresIn: EXPIRY });

const setTokenCookie = (req, res) => {
  if (!req.user) {
    return res.status(404).send('User not logged in, please try again.');
  }
  res.cookie('token', signToken(req.user.id));
  return res.redirect('/');
};

module.exports = {
  accessTokenHeader: accessTokenHeader,
  populateReqUser: populateReqUser,
  isAuthenticated: isAuthenticated,
  signToken: signToken,
  setTokenCookie: setTokenCookie,
};
