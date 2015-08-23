/**
 * Handle registration of routes
 * as specified by the different handlers.
 * @module routes
 */
'use strict';

var poll_handler = require('./handlers/poll');

function register(app) {
  app.get('/poll/:id', poll_handler.get);
  app.post('/poll', poll_handler.create);
  app.get('/poll', poll_handler.index);
  app.delete('/poll/:id', poll_handler.remove);
}

module.exports.register = register;
