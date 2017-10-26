const HttpController = require("./HttpController");

exports.author = (options, req,sender) => {
	
	//super(options, req);

	sender.requireAuth = true;

	sender.authorized = false;

	sender.fallbackTo = "/Login/index";
}