const HttpController = require("./HttpController");
const base = require("./Base");
var request = require('request');

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
			result = await apiRequest(url);
			console.log(result);
		} catch(ex) {
			console.log(ex.message);
		}

		return result;
	}

	getGetUser1(req, res) {
		return {
			username: 'test'
		};
	}
}

function apiRequest(url) {
	return new Promise(function(resolve, reject) {
		request({
			url: url,
			method: "POST",
			json: true,
			headers: {
				"content-type": "application/json",
			},
			body: {
				username: 'test'
			}
		}, function(error, response, body) {
			console.log("&&&&&&&&&&&&&&&&&&&7");
			console.log(body);
			console.log(response.statusCode);
			
			console.log("&&&&&&&&&&&&&&&&&&&7");
			if(!error && response.statusCode == 200) {
				resolve(body);

			} else {
				resolve(error);
			}
		});
	});
}