const BaseController = require("../BaseController");
const SysLog = require("../../Models/SysLog");
const toolutil = require("../../../Utility/ToolUtil");

module.exports = class extends BaseController {

	async postReqLog(req, res) {
		var ApiCode = this.getApiResCode("SysLog");

		var apicodes = ApiCode.ReqLog.codes;

		var result = ApiCode.ReqLog.result;

		result.res = await this.reqlog(req, res, apicodes, 0);
		return result;
	}

	async postErrorLog(req, res) {

		var ApiCode = this.getApiResCode("SysLog");

		var apicodes = ApiCode.ErrorLog.codes;

		var result = ApiCode.ErrorLog.result;
		
		result.res = await this.reqlog(req, res, apicodes, 2);
		return result;

	}

	async reqlog(req, res, apicodes, type) {
		var result = apicodes.syserror;
		try {

			var reqUrl = req.body.reqUrl;
			var reqBody = req.body.reqBody;
			var apiUrl = req.body.apiUrl;
			var detail = req.body.detail;
			var sysUserId = req.body.sysUserId;

			//验证参数

			var requestData = {
				reqUrl: reqUrl,
				reqBody: reqBody,
				apiUrl: apiUrl,
				detail: detail,
				sysUserId: sysUserId
			};
			var key = req.body.key;
			var code = req.body.code;

			var isok = this.checkApiSecurity(requestData, code);
			if(!isok) {
				result = apicodes.noauthor;
			} else {
				try {
					var data = await this.syslog({
						Type: type,
						RequestUrl: reqUrl,
						RequestBody: reqBody,
						ApiUrl: apiUrl,
						Detail: detail,
						SysUserId: sysUserId,
						CreatedDate: toolutil.getNowDate()
					}, req);
					if(data) {
						result = apicodes.success;
					} else {
						result = apicodes.syserror;
					}

				} catch(ex) {
					result = apicodes.syserror;
				}
			}

		} catch(ex) {
			result = apicodes.syserror;
		}
		return result;
	}
}