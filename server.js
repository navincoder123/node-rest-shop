var http=require('http'); 
var app=require('./app')

var port=process.env.PORT ||3000;
var server=http.createServer(app);
server.listen(port);

console.log("Listening to the server at" +port);


/*server.listen(port, function(){
    console.log("Server Has Started");
});*/


