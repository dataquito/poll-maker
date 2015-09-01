/**
 * Module for auxiliar functions
 * that may be useful accross different
 * route handlers.
 * @namespace routes
 * @module helpers
 */

'use strict';

exports.notFound = function(resourceName, id, responseStream) {
  var msg = resourceName + " '" + id + "' not found";
  responseStream.status(404).send({error: msg});
};

exports.noContent = function(responseStream) {
  responseStream.status(204).end();
};

