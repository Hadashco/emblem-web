const jwt = require('jsonwebtoken');
const User = require('../db/db').User;
const expressJwt = require('express-jwt');

const EXPIRY = 60 * 60 * 5;
const validateJwt = expressJwt({ secret: process.env.SESSION_SECRET });

// Include access_token query param in req.header for validateJwt
const accessTokenHeader = (req, res, next) => {
  if (req.query && req.query.hasOwnPropery('access_token')) {
    req.headers.authorization = `Bearer ${req.query.access_token}`;
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

const signToken = id => jwt.sign({ id }, SECRET, { expiresIn: EXPIRY });

const setTokenCookie = (req, res) => {
  if (!req.user) {
    return res.status(404).send('User not logged in, please try again.');
  }
  res.cookie('token', signToken(req.user.id));
  return res.redirect('/');
};

module.exports = {
  accessTokenHeader,
  populateReqUser,
  isAuthenticated,
  signToken,
  setTokenCookie,
};
