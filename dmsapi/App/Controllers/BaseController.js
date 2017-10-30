const HttpController = require("./HttpController");
const sys_config = require("../../sys_config");
const ApiResCodeDict = require("../../api_res_code_dict");
const apisecurity = require("../../Utility/ApiSecurityUtil");
const SysLog = require("../../Models/SysLog");

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

	async syslog(params, req) {
		var result = false;
		try {
			var data = await SysLog.use(req.db).insert(params);
			result = true;
		} catch(ex) {
			result = false;
		}
		return result;
	}
}