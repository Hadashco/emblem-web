const { expect } = require('chai');
const httpMocks = require('node-mocks-http');
const request = require('request');

const { getAll, getMaxAtPlace, getMaxBetweenBounds,
        getAllBetweenBounds, getById, addCommentForId,
        getAllCommentsForId, addVoteForId, getVotesForId,
        deleteById,
      } = require('../resources/artPlace/artPlaceController');

const connection = require('../db/db');
const upvoteVal = 100000000;
const { db, Art, Place, User, ArtPlace } = connection;

const placeRecord = { lat: 5, long: 5, sector: '00000' };
const artRecord = { type: 'test' };
const userRecord = { fbookId: '0' };

/* *********** ROUTE TESTS ***********************
 * Due to authentication, all of these routes will fail
 * They should still be reached, however */
describe('Confirm ArtPlace Routes protected by OAuth\n-------------------------\n', () => {

  it('should getAll', (done) => {
    request.get({
      url: 'http://localhost:3000/artPlace',
    }, (err, response) => {
      expect(response.statusCode).to.equal(401);
      done();
    });
  });

  it('should getMaxAtPlace', (done) => {
    request.get({
      url: 'http://localhost:3000/artPlace/max/rank',
    }, (err, response) => {
      expect(response.statusCode).to.equal(401);
      done();
    });
  });

  it('should getMaxBetweenBounds', (done) => {
    request.get({
      url: 'http://localhost:3000/artPlace/max/between/5/5/5/5',
    }, (err, response) => {
      expect(response.statusCode).to.equal(401);
      done();
    });
  });

  it('should getAllBetweenBounds', (done) => {
    request.get({
      url: 'http://localhost:3000/artPlace/between/5/5/5/5',
    }, (err, response) => {
      expect(response.statusCode).to.equal(401);
      done();
    });
  });

  it('should getById', (done) => {
    request.get({
      url: 'http://localhost:3000/artPlace/5',
    }, (err, response) => {
      expect(response.statusCode).to.equal(401);
      done();
    });
  });

  it('should addCommentForId', (done) => {
    request.post({
      url: 'http://localhost:3000/artPlace/5/comment',
    }, (err, response) => {
      expect(response.statusCode).to.equal(401);
      done();
    });
  });

  it('should getAllCommentsForId', (done) => {
    request.get({
      url: 'http://localhost:3000/artPlace/5/comment',
    }, (err, response) => {
      expect(response.statusCode).to.equal(401);
      done();
    });
  });

  it('should addVoteForId', (done) => {
    request.post({
      url: 'http://localhost:3000/artPlace/5/vote',
    }, (err, response) => {
      expect(response.statusCode).to.equal(401);
      done();
    });
  });

  it('should getVotesForId', (done) => {
    request.get({
      url: 'http://localhost:3000/artPlace/5/vote',
    }, (err, response) => {
      expect(response.statusCode).to.equal(401);
      done();
    });
  });

  it('should deleteById', (done) => {
    request.post({
      url: 'http://localhost:3000/artPlace/5/delete',
    }, (err, response) => {
      expect(response.statusCode).to.equal(401);
      done();
    });
  });
});

/* *********** CONTROLLER TESTS **************** */

