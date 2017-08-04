/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(3);

__webpack_require__(2);

__webpack_require__(0);

function handleEnter(e) {
	if (e.keyCode == 13 && !e.shiftKey) {
		e.preventDefault();
		console.log('sent');
	}
}

$('.menu-icon').on('click', function () {

	// if on mobile
	if (Modernizr.mq('(max-width: 776px)')) {
		$('aside').toggleClass('sm-toggle-menu');
	} else {
		$('aside').toggleClass('md-toggle-menu');
		$('.chat-box').toggleClass('full-width');
	}
});

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


(function () {

	var socket;
	var nickName;
	var $msgBox = $('.msg-box');
	var $allmsgs = $('.allmsgs');

	// initiate socket connection
	if (!socket) {
		socket = io('/');
	}

	function setNickName(e) {
		e.preventDefault();
		nickName = $('#name').val();

		socket.emit('new user', nickName, function (data) {
			if (data.isValid) {
				// hide #initialConnection
				$('#initialConnection').remove();

				// show #chat
				$('#chat').show();

				$('.chat-head .title').text(nickName);
			} else {
				console.log(data.error);
			}
		});
	}

	function sendMsg(e) {
		e.preventDefault();

		var msg = $msgBox.val();

		if (msg) {
			socket.emit('new msg', { nickName: nickName, msg: msg });
		}

		$msgBox.val('');
	}

	function handleEnter(e) {
		if (e.keyCode == 13 && !e.shiftKey) {
			e.preventDefault();

			console.log('sent');

			sendMsg(e);
		}
	}

	// set nickName
	$('#setNick').on('click', setNickName);

	$msgBox.on('keydown', handleEnter);

	socket.on('update online users', function (users) {

		// $('.online-users > ul > li').remove()
		$('.online-users').children().remove();

		for (var i = users.length - 1; i >= 0; i--) {
			// $('.online-users > ul').append( $('<li>').text(users[i]) );		
			$('.online-users').append($('<div class="user active-user active-conversation">').append($('<div class="content">').append($('<div class="name-date-block">').append($('<p class="name">').text(users[i]), $('<span class="date">').text(new Date().toLocaleTimeString('en-US', { hour: "numeric", minute: "numeric" }))))));
		}
	});

	socket.on('update msgs', function (data) {
		$allmsgs.append($('<li class="msg">').append($('<pre class="msg-data">').text(data.nickName + ' : ' + data.msg)));
	});

	socket.on('bad', function (error) {
		console.log(error);
	});
})();

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(1);
module.exports = __webpack_require__(0);


/***/ })
/******/ ]);