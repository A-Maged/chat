
// 0- dependencies
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser')
var dotenv = require('dotenv');
var app = express();

var server = require('http').Server(app);
var io = require('socket.io')(server);




// 1- configure app
var port =  process.env.PORT || 3000 ;
dotenv.config()
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use( express.static(  path.join(__dirname, 'public') ));


// 2- use generic middlewares


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
	// validate ip address
	var address = socket.handshake.address;	
	if (ips.indexOf(address) != -1) {
		socket.emit('bad', 'already connected with the same ip')
		socket.disconnect()
	}
	else{
		ips.push(address)
	}

	socket.on('new user', function(nickName, callback) {
		// validate nickName
		if ( users.indexOf(nickName) == -1 ) {
			socket.nickName =  nickName
			console.log( "new users: " + socket.nickName )
			users.push( socket.nickName )

			// update online users
			io.emit('update online users', users )

			callback ({ isValid: true })
		}
		else{
			callback({ isValid: false, error:'nickName is taken' })
		}
	})


	socket.on('new msg', function(data) {
		if (data.nickName && data.msg) {
			io.emit('update msgs', data)
		}
	})

	socket.on('disconnect', function() {
 		var nickNameIndex = users.indexOf( socket.nickName )	
		 users.splice(nickNameIndex, 1)	

 		var ipIndex = ips.indexOf( socket.handshake.address )
		 ips.splice(ipIndex, 1)	

		io.emit('update online users', users )
		console.log('disconnected: ' + socket.nickName)
	})

})
