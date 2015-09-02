'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var questionSchema = new Schema({
  question : { type: String, required: true, unique:true },
  answerDescription : {
    answerDataType: { type:String, required:true },
    answerComment: String,
    answerOptions: Schema.Types.Mixed,
    relatedQuestion: Schema.Types.Mixed
  }
});

var Question = mongoose.model('Question', questionSchema);

module.exports = Question;
