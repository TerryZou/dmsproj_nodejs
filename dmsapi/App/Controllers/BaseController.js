const HttpController = require("./HttpController");
const sys_config = require("../../sys_config");
const ApiResCodeDict = require("../../api_res_code_dict");
const apisecurity = require("../../Utility/ApiSecurityUtil");
const SysLog = require("../Models/SysLog");
const ToolUtil = require("../../Utility/ToolUtil");

module.exports = class Base extends HttpController {

	getApiResCode(name) {

		var apicode = null;

		name = name.toLowerCase();

		switch(name) {
			case "sysuser":
				apicode = ApiResCodeDict.SysUser.Apis;
				break;
			case "syslog":
				apicode = ApiResCodeDict.SysLog.Apis;
				break;
		}
		return apicode;
	}

	checkApiSecurity(params, code) {
		var isok = apisecurity.checkApiCode(params, sys_config.dataapi.key, code);
		return isok;
	}

	async apiLog(req, resCode) {
		console.log("记录用户操作日志")
		var params = {
			Type: 0,
			RequestUrl: req.body.reqUrl,
			RequestBody: req.body.reqBody,
			ApiUrl: req.url,
			Message: '',
			Detail: JSON.stringify(resCode),
			SysUserId: req.body.sysUserId,
			CreatedDate: ToolUtil.getNowDate()
		}
		console.log(params);
	 	this.sysLog(params,req);
	}

	async sysLog(params, req) {
		var result = false;
		try {
			var data = await SysLog.use(req.db).insert(params);
			result = true;
		} catch(ex) {
			this.logger.log("*****************************************************");
			this.logger.log("日志写入数据库报错");
			this.logger.log("reqUrl:" + req.url);
			this.logger.log("-----------------------------------------------------");
			this.logger.log("日志内容:");
			this.logger.log(params);
			this.logger.log("-----------------------------------------------------");
			this.logger.log(ex.message);
			this.logger.log(ex.stack);
			this.logger.log("*****************************************************");
			result = false;
		}
		return result;
	}

	coolLog(req, ex) {
		this.logger.log("*****************************************************");
		this.logger.log("reqUrl:" + req.url);
		this.logger.log("-----------------------------------------------------");
		this.logger.log("reqBody:");
		this.logger.log(req.body);
		this.logger.log("-----------------------------------------------------");
		this.logger.log(ex.message);
		this.logger.log(ex.stack);
		this.logger.log("*****************************************************");

		var params = {
			Type: 2,
			RequestUrl: req.body.reqUrl,
			RequestBody: JSON.stringify(req.body.reqBody),
			ApiUrl: req.url,
			Detail: ex.stack,
			Message: ex.message,
			SysUserId: req.body.sysUserId,
			CreatedDate: ToolUtil.getNowDate()
		}
		this.sysLog(params, req);
	}
}