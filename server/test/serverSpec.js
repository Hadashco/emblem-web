const should = require('chai').should();
const request = require('request');

const connection = require('../db/db');
const { db, Art, Place, User, ArtPlace, TRAILING_DEC_SECTOR } = connection;

const placeRecord = { lat: 0, long: 0 };
const artRecord = { type: 'test' };
const userRecord = { fbookId: '0' };

const AWS = require('aws-sdk');

// Set up region for requests
AWS.config.update({
  region: 'us-east-1',
  accessKeyId: process.env.AWS_ID,
  secretAccessKey: process.env.AWS_SECRET,
});

// Create reference to existing bucket
const s3bucket = new AWS.S3({ params: { Bucket: 'hadashco-emblem' } });

const xbeforeEach = () => {}; // Mimic xit and xdescribe

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

  describe('Art', () => {
    it ('should create an art record Art', (done) => {
      Art.create(artRecord).then(art => {
        art.should.have.property('id');
        art.id.should.not.be.null;
        return Art.findById(art.id).then(found => {
          found.id.should.equal(art.id);
          done();
        });
      });
    });
  });
});

describe('Art and ArtPlaces (Geotags, AWS, Votes, Comments)', () => {
  // for re-use throughout the tests
  let place, art, art2, artPlace2;
  const long = 22.44;
  const lat = 88.00;

  it ('should post a new Place to the server', (done) => {
    new Promise((resolve, reject) => {
      request.post({
        url: 'http://localhost:3000/place',
        body: JSON.stringify({ long, lat }),
        headers: {
          'content-type': 'application/json',
        },
      }, (err, response, body) => {
        err ? reject(err) : resolve(response.body);
      });
    }).then(body => {
      place = JSON.parse(body);
      place.long.should.equal(long);
      place.id.should.not.be.null;
      done();
    });
  });

  it ('should post a new art to the server', (done) => {
    new Promise((resolve, reject) => {
      request.post({
        url: 'http://localhost:3000/art',
        body: JSON.stringify({ data: 'definitely an image' }),
        headers: {
          'file-type': 'img/fakeimg',
          'content-type': 'application/octet-stream',
        },
      }, (err, response, body) => {
        err ? reject(err) : resolve(response.body);
      });
    }).then(body => {
      art = JSON.parse(body);
      art.id.should.not.be.null;
      done();
    });
  });

  it ('should post a second art to the server', (done) => {
    new Promise((resolve, reject) => {
      request.post({
        url: 'http://localhost:3000/art',
        body: JSON.stringify({ data: 'definitely an image' }),
        headers: {
          'file-type': 'img/fakeimg',
          'content-type': 'application/octet-stream',
        },
      }, (err, response, body) => {
        err ? reject(err) : resolve(response.body);
      });
    }).then(body => {
      art2 = JSON.parse(body);
      art2.id.should.not.be.null;
      art2.id.should.not.equal(art.id);
      done();
    });
  });

  it ('should get objects from the s3 bucket', (done) => {
    new Promise((resolve, reject) => {
      request.get({
        url: `http://localhost:3000/art/${art.id}/download`,
      }, (err, response, body) => {
        err ? reject(err) : resolve(response.body);
      });
    }).then(body => {
      Buffer.isBuffer(body).should.be.true;
      done();
    });
  });

  it ('should tie art to the place', (done) => {
    new Promise((resolve, reject) => {
      request.post({
        url: `http://localhost:3000/place/${place.id}`,
        body: JSON.stringify({ id: art.id }),
      }, (err, response, body) => {
        err ? reject(err) : resolve(response);
      });
    }).then(response => {
      response.statusCode.should.equal(200);
      done();
    });
  });

  it ('should tie art2 to the place', (done) => {
    new Promise((resolve, reject) => {
      request.post({
        url: `http://localhost:3000/place/${place.id}`,
        body: JSON.stringify({ id: art2.id }),
      }, (err, response, body) => {
        err ? reject(err) : resolve(response);
      });
    }).then(response => {
      response.statusCode.should.equal(200);
      done();
    });
  });

  it ('should increase vote of art2 (route)', (done) => {
    new Promise((resolve, reject) => {
      request.post({
        url: `http://localhost:3000/artPlace/${artPlace2.id}`,
        body: JSON.stringify({ vote: 1 }),
      }, (err, response, body) => {
        err ? reject(err) : resolve(response);
      });
    }).then(response => {
      response.statusCode.should.equal(200);
      done();
    });
  });

  it ('should increase vote of art2 (database)', (done) => {
    ArtPlace.findOne({ where: { artId: art2.id } }).then(artPlace => {
      artPlace2 = artPlace;
      artPlace2.should.not.be.null;
      done();
    });
  });

  it ('should return artPlace with most votes', (done) => {
    // router.get('/find/maxArtPlace/:lat/:long'
    new Promise((resolve, reject) => {
      request.get({
        url: `http://localhost:3000/place/find/maxArtPlace/${lat}/${long}`,
      }, (err, response) => {
        err ? reject(err) : resolve(response);
      });
    }).then(body => {
      const returnedAP = JSON.parse(body);
      returnedAP._id.should.equal(artPlace2._id);
      done();
    });
  });

  it ('should add comments to artPlace', (done) => {
    // router.post('/:id/comment
    new Promise((resolve, response) => {
      request.post({
        url: `http://localhost:3000/artPlace/${artPlace2._id}/comment`,
        body: JSON.stringify({ title: 'what an amazing gem, a masterpiece!' }),
      }, (err, response) => {
        err ? reject(err) : resolve(response);
      });
    }).then(response => {
      response.statusCode.should.equal(200);
      done();
    });
  });

  it ('should delete art from AWS', (done) => {
    new Promise((resolve, reject) => {
      request.post({
        url: `http://localhost:3000/art/${art.id}/delete`,
      }, (err, response) => {
        err ? reject(err) : resolve(response);
      });
    }).then(response => {
      response.statusCode.should.equal(200);
      done();
    });
  });

  it ('should delete art from corresponding artPlace1', (done) => {
    ArtPlace.findAll({ where: { artId: art.id } }).then(arts => {
      arts.length.should.equal(0);
      done();
    });
  });

  it ('should delete art2 from corresponding artPlace2', (done) => {
    ArtPlace.findAll({ where: { artId: art2.id } }).then(arts => {
      arts.length.should.equal(0);
      done();
    });
  });

  after(() => {
    Place.findById(place.id).then(place => place.destroy());
  });

});

