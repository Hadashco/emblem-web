const chai = require('chai');
// const Strategy = require('./stubStrategy');
const expect = require('chai').expect;
chai.use(require('chai-passport-strategy'));

const FacebookStrategy = require('passport-facebook').Strategy;


describe('Token Strategy', () => {
  const strategy = new FacebookStrategy((token, done) => {
    if (token === 'vF9dft4qmT') {
      return done(null, { id: '1234' }, { scope: 'read' });
    }
    return done(null, false);
  });

  describe('handling a request with valid credential in header', () => {
    let user;
    let info;

    before(done => {
      chai.passport.use(strategy)
        .success((u, i) => {
          user = u;
          info = i;
          done();
        })
        .req(req => {
          req.headers.authorization = 'Bearer vF9dft4qmT';
        })
        .authenticate();
    });

    it('should supply user', () => {
      expect(user).to.be.an.object;
      expect(user.id).to.equal('1234');
    });

    it('should supply info', () => {
      expect(info).to.be.an.object;
      expect(info.scope).to.equal('read');
    });

  });

});