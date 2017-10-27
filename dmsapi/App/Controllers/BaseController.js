const HttpController = require("./HttpController");
const sys_config = require("../../sys_config");
const apisecurity = require("../../Utility/ApiSecurityUtil");

module.exports = class Base extends HttpController {
	checkApiSecurity(params, code) {
		var isok = apisecurity.checkApiCode(params, sys_config.dataapi.key, code);
		return isok;
	}
}