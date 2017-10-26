const HttpController = require("./HttpController");
const base = require("./Base");

module.exports = class extends HttpController {
	//	constructor(options = {}, req = null){
	//		super(options, req);
	//		base.author(options,req,this);
	//    
	////
	////      this.requireAuth = true;
	////
	////      this.authorized = false;
	////
	////      this.fallbackTo = "/Login/index";
	//  }

	index(req) {
		return this.view({
			title: "Cool-Node"
		});
	}

	async postGetUser(req, res) {
		console.log("postGetUser");
		var result = new Object();
		try {
			var url = "http://127.0.0.1:8086/HttpTest/GetUser";
			//console.log(req.body);
			result = await base.apiRequest(url,{name:req.body.name});
			console.log(result);
		} catch(ex) {
			console.log(ex.message);
		}

		return result;
		//		return {
		//			"username": "test12344"
		//		};
	}
}