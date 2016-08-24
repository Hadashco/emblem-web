const should = require('chai').should();
const request = require('request');

const { postNewArt, downloadById, getFromDbById, deleteById,
        getAllFromDb, postToPlaceById, addCommentById,
        getAllCommentsForId, voteById, getAllVotesForId,
      } = require('../resources/art/artController');


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
  it ('should postNewArt', (done) => {
    
  });
});

