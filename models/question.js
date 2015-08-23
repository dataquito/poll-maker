'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var questionSchema = new Schema({
  pregunta : String,
  descripcion : {
    'type': String
  }
});
