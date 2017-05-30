
module.exports = {

	show : function(req, res) {
		res.json({ user: req.params.id });
	}


}



// var userController = {
// 	reflect : function(req, res) {
// 		res.json({ user: req.params.id });
// 	}
// }
// module.exports = userController;
