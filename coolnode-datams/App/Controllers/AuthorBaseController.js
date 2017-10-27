const BaseController = require("./BaseController");

module.exports = class Author extends BaseController {

	constructor(options = {}, req = null) {
		console.log("i am author");
		super(options, req);

		this.requireAuth = true;

		this.authorized = false;
		

		//验证session


		this.fallbackTo = "/Login/index?returnurl=" + req.url;
	}

}
