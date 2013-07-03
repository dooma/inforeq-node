var net = require('net')
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

var client = net.createConnection(port, host);
client.on('connect', function(){
  console.log('Connection created. Start requesting information!');
}).on('data', function(data){
  console.log('Received data from server:\n' + data);
}).on('error', function(error){
  if(error.code === 'ECONNREFUSED' || error.code === 'ENOTFOUND'){
    setTimeout(function(){
      client.connect(3000);
      console.log('Server is down, trying to connect ...');
    }, 2000);
  }
  else console.log(error);
});

process.stdin.on('data', function(data){
  if(data === 'exit' || data === 'quit'){
    console.log('Closing ...');
    process.exit(1);
  }
  else client.write(data);
});
