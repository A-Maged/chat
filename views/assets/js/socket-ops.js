
(function() {


	var socket;

	$('#setNick').on('click', function() {
		var nickName = $('#name').val()
		if (!socket) {
			var socket = io.connect('http://localhost:3000');
		}

		socket.emit('new user', nickName , function(isValid) {
			if (isValid) {
				// security is shitty here, because the user can show the chat himself
				$('#chat').show()
				socketUpdates(socket, nickName) 
			}
		})
	
	})



	// handels all socket events, emets and updates
	function socketUpdates(socket, nickName) {
	
		// handle online users updates
		socket.on('update online user' , function(users) {
			// empty online users list
			$('#onlineusers > li').remove()

			// add online users 
			for (var i = users.length - 1; i >= 0; i--) {
		   			$('#onlineusers').append($('<li>').text(users[i]));
			}
		})


		// update msgs list
		socket.on('update msgs', function (data) {
			$('#allmsgs').append($('<li>').text( 'name: ' + data.name + ' - ' + 'msg: '+ data.msg ));
		});


		// send new msg
		$('#send').on('click', function() {
			var msg = $('#msg').val()
			if (msg) {
				socket.emit('new msg', { name: nickName, msg: msg} )		
			}
		})


	}



})();

