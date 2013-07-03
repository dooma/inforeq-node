var net = require('net');
var os = require('os');

var port = 3000;
var host = 'localhost';

// Checking if user want the help of this application
if(process.argv[2] === '--help' || process.argv[2] === '-h'){
  console.log('Help for server.js:\nserver.js [port] [hostname]');
  process.exit(1);
} else {
  if(typeof(process.argv[2]) === 'integer'){
    var port = process.argv[2];
  }

  var pattern = new RegExp(/\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b/)
  if(pattern.exec(process.argv[3]) !== null ||
    process.argv[1].toLowerCase() === 'localhost')
    var host = process.argv[3].toString();
}

// Write to console when was created each connection
var announceToLog = function(word){
  var tmpDate = new Date();
  console.log('Client ' + word + ' at ' + tmpDate.getHours() + ":" +
    tmpDate.getMinutes() + ":" + tmpDate.getSeconds());
};

// Check if user request some data from server
var check = function(chunk){
  var pattern, converted;
  for(var property in os){

    pattern = new RegExp(property.toString());
    converted = pattern.exec(chunk.toLowerCase());

    if(converted !== null){
      return os[converted[0]]();
    }
  }
  if(converted === null)
    return 'Sorry, we could not process this request';
};

var server = net.createServer(function(connection) {
  connection.setEncoding('utf8');

  announceToLog('connect')
  connection.on('end', function(){
    announceToLog('disconnect');
  });

  connection.on('data', function(buffer){
     connection.write(JSON.stringify(check(buffer)));
  });
});

server.listen(port, host, function() {
  console.log("Server has been started!");
}).on('error', function(error){
  console.log('Server down... Restarting');
  setTimeout(function(){
    server.close();
    server.listen(3000);
  }, 2000);
});
