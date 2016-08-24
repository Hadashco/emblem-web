const should = require('chai').should();
const request = require('request');

const { postNewArt, downloadById, getFromDbById, deleteById,
        getAllFromDb, postToPlaceById, addCommentById,
        getAllCommentsForId, voteById, getAllVotesForId,
      } = require('../resources/art/artController');

const connection = require('../db/db');
const { db, Art, Place, User, ArtPlace, TRAILING_DEC_SECTOR } = connection;

const placeRecord = { lat: 0, long: 0, sector: '00000' };
const artRecord = { type: 'test' };
const userRecord = { fbookId: '0' };

// Due to authentication, all of these routes will fail
// They should still be reached, however
describe('Confirm Art Routes protected by OAuth', () => {

  it ('should postNewArt', (done) => {
    new Promise((resolve, reject) => {
      request.post({
        url: 'http://localhost:3000/art',
        headers: {
          'content-type': 'application/json',
          'file-type': '.jpeg',
        },
      }, (err, response, body) => {
        response.statusCode.should.equal(401);
        done();
      });
    });
  });

  it ('should downloadById', (done) => {
    new Promise((resolve, reject) => {
      request.get({
        url: 'http://localhost:3000/art/1/download',
        headers: {
          'content-type': 'application/json',
        },
        params: { id: 1 },
      }, (err, response, body) => {
        response.statusCode.should.equal(401);
        done();
      });
    });
  });

  it ('should deleteById', (done) => {
    new Promise((resolve, reject) => {
      request.post({
        url: 'http://localhost:3000/art/1/delete',
        headers: {
          'content-type': 'application/json',
        },
        params: { id: 1 },
      }, (err, response, body) => {
        response.statusCode.should.equal(401);
        done();
      });
    });
  });

  it ('should getFromDbById', (done) => {
    new Promise((resolve, reject) => {
      request.get({
        url: 'http://localhost:3000/art/1',
        headers: {
          'content-type': 'application/json',
        },
        params: { id: 1 },
      }, (err, response, body) => {
        response.statusCode.should.equal(401);
        done();
      });
    });
  });

  it ('should getAllFromDb', (done) => {
    new Promise((resolve, reject) => {
      request.get({
        url: 'http://localhost:3000/art/',
        headers: {
          'content-type': 'application/json',
        },
      }, (err, response, body) => {
        response.statusCode.should.equal(401);
        done();
      });
    });
  });

  it ('should postToPlaceById', (done) => {
    new Promise((resolve, reject) => {
      request.post({
        url: 'http://localhost:3000/art/1/place',
        headers: {
          'content-type': 'application/json',
        },
        params: { id: 1 },
      }, (err, response, body) => {
        response.statusCode.should.equal(401);
        done();
      });
    });
  });

  it ('should addCommentById', (done) => {
    new Promise((resolve, reject) => {
      request.post({
        url: 'http://localhost:3000/art/1/comment',
        headers: {
          'content-type': 'application/json',
        },
        params: { id: 1 },
      }, (err, response, body) => {
        response.statusCode.should.equal(401);
        done();
      });
    });
  });

  it ('should getAllCommentsForId', (done) => {
    new Promise((resolve, reject) => {
      request.get({
        url: 'http://localhost:3000/art/1/comment',
        headers: {
          'content-type': 'application/json',
        },
        params: { id: 1 },
      }, (err, response, body) => {
        response.statusCode.should.equal(401);
        done();
      });
    });
  });

  it ('should voteById', (done) => {
    new Promise((resolve, reject) => {
      request.post({
        url: 'http://localhost:3000/art/1/vote',
        headers: {
          'content-type': 'application/json',
        },
        params: { id: 1 },
      }, (err, response, body) => {
        response.statusCode.should.equal(401);
        done();
      });
    });
  });

  it ('should getAllVotesForId', (done) => {
    new Promise((resolve, reject) => {
      request.get({
        url: 'http://localhost:3000/art/1/vote',
        headers: {
          'content-type': 'application/json',
        },
        params: { id: 1 },
      }, (err, response, body) => {
        response.statusCode.should.equal(401);
        done();
      });
    });
  });
});

describe('Test Art Controllers (WIP)', () => {
  let testUser;

  before(() => {
    db.sync()
      .then(() => User.create(userRecord)
        .then(user => { testUser = user; }));
  });

  it ('should postNewArt', (done) => {
    const req = {
      headers: {
        'file-type': 'jpeg',
        'Content-Type': 'application/octet-stream',
      },
      user: testUser,
      body: 'definitely some art',
    };

    const res = {};
    res.status = (statusCode) => {
      statusCode.should.equal(200);
      done();
    };

    postNewArt(req, res);
  });

  after(() => {
    db.sync()
      .then(() => Art.destroy({ where: { UserId: testUser.id } }))
      .then(() => User.destroy({ where: userRecord }));
  });


});

