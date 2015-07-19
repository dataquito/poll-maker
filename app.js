/**
 * Application entrypoint that defines
 * initialization logic.
 * Requires the port to be used specified
 * as the first argument in the command line.
 * @module app
 */
var express = require('express');
var app = express();

// Configure template engine
app.set('view engine', 'jade');

// Set routes
app.get('/', function(req, res) {
  res.render('index');
});

var port = Number(process.argv[2]);

if (isNaN(port) || port === 0) {
  console.error('Please provide a valid port number');
  process.exit(1);
}

var server = app.listen(port, function() {
  var host = server.address().address;
  console.log('Listening on http://%s:%d', host, port);
});
