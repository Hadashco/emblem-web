const { expect } = require('chai');
const httpMocks = require('node-mocks-http');
const request = require('request');

const { postNewPlace, getAll, findByLatLong,
        getMaxArtPlaceAtPlaceId, getById,
        getAllArtPlaceAtLatLong, getArtAtId,
      } = require('../resources/place/placeController');

const connection = require('../db/db');
const { db, Art, Place, User, ArtPlace } = connection;

/* *********** ROUTE TESTS ***********************
 * Due to authentication, all of these routes will fail
 * They should still be reached, however */
describe('Confirm Place Routes protected by OAuth\n-------------------------\n', () => {

  it('should postNewPlace', (done) => {
    request.post({
      url: 'http://localhost:3000/place',
    }, (err, response) => {
      expect(response.statusCode).to.equal(401);
      done();
    });
  });

  it('should getAll', (done) => {
    request.get({
      url: 'http://localhost:3000/place',
    }, (err, response) => {
      expect(response.statusCode).to.equal(401);
      done();
    });
  });

  it('should getMaxArtPlaceAtPlaceId', (done) => {
    request.get({
      url: 'http://localhost:3000/place/find/maxArtPlace/5',
    }, (err, response) => {
      expect(response.statusCode).to.equal(401);
      done();
    });
  });

  it('should findByLatLong', (done) => {
    request.get({
      url: 'http://localhost:3000/place/5/5',
    }, (err, response) => {
      expect(response.statusCode).to.equal(401);
      done();
    });
  });

  it('should getAllArtPlaceAtLatLong', (done) => {
    request.get({
      url: 'http://localhost:3000/place/artPlace/5/5',
    }, (err, response) => {
      expect(response.statusCode).to.equal(401);
      done();
    });
  });

  it('should getById', (done) => {
    request.post({
      url: 'http://localhost:3000/place/5',
    }, (err, response) => {
      expect(response.statusCode).to.equal(401);
      done();
    });
  });

  it('should getArtAtId', (done) => {
    request.get({
      url: 'http://localhost:3000/place/5/art',
    }, (err, response) => {
      expect(response.statusCode).to.equal(401);
      done();
    });
  });
});

/* *********** CONTROLLER TESTS **************** */

describe('Test Place Controllers\n-------------------------\n', () => {
  const placeRecord = { lat: 5, long: 5, sector: '00000' };
  const artRecord = { type: 'test' };
  const userRecord = { fbookId: '0' };
  let testUser, testArt, testPlace;
  // let getReq;

  before((done) => {
    db.sync()
      .then(() => User.create(userRecord)
        .then(user => { testUser = user; })
      .then(() => Art.create(artRecord)
        .then(art => {
          art.setUser(testUser);
          testArt = art;
          done();
        })));
  });

  it('should postNewPlace', (done) => {
    const req = httpMocks.createRequest({
      method: 'POST',
      user: testUser,
      body: {
        lat: placeRecord.lat,
        long: placeRecord.long,
      },
    });

    const res = httpMocks.createResponse({
      eventEmitter: require('events').EventEmitter,
    });

    res.on('end', () => {
      expect(res.statusCode).to.equal(200);
      new Promise((resolve, reject) => {
        resolve(res._getData());
      })
      .then(data => {
        testPlace = JSON.parse(data);
        done();
      });
    });

    postNewPlace(req, res);
  });

  it('should getAll', (done) => {
    const req = httpMocks.createRequest({
      method: 'GET',
    });

    const res = httpMocks.createResponse({
      eventEmitter: require('events').EventEmitter,
    });

    res.on('end', () => {
      expect(res.statusCode).to.equal(200);
      new Promise((resolve, reject) => {
        resolve(res._isJSON());
      })
      .then(boolVal => {
        expect(boolVal).to.equal(false);
        done();
      });
    });

    getAll(req, res);
  });

  it('should findByLatLong', (done) => {
    const req = httpMocks.createRequest({
      method: 'GET',
      user: testUser,
      params: {
        lat: placeRecord.lat,
        long: placeRecord.long,
      },
    });

    const res = httpMocks.createResponse({
      eventEmitter: require('events').EventEmitter,
    });

    res.on('end', () => {
      expect(res.statusCode).to.be.within(199, 202);
      new Promise((resolve, reject) => {
        resolve(res._isJSON());
      })
      .then(boolVal => {
        expect(boolVal).to.equal(true);
        done();
      });
    });

    findByLatLong(req, res);
  });

  after(() => {
    db.sync()
      .then(() => Art.destroy({ where: { UserId: testUser.id } }))
      .then(() => ArtPlace.destroy({ where: { ArtId: testArt.id } }))
      .then(() => Place.destroy({ where: { UserId: testUser.id } }))
      .then(() => User.destroy({ where: userRecord }));
  });
});
