class RoutesController {
	constructor () {}

	homeController (req, res) {
		res.render('index');
	}

	registerController (req, res) {
		console.log(req.body);
		res.send('已接收');
	}
}

module.exports = new RoutesController();