(function() {
	"use strict";

	var socket;
	var nickName;
	var $msg = $('.msg')
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
		
		var msg = $msg.val()

		if (msg) {
			socket.emit('new msg', {nickName: nickName, msg: msg})
			console.log(msg)
		}

		$msg.val('')

		
		if ( $allmsgs.children().length > 1 ) {
			$allmsgs.animate({
	    	    scrollTop: $allmsgs.children().last().offset().top
		    }, 300);
		}
	

	}


	// set nickName
	$('#setNick').on('click', setNickName )

	// send Msg
	$('#send').on('click', sendMsg )

	$msg.on('keyup', function(e) {
	    if (e.keyCode == 13 && !e.shiftKey){
			sendMsg(e)
		}
	})



	socket.on('update online users', function(users) {
		$('.onlineusers > ul > li').remove()

		for (var i = users.length - 1; i >= 0; i--) {
   			$('.onlineusers > ul').append( $('<li>').text(users[i]) );		
		}
	})



	socket.on('update msgs', function(data) {
		$allmsgs.append( $('<li>').append( $('<pre>').text(data.nickName + ' : ' + data.msg) ) );		
	})


	socket.on('bad', function(error) {
		console.log(error)
	})


})()