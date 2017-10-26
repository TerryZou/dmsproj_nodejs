const HttpController = require("./HttpController");
const request = require('request');

exports.author = (options, req, sender) => {

	//super(options, req);

	sender.requireAuth = true;

	sender.authorized = false;

	sender.fallbackTo = "/Login/index";
}

//请求第三方api方法
exports.apiRequest = (url, requestData) => {
	return new Promise(function(resolve, reject) {
		request({
			url: url,
			method: "POST",
			json: true,
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Content-Type': 'application/json',
				'Accept-Encoding': '*'
			},
			body: requestData
		}, function(error, response, body) {
			if(!error && response.statusCode == 200) {
				resolve(body);

			} else {
				resolve(error);
			}
		});
	});
}