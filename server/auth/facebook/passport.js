const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;

module.exports = (User, config) => {
  const settings = {
    clientId: config.facebook.clientID,
    clientSecret: config.facebook.clientSecret,
    callbackURL: config.facebook.callbackURL,
    profileFields: ['id', 'displayName', 'link', 'photos', 'email'],
  };

  const handler = (accessToken, refreshToken, profile, done) => {
    User.find({ where: { facebookId: profile.id } })
      .then(user => {
        if (user) {
          return done(null, user);
        }
        const newUser = User.build({
          name: profile.displayName,
          email: profile.emails[0].value,
          fbookId: profile.id,
          imgUrl: profile.photos[0].value,
          facebook: profile._json,
        });

        return newUser.save()
          .then(createdUser => done(null, createdUser))
          .catch(err => done(err));
      })
    .catch(err => done(err));
  };

  passport.use(new FacebookStrategy(settings, handler));
};
