/**
 * Extract all the necessary
 * configuration information
 * from either command line arguments
 * (which take priority) or environment
 * variables. Non-specified information
 * should prevent the application from starting,
 * unless there's a sensible default.
 * @module config
 */
var mongoose = require('mongoose');
var dns = require('dns');

// Parse arguments
var argv = require('minimist')(process.argv.slice(2));

// Extract values by priorities
var port = Number(argv.port || argv.p || process.env.HTTP_PORT || '8080');

// Get current environment
var environ = process.env.NODE_ENV || 'development';

// Attempt connection to database with default values
dns.lookup('mongo', function(err, address) {
  if (!err) {
    mongoose.connect('mongodb://' + address + ':27017/' + environ);
  } else {
    // if an error occurred, get connection info from
    // environment or command line parameters.
    var db_address = argv['db-address'] || process.env.DB_ADDRESS;

    if (db_address === '' || db_address === undefined) {
      var db_host = argv['db-host'] || process.env.DB_HOST;
      var db_port = argv['db-port'] || process.env.DB_PORT || '27017';
      var db_name = argv['db-name'] || process.env.DB_NAME;

      if (db_host === undefined || db_name === undefined) {
        console.error('Please provide database information');
        process.exit(1);
      }

      db_address = 'mongodb://' + db_host + ':' + db_port + '/' + db_name;
    }

    mongoose.connect(db_address);
  }
});

// Validate values, where needed
if (isNaN(port) || port === 0) {
  console.error('Please provide a valid port number');
  process.exit(1);
}

module.exports = {
  port: port,
}
