/**
 * Define the backend logic
 * for interacting with polls.
 * @namespace handlers
 * @module poll
 */
'use strict';

var Poll = require('../models/poll');

function pollPostHandler(req, res) {
  res.status(201);
  res.send('ok');
}

function pollGetHandler(req, res) {
  res.send('ok');
}

function pollIndexHandler(req, res) {
  res.send('ok');
}

function pollDeleteHandler(req, ers) {
  res.send('ok');
}

module.exports = {
  create: pollPostHandler,
  get: pollGetHandler,
  index: pollIndexHandler,
  remove: pollDeleteHandler
};
