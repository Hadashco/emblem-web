const expect = require('chai').expect;
const request = require('request');

const connection = require('../db/db');
const db = connection.db;
const Place = connection.Place;
const Art = connection.Art;
const User = connection.User;

const placeRecord = { lat: 0, long: 0 };
const artRecord = { type: 'test' };
const userRecord = { fbookId: '0' };

const xbeforeEach = () => {}; // Mimic xit and xdescribe

describe('Build Models', () => {
 
  beforeEach(() => {
    db.sync()
      .then(() => User.destroy({ where: userRecord }))
      .then(() => Art.destroy({ where: artRecord }))
      .then(() => Place.destroy({ where: placeRecord }));
  });

  describe('User', () => {
    it ('should build and save a new User', () => {
      User.create(userRecord).then(user => {
        user.id.should.not.be.null;
        return User.findById(user.id).then(found => {
          found.id.should.equal(user.id);
        });
      });
    });
  });

  describe('Place', () => {
    it ('should build and save a new Place', () => {
      Place.create(placeRecord).then(place => {
        place.should.have.property('id');
        place.id.should.not.be.null;
        return Place.findById(place.id).then(found => {
          found.id.should.equal(place.id);
        });
      });
    });
  });

  describe('Art', () => {
    it ('should build and save a new Art', () => {
      Art.create(artRecord).then(art => {
        art.should.have.property('id');
        art.id.should.not.be.null;
        return Art.findById(art.id).then(found => {
          found.id.should.equal(art.id);
        });
      });
    });
  });


});

/*
  psql -h dbhost -U username dbname
  psql -h localhost:5432 -U postgres postgres
  dbhost: localhost:5432
  dbname: postrgres
  dbuser: postgres
  pw: emblem
  docker-compose up
  psql -U postgres
*/
