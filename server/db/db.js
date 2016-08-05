var sequelize = require('sequelize');
var pg = require('pg');

var connection = new sequelize('postgres://postgres:TEST@emblem-db:5432/postgres');
module.exports = connection;
