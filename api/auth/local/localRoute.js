const passport = require('passport');
const {
    signToken,
    loginUser,
    createUser,
    config
} = require('../authService');
const router = require('express').Router();

router.post('/login', (req, res) => {
    // loginUser throws if the password is incorrect.
    loginUser(req.body.username, req.body.password)
        .then(user => {
            return res.status(200).send(signToken(user.id));
        })
        .catch(err => res.status(401).send(err));
});

router.post('/register', (req, res) => {
    createUser(req.body.username, req.body.password)
        .then(user => {
            res.status(200).send(signToken(user.id));
        })
        .catch(err => {
            console.log(err);
            res.status(401).send(err);
        });
});

module.exports = router;
