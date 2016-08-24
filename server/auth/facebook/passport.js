const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const FacebookTokenStrategy = require('passport-facebook-token');

// TODO: Update callback url for deployment
module.exports = (User, config) => {
  const settings = {
    clientID: config.FACEBOOK_ID,
    clientSecret: config.FACEBOOK_SECRET,
    callbackURL: 'http://localhost:3000/auth/facebook/callback',
    profileFields: ['id', 'displayName', 'link', 'photos', 'email'],
  };

  const handler = (accessToken, refreshToken, profile, done) => {
    User.findOne({ where: { fbookId: profile.id } })
      .then(user => {
        if (user) {
          return done(null, user);
        }
        let emails = profile.emails;
        emails ? emails = emails[0].value : emails = null;
        const newUser = User.build({
          name: profile.displayName,
          email: emails,
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
  passport.serializeUser((user, done) => done(null, user));
  passport.deserializeUser((user, done) => done(null, user));

  passport.use(new FacebookTokenStrategy(settings, handler));
  passport.use(new FacebookStrategy(settings, handler));
};
