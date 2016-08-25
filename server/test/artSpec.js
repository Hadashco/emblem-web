const { expect } = require('chai');
const request = require('request');
const httpMocks = require('node-mocks-http');

const { postNewArt, downloadById, getFromDbById, deleteById,
        getAllFromDb, postToPlaceById, addCommentById,
        getAllCommentsForId, voteById, getAllVotesForId,
      } = require('../resources/art/artController');

const connection = require('../db/db');
const { db, Art, Place, User, ArtPlace, TRAILING_DEC_SECTOR } = connection;

const placeRecord = { lat: 0, long: 0, sector: '00000' };
const artRecord = { type: 'test' };
const userRecord = { fbookId: '0' };

/* *********** ROUTE TESTS ***********************
 * Due to authentication, all of these routes will fail
 * They should still be reached, however */
describe('Confirm Art Routes protected by OAuth', () => {
  it('should postNewArt', (done) => {
    request.post({
      url: 'http://localhost:3000/art',
      headers: {
        'content-type': 'application/json',
        'file-type': '.jpeg',
      },
    }, (err, response) => {
      expect(response.statusCode).to.equal(401);
      done();
    });
  });

  it('should downloadById', (done) => {
    request.get({
      url: 'http://localhost:3000/art/1/download',
      headers: {
        'content-type': 'application/json',
      },
      params: { id: 1 },
    }, (err, response) => {
      expect(response.statusCode).to.equal(401);
      done();
    });
  });

  it('should deleteById', (done) => {
    request.post({
      url: 'http://localhost:3000/art/1/delete',
      headers: {
        'content-type': 'application/json',
      },
      params: { id: 1 },
    }, (err, response) => {
      expect(response.statusCode).to.equal(401);
      done();
    });
  });

  it('should getFromDbById', (done) => {
    request.get({
      url: 'http://localhost:3000/art/1',
      headers: {
        'content-type': 'application/json',
      },
      params: { id: 1 },
    }, (err, response) => {
      expect(response.statusCode).to.equal(401);
      done();
    });
  });

  it('should getAllFromDb', (done) => {
    request.get({
      url: 'http://localhost:3000/art/',
      headers: {
        'content-type': 'application/json',
      },
    }, (err, response) => {
      expect(response.statusCode).to.equal(401);
      done();
    });
  });

  it('should postToPlaceById', (done) => {
    request.post({
      url: 'http://localhost:3000/art/1/place',
      headers: {
        'content-type': 'application/json',
      },
      params: { id: 1 },
    }, (err, response) => {
      expect(response.statusCode).to.equal(401);
      done();
    });
  });

  it('should addCommentById', (done) => {
    request.post({
      url: 'http://localhost:3000/art/1/comment',
      headers: {
        'content-type': 'application/json',
      },
      params: { id: 1 },
    }, (err, response) => {
      expect(response.statusCode).to.equal(401);
      done();
    });
  });

  it('should getAllCommentsForId', (done) => {
    request.get({
      url: 'http://localhost:3000/art/1/comment',
      headers: {
        'content-type': 'application/json',
      },
      params: { id: 1 },
    }, (err, response) => {
      expect(response.statusCode).to.equal(401);
      done();
    });
  });

  it('should voteById', (done) => {
    request.post({
      url: 'http://localhost:3000/art/1/vote',
      headers: {
        'content-type': 'application/json',
      },
      params: { id: 1 },
    }, (err, response) => {
      expect(response.statusCode).to.equal(401);
      done();
    });
  });

  it('should getAllVotesForId', (done) => {
    request.get({
      url: 'http://localhost:3000/art/1/vote',
      headers: {
        'content-type': 'application/json',
      },
      params: { id: 1 },
    }, (err, response) => {
      expect(response.statusCode).to.equal(401);
      done();
    });
  });
});

/* *********** CONTROLLER TESTS **************** */
describe('Test Art Controllers\n-------------------------\n', () => {
  let testUser, testArt, awsArt;
  // let getReq;

  before((done) => {
    db.sync()
      .then(() => User.create(userRecord)
        .then(user => { testUser = user; })
      .then(() => Art.create(artRecord)
        .then(art => {
          testArt = art;
          done();
        })));

    // getReq = {
    //   params: {
    //     id: testArt.id,
    //   },
    //   user: testUser,
    //   body: 'definitely some art',
    // };
  });

  it('should postNewArt (AWS and Db)', (done) => {
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
      expect(statusCode).to.equal(200);
      done();
    };

    postNewArt(req, res);
  });

  it('should downloadById (AWS and Db)', (done) => {
    Art.findOne({ where: { UserId: testUser.id } })
      .then(art => {
        awsArt = art;
        const req = {
          params: {
            id: art.id,
          },
        };

        const res = {};
        res.status = (statusCode) => {
          expect(statusCode).to.equal(200);
          done();
        };

        downloadById(req, res);
      });
  });

  // it('should get specific art, getFromDbById', (done) => {
  //   const req = httpMocks.createRequest({
  //     method: 'GET',
  //     params: { id: awsArt.id },
  //   });

  //   const res = httpMocks.createResponse();

  //   // const req = { };
  //   // const res = {
  //   //   status: (statusCode) => {
  //   //     expect(statusCode).to.equal(200);
  //   //     return this;
  //   //   },
  //   //   json: (input) => {
  //   //     console.log('yay json input:', input);
  //   //     done();
  //   //   },
  //   // };
  //   getFromDbById(req, res);

  //   const data = JSON.parse(res._getData());
  //   console.log('data is:', data);
  //   done();
  // });


  it('should deleteById (AWS and Db)', (done) => {
    const req = { params: { id: awsArt.id } };
    const res = {};
    res.status = (statusCode) => {
      expect(statusCode).to.be.at.within(199, 205);
      done();
    };

    deleteById(req, res);
  });


  after(() => {
    db.sync()
      .then(() => Art.destroy({ where: { UserId: testUser.id } }))
      .then(() => User.destroy({ where: userRecord }));
  });


});

