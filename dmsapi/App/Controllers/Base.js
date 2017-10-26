const HttpController = require("./HttpController");
const apisecurity = require("../../Utility/ApiSecurityUtil");
const sys_config = require("../../sys_config");

exports.author = (options, req,sender) => {
	
	//super(options, req);

	sender.requireAuth = true;

	sender.authorized = false;

	sender.fallbackTo = "/Login/index";
}


//请求第三方api方法
exports.checkApiSecurity = (params,code) => {
	var isok=apisecurity.checkApiCode(params,sys_config.dataapi.key,code);
	return isok;
}