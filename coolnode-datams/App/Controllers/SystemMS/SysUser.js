const AuthorBaseController = require("../AuthorBaseController");


/**
 * The Home controller is a special controller, it handles requests which 
 * visit the home page of the website through `GET /`.
 */
module.exports = class SysUser extends AuthorBaseController {
	/** GET / or GET /Home/ */
//	constructor(options = {}, req = null) {
//		super(options, req);
//		base.author(options, req, this);
//	}

	// actions
	index(req) {
		return this.view();
	}

	getEdit(req) {
		return this.view();
	}

	getInfo(req) {
		return this.view();
	}

	// doactions

    async postGetList(req) {
		var result = new Object();
		try {
			var url = this.getApiUrl('SysUser','Login');
			var params={name:req.body.name,age:20,add:"add"};
			
			result = await this.apiRequest(url,params);
		} catch(ex) {
			console.log(ex.message);
		}

		return result;
	}

}