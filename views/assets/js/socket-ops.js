(function() {
	"use strict";

	var socket;
	var nickName;
	
	// initiate socket connection
	if (!socket) {
		  socket = io('http://localhost:3000');
	}


	// set nickName
	$('#setNick').on('click', function() {
		nickName = $('#name').val()
		
		socket.emit('new user', nickName , function(data){
			if (data.isValid) {
				// hide #initialConnection
				// show #chat
				$('#chat').show()
			}
			else{
				console.log(data.error)
			}
		})
	})// end of click


	$('#send').on('click', function() {
		var msg = $('#msg').val()

		if (msg) {
			socket.emit('new msg', {nickName: nickName, msg: msg})
		}

		$('#msg').val('')
	})



	socket.on('update online users', function(users) {
		$('#onlineusers > li').remove()

		for (var i = users.length - 1; i >= 0; i--) {
   			$('#onlineusers').append( $('<li>').text(users[i]) );		
		}
	})



	socket.on('update msgs', function(data) {
		$('#allmsgs').append( $('<li>').text(data.nickName + ' : ' + data.msg) );		
	})


	socket.on('bad', function(error) {
		console.log(error)
	})


})()