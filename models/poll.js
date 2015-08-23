/**
 * Model definitions and bussiness
 * logic for polls.
 * @namespace models
 * @module poll
 */
'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var pollSchema = new Schema({
  questions: Array
});

var Poll = mongoose.model('Poll', pollSchema);

module.exports = Poll;
