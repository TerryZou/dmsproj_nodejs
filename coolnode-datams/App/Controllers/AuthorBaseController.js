const BaseController = require("./BaseController");

module.exports = class Author extends BaseController {

	constructor(options = {}, req = null) {
		console.log("i am author");
		super(options, req);

		this.requireAuth = true;

		this.authorized = true;

		this.fallbackTo = "/Login/index?returnurl=" + req.url;
	}

}
