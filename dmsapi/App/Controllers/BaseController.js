const HttpController = require("./HttpController");
const sys_config = require("../../sys_config");
const ApiResCodeDict = require("../../api_res_code_dict");
const apisecurity = require("../../Utility/ApiSecurityUtil");

module.exports = class Base extends HttpController {

	getApiResCode(name) {
		
		var apicode = null;

		name = name.toLowerCase();

		switch(name) {
			case "sysuser":
				apicode = ApiResCodeDict.SysUser.Apis;
				break;
		}
		return apicode;
	}

	checkApiSecurity(params, code) {
		var isok = apisecurity.checkApiCode(params, sys_config.dataapi.key, code);
		return isok;
	}
}