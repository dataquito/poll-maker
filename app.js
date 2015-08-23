/**
 * Application entrypoint that defines
 * initialization logic.
 * Requires the port to be used specified
 * as the first argument in the command line.
 * @module app
 */
'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var config = require('./config');
var polls = require('./routes/polls');
var questions = require('./routes/questions');

// Attempt database connection
var db = mongoose.connection;

// If no connection can be made, abort
db.on('error', function() {
  console.error('Failed database connection attempt at ', config.db_address);
  process.exit(1);
});

var app = express();

// Configure middlewares
app.use(bodyParser.urlencoded({ extended: false }));

// Configure template engine
app.set('view engine', 'jade');

// Set routes
app.get('/', function(req, res) {
  res.render('index');
});

app.use('/poll', polls);
app.use('/question', questions);

db.once('open', function(callback) {
  var server = app.listen(config.port, function() {
    var host = server.address().address;
    console.log('Listening on http://%s:%d', host, config.port);
  });
});

module.exports = app;
