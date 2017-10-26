const HttpController = require("../HttpController");
const base = require("../Base");


/**
 * The Home controller is a special controller, it handles requests which 
 * visit the home page of the website through `GET /`.
 */
module.exports = class Home extends HttpController {
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
			var url = base.getApiUrl('HttpTest','GetUser');
			var params={name:req.body.name,age:20,add:"add"};
			
			result = await base.apiRequest(url,params);
		} catch(ex) {
			console.log(ex.message);
		}

		return result;
	}

}