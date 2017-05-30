
module.exports = {

	show : function(req, res) {
		res.json({ product: req.params.id });
	}


}
