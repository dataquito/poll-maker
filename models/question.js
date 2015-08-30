'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var questionSchema = new Schema({
  question : String,
  answerDescription : {
    answerDataType: String,
    answerComment: String,
    answerOptions: Schema.Types.Mixed,
    relatedQuestion: Schema.Types.Mixed
  }
});

var Question = mongoose.model('Question', questionSchema);

module.exports = Question;
