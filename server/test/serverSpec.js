const expect = require('chai').expect;
const request = require('request');

const connection = require('../db/db');
const db = connection.db;
const Place = connection.Place;
const Art = connection.Art;
// const User = connection.User;

const placeRecord = { lat: 0, long: 0 };
const artRecord = { type: 'test' };

const xbeforeEach = () => {}; // Mimic xit and xdescribe

describe('', () => {
 
  beforeEach(() => {
    db.sync()
//      .then(() => User.destroy({ where: {} }))
      .then(() => Art.destroy({ where: artRecord }))
      .then(() => Place.destroy({ where: placeRecord }));
  });

  // describe('User creation:', () => {
  //   // TODO: Populate when Oauth set up / team rules hammered out
  // });

  describe('Place', () => {
    it ('should build and save a new Place', () => {
      Place.create(placeRecord).then(place => {
        // place.should.have.property('id');
        // place.id.should.not.be.null;
        // return Place.findById(place.id).then(found => {
        //   found.id.should.equal(place.id);
        // });
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
