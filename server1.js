var http = require('http');
var app=require('./app');

// configure http server
var server=http.createServer(function (request, response) {
  response.writeHead(200, {'Content-Type': 'text/plain'});
}, app );

const port= process.env.PORT ;
server.listen(port, "127.0.0.1");

// inform user what is happening
console.log('Server running at http://127.0.0.1:' +port+ '/');