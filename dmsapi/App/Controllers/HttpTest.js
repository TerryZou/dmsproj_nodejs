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

	postGetUser(req, res) {
		console.log("有人请求操作了")
		res.set("Access-Control-Allow-Origin", "*");
//
//		res.set("Access-Control-Allow-Headers", "X-Requested-With");
//		res.set("Access-Control-Allow-Methods", "POST");
//		res.set("X-Powered-By", ' 3.2.1')
		res.set("Content-Type", "application/json;charset=utf-8");
		return {
			username: 'posttest'
		};
	}
}