(function() {

	var socket;
	var nickName;
	var $msgBox = $('.msg-box')
	var $allmsgs = $('.allmsgs')



	// initiate socket connection
	if (!socket) {
		  socket = io('/');
	}





	function setNickName(e) {
		e.preventDefault();
		nickName = $('#name').val()
		
		socket.emit('new user', nickName , function(data){
			if (data.isValid) {
				// hide #initialConnection
				$('#initialConnection').remove()

				// show #chat
				$('#chat').show()
			}
			else{
				console.log(data.error)
			}
		})
	}




	function sendMsg(e) {
		e.preventDefault();
		
		var msg = $msgBox.val()

		if (msg) {
			socket.emit('new msg', {nickName: nickName, msg: msg})
		}

		$msgBox.val('')


	}


	function handleEnter(e){
		if (e.keyCode == 13 && !e.shiftKey){
			e.preventDefault()

			console.log('sent')

			sendMsg(e)
		}
	}



	// set nickName
	$('#setNick').on('click', setNickName )

	// send Msg
	// $('#send').on('click', sendMsg )


	$msgBox.on('keydown', handleEnter)



	// $msgBox.on('keyup', function(e) {
	//     if (e.keyCode == 13 && !e.shiftKey){
	// 		sendMsg(e)
	// 	}
	// })


	socket.on('update online users', function(users) {

		// $('.online-users > ul > li').remove()
		$('.online-users').children().remove()


		for (var i = users.length - 1; i >= 0; i--) {
   			// $('.online-users > ul').append( $('<li>').text(users[i]) );		
			$('.online-users').append(  


				$('<div class="user active-user active-conversation">').append(  

					$('<div class="content">').append(  

							$('<div class="name-date-block">').append(  
								$('<p class="name">').text(users[i]),
								$('<span class="date">').text( new Date().toLocaleTimeString('en-US', { hour: "numeric", minute: "numeric"}) ))						
							)

					)
				)
			

		}



	})





	socket.on('update msgs', function(data) {
		$allmsgs.append( $('<li>').append( $('<pre>').text(data.nickName + ' : ' + data.msg) ) );		
	})


	socket.on('bad', function(error) {
		console.log(error)
	})



}())