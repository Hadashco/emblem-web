const should = require('chai').should();

const connection = require('../db/db');
const { db, Art, Place, User } = connection;

const placeRecord = { lat: 0, long: 0, sector: '00000' };
const artRecord = { type: 'test' };
const userRecord = { fbookId: '0' };

describe('Build Database Models', () => {

  describe('User', () => {
    it('should build and save a new User', (done) => {
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
    it('should build and save a new Place', (done) => {
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
    it('should create an art record Art', (done) => {
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

  after(() => {
    db.sync()
      .then(() => User.destroy({ where: userRecord }))
      .then(() => Art.destroy({ where: artRecord }))
      .then(() => Place.destroy({ where: placeRecord }));
  });
});
