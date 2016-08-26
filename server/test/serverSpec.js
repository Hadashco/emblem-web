const should = require('chai').should();
const request = require('request');

const connection = require('../db/db');
const { db, Art, Place, User, ArtPlace, TRAILING_DEC_SECTOR } = connection;

const placeRecord = { lat: 0, long: 0, sector: '00000' };
const artRecord = { type: 'test' };
const userRecord = { fbookId: '0' };

describe('Build Database Models', () => {

  beforeEach(() => {
    db.sync()
      .then(() => User.destroy({ where: userRecord }))
      .then(() => Art.destroy({ where: artRecord }))
      .then(() => Place.destroy({ where: placeRecord }));
  });

  describe('User', () => {
    it ('should build and save a new User', (done) => {
      User.create(userRecord).then(user => {
        user.id.should.not.be.null;
        return User.findById(user.id).then(found => {
          found.id.should.equal(user.id);
          done();
        });
      });
    });
  });

  describe('Place', () => {
    it ('should build and save a new Place', (done) => {
      Place.create(placeRecord).then(place => {
        place.should.have.property('id');
        place.id.should.not.be.null;
        return Place.findById(place.id).then(found => {
          found.id.should.equal(place.id);
          done();
        });
      });
    });
  });

  // describe('Art', () => {
  //   it ('should create an art record Art', (done) => {
  //     Art.create(artRecord).then(art => {
  //       art.should.have.property('id');
  //       art.id.should.not.be.null;
  //       return Art.findById(art.id).then(found => {
  //         found.id.should.equal(art.id);
  //         done();
  //       });
  //     });
  //   });
  // });
});

// describe('Art and ArtPlaces (Geotags, AWS, Votes, Comments)', () => {
//   // for re-use throughout the tests
//   let place, art, art2, artPlace2;
//   const long = 22.44;
//   const lat = 88.00;
//   let token;

//   // beforeEach(() => {
//   //    token = signToken(1010);
//   // });
//   before(() => {
//     // signToken(1010);
//     const accessTokenUrl = `https://graph.facebook.com/v2.7/oauth/access_token
//         ?client_id=${config.FACEBOOK_ID}
//         &client_secret=${config.FACEBOOK_ID}
//         &grant_type=client_credentials`;

//     const params = {
//       client_id: config.FACEBOOK_ID,
//       client_secret: config.FACEBOOK_SECRET,
//       redirect_uri: '/login',
//     };

//     request.get({
//       url: accessTokenUrl,
//       qs: params,
//       json: true,
//     }, (err, response, accessToken) => {
//       token = accessToken;
//     });
//   });

//   it ('should post a new Place to the server', (done) => {
//     new Promise((resolve, reject) => {
//       request.post({
//         url: 'http://localhost:3000/place',
//         query: { access_token: token },
//         body: JSON.stringify({ long, lat }),
//         headers: {
//           'content-type': 'application/json',
//         },
//       }, (err, response, body) => {
//         err ? reject(err) : resolve(response.body);
//       });
//     }).then(body => {
//       place = JSON.parse(body);
//       place.long.should.equal(long);
//       place.id.should.not.be.null;
//       done();
//     });
//   });
