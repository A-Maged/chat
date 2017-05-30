
// 0- dependencies
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser')
var dotenv = require('dotenv');
var app = express();

var server = require('http').Server(app);
var io = require('socket.io')(server);




// 1- configure app
var port = 3000;
dotenv.config()
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use( express.static(  path.join(__dirname, 'public') ));


// 2- use middlewares


// 3- define routes
app.use( '/v1/api' , require(path.join(__dirname,'routes/api-routes') ) );
app.use( require(path.join(__dirname,'routes/web-routes') ) );






// 4- start the server
server.listen(port, function () {
  console.log( 'listening on http://127.0.0.1:' + port )
})







// 5- listine for socket connections

// users array 
var users = []
var ips = []

io.on('connection', function (socket) {
	checkIp(socket)

	socket.on('new user', function(nickName, callback) {
		checkUser(socket, nickName, callback)
	})



	// wait for a new msg
	socket.on('new msg', function(data) {
		// send new msgs to every one
		io.emit('update msgs', data);
	})


	// handle disconnects
	socket.on('disconnect', function(){
		// get user index in the array 
		var disconnectedUserIndex = users.indexOf(socket.nickName)		
		var disconnectedIpIndex = ips.indexOf( socket.handshake.address )		
		
		// remove user from the array
		users.splice(disconnectedUserIndex , 1)
		ips.splice(disconnectedIpIndex , 1)

		console.log('disconnected user')

		// send the new users list to every online
		io.emit('update online user', users);
	});
});




// makes sure that the user only connects once
function checkIp(socket) {
	var address = socket.handshake.address;
	
	if (ips.indexOf(address) != -1) {
		socket.disconnect()
	}
	else{
		ips.push(address)
	}
}


// makes sure every user has a unique nickName 
function checkUser(socket, nickName, callback) {
	if ( users.indexOf(nickName) == -1 ) {

		// add name to the socket object
		socket.nickName = nickName

		// add name to the array
		users.push(socket.nickName)
	
		// send users names to every one
		io.emit('update online user', users);

		callback(true)
	}else{
		callback(false)
	}

}
