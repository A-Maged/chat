"use strict";

require('../sass/style.sass');

import './socket-ops.js';
import './socket-events.js';




function handleEnter(e){
	if (e.keyCode == 13 && !e.shiftKey){
		e.preventDefault()
		console.log('sent')
	}
}




$('.menu-icon').on('click', function() {

	// if on mobile
	if (Modernizr.mq('(max-width: 776px)')) {
		$('aside').toggleClass('sm-toggle-menu')
	}
	else{
		$('aside').toggleClass('md-toggle-menu')
		$('.chat-box').toggleClass('full-width')
	}

})

