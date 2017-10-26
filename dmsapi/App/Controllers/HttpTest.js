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
		var name = req.body.name;
		console.log("有人请求操作了")
		var requestData = {
			name: req.body.name,
			age: req.body.age,
			add: req.body.add
		};
		var key = req.body.key;
		var code = req.body.code;

		var isok = base.checkApiSecurity(requestData, code);
		var result = new Object();
		if(isok) {
			result = {
				username: 'posttest' + name
			};
		} else {
			result = {
				message: "api no security"
			}
		}

		res.set("Access-Control-Allow-Origin", "*");
		//
		//		res.set("Access-Control-Allow-Headers", "X-Requested-With");
		//		res.set("Access-Control-Allow-Methods", "POST");
		//		res.set("X-Powered-By", ' 3.2.1')
		//res.set("Content-Type", "application/json;charset=utf-8");
		return result;
	}
}