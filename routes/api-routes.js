var express = require('express');
var path = require('path');
var router = express.Router();

// controllers
var userController = require('../controllers/userController') ;
var productController = require('../controllers/productController') ;


// routes
router.get('/users/:id', userController.show );
router.get('/products/:id', productController.show );



module.exports = router;