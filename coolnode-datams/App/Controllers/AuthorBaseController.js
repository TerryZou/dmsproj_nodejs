const BaseController = require("./BaseController");

module.exports = class Author extends BaseController {

	constructor(options = {}, req = null,res=null) {
		console.log("i am author");
		super(options, req,res);

		this.requireAuth = true;

		this.authorized = false;

		this.fallbackTo = "/Login/index?returnurl=" + req.url;

		//验证session
		if(req.session.username!=null){
			this.authorized = true;
		}

		
	}

}
