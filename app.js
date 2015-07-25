/**
 * Application entrypoint that defines
 * initialization logic.
 * Requires the port to be used specified
 * as the first argument in the command line.
 * @module app
 */
var express = require('express');
var mongoose = require('mongoose');
var config = require('./config');

// Attempt database connection
var db = mongoose.connection;

// If no connection can be made, abort
db.on('error', function() {
  console.error('Failed database connection attempt at ', config.db_address);
  process.exit(1);
});

var app = express();

// Configure template engine
app.set('view engine', 'jade');

// Set routes
app.get('/', function(req, res) {
  res.render('index');
});

db.once('open', function(callback) {
  var server = app.listen(config.port, function() {
    var host = server.address().address;
    console.log('Listening on http://%s:%d', host, config.port);
  });
});

module.exports = app;
