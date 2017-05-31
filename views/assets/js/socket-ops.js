
(function() {


	var socket;

	$('#setNick').on('click', function() {
		var nickName = $('#name').val()
		if (!socket) {
			var socket = io.connect('http://localhost:3000');
		}

		socket.emit('new user', nickName , function(isValid) {
			if (isValid) {
	   			$('#onlineusers').append($('<li>').text(nickName));
				$('#chat').show()
				$('#initialConnection').hide()
				socketUpdates(socket, nickName) 
			}
		})
	
	})



	// handels all socket events, emets and updates
	function socketUpdates(socket, nickName) {
	
		// handle online users updates
		socket.on('update online user' , function(users) {
			// empty online users list
			// $('#onlineusers > li').remove()

   			console.log(users)
			// add online users 
			// for (var i = users.length - 1; i >= 0; i--) {
		   			// $('#onlineusers').append($('<li>').text(users[i]));
			// }
		})


		// update msgs list
		socket.on('update msgs', function (data) {
			$('#allmsgs').append($('<li>').text( data.name + ':  ' + data.msg ));

		});


		// send new msg
		$('#send').on('click', function() {
			var $msg = $('#msg')
			if ($msg.val()) {
				socket.emit('new msg', { name: nickName, msg: $msg.val()} )		
				$msg.val('')
			}
		})


	}



})();