describe('Test ArtPlace Controllers\n-------------------------\n', () => {
  let testUser, testArt, testPlace, testArtPlace;
  // let getReq;

  before((done) => {
    db.sync()
      .then(() => User.create(userRecord)
        .then(user => { testUser = user; })
      .then(() => Art.create(artRecord)
        .then(art => {
          art.setUser(testUser);
          testArt = art;
        }))
      .then(() => Place.create(placeRecord)
        .then(place => {
          place.setUser(testUser);
          testPlace = place;
          testArt.addPlace(testPlace)
            .then(() => {
              ArtPlace.findOne({ where: { ArtId: testArt.id } })
                .then(artPlace => {
                  testArtPlace = artPlace;
                  testArtPlace.increment({
                    upvotes: upvoteVal,
                  })
                  .then(artPlace => {
                    done();
                  });
                });
            });
        })));
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
        expect(boolVal).to.equal(true);
        done();
      });
    });

    getAll(req, res);
  });

  it('should getMaxAtPlace', (done) => {
    const req = httpMocks.createRequest({
      method: 'GET',
    });

    const res = httpMocks.createResponse({
      eventEmitter: require('events').EventEmitter,
    });

    res.on('end', () => {
      expect(res.statusCode).to.equal(200);
      new Promise((resolve, reject) => {
        resolve(res._getData());
      })
      // Results sorted by PlaceId, oldest to newest entry
      .then(data => {
        const parsed = JSON.parse(data);
        const max = parsed[parsed.length - 1];
        const dataId = max.ArtPlaceId; // masked in query
        expect(dataId).to.equal(testArtPlace.dataValues._id);
        done();
      });
    });

    getMaxAtPlace(req, res);
  });

  it('should getMaxBetweenBounds', (done) => {
    const req = httpMocks.createRequest({
      method: 'GET',
      params: {
        latMin: 0,
        latMax: 10,
        longMin: 0,
        longMax: 10,
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
      // Results sorted by PlaceId, oldest to newest entry
      .then(data => {
        const parsed = JSON.parse(data);
        const max = parsed[parsed.length - 1];
        const dataId = max.ArtPlaceId; // masked in query
        expect(dataId).to.equal(testArtPlace.dataValues._id);
        done();
      });
    });

    getMaxBetweenBounds(req, res);
  });

  it('should getAllBetweenBounds', (done) => {
    const req = httpMocks.createRequest({
      method: 'GET',
      params: {
        latMin: 0,
        latMax: 10,
        longMin: 0,
        longMax: 10,
      },
    });

    const res = httpMocks.createResponse({
      eventEmitter: require('events').EventEmitter,
    });

    res.on('end', () => {
      expect(res.statusCode).to.equal(200);
      done();
    });

    getAllBetweenBounds(req, res);
  });

  it('should getById', (done) => {
    const req = httpMocks.createRequest({
      method: 'GET',
      params: {
        id: testArtPlace.dataValues._id,
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
      // Results sorted by PlaceId, oldest to newest entry
      .then(data => {
        const max = JSON.parse(data);
        const dataId = max._id; // masked in query
        expect(dataId).to.equal(testArtPlace.dataValues._id);
        done();
      });
    });

    getById(req, res);
  });

  it('should addCommentForId', (done) => {
    const req = httpMocks.createRequest({
      method: 'POST',
      user: testUser,
      params: { id: testArtPlace.dataValues._id },
      body: {
        title: 'amazing comment, you know',
      },
    });

    const res = httpMocks.createResponse({
      eventEmitter: require('events').EventEmitter,
    });

    res.on('end', () => {
      expect(res.statusCode).to.equal(200);
      done();
    });

    addCommentForId(req, res);
  });

  it('should getAllCommentsForId', (done) => {
    const req = httpMocks.createRequest({
      method: 'GET',
      params: {
        id: testArtPlace.dataValues._id,
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
        const comments = JSON.parse(data);
        expect(comments[0].commentable_id).to.equal(testArtPlace.dataValues._id);
        done();
      });
    });

    getAllCommentsForId(req, res);
  });

  it('should addVoteForId', (done) => {
    const req = httpMocks.createRequest({
      method: 'POST',
      user: testUser,
      params: { id: testArtPlace.dataValues._id },
      body: {
        vote: 1,
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
        const vote = JSON.parse(data);
        expect(vote.value).to.equal(1);
        done();
      });
    });

    addVoteForId(req, res);
  });

  it('should getVotesForId', (done) => {
    const req = httpMocks.createRequest({
      method: 'GET',
      params: {
        id: testArtPlace.dataValues._id,
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
        const votes = JSON.parse(data);
        expect(votes[0].value).to.equal(1);
        done();
      });
    });

    getVotesForId(req, res);
  });

  it('should deleteById', (done) => {
    const req = httpMocks.createRequest({
      method: 'POST',
      params: { id: testArtPlace.dataValues._id },
    });

    const res = httpMocks.createResponse({
      eventEmitter: require('events').EventEmitter,
    });

    res.on('end', () => {
      expect(res.statusCode).to.equal(200);
      done();
    });

    deleteById(req, res);
  });

  after(() => {
    db.sync()
      .then(() => Art.destroy({ where: { UserId: testUser.id } }))
      .then(() => ArtPlace.destroy({ where: { ArtId: testArt.id } }))
      .then(() => Place.destroy({ where: { UserId: testUser.id } }))
      .then(() => User.destroy({ where: userRecord }));
  });
});

