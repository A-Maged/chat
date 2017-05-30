var express = require('express');

var router = express.Router();


router.get('/', function (req, res) {	
	res.render('index');
});


// router.get('/', function (req, res) {	
// 	res.render('index' , { x : 5 } );
// });

// router.post('/login', function (req, res) {
//   res.redirect('/');
// })

module.exports = router;