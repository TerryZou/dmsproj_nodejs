const BaseController = require("../BaseController");
const SysLog = require("../../Models/SysLog");
const toolutil = require("../../../Utility/ToolUtil");

module.exports = class extends BaseController {
	//用户操作日志
	async postReqLog(req, res) {
		var ApiCode = this.getApiResCode("SysLog");

		var apicodes = ApiCode.ReqLog.codes;

		var result = ApiCode.ReqLog.result;

		result.res = await this.reqLog(req, res, apicodes, 0);

		return result;
	}
	//错误日志
	async postErrorLog(req, res) {
		var result = null;

		var ApiCode = this.getApiResCode("SysLog");

		var apicodes = ApiCode.ErrorLog.codes;

		result = ApiCode.ErrorLog.result;

		result.res = await this.reqLog(req, res, apicodes, 2);

		return result;

	}

	//获取日志列表
	async postGetReqLog(req, res) {
		try {
			var ApiCode = this.getApiResCode("SysLog");

			var apicodes = ApiCode.GetReqLog.codes;

			var result = ApiCode.GetReqLog.result;

			var type = req.body.type;
			var sysUserId = req.body.sysUserId;
			var beginDate = req.body.beginDate;
			var endDate = req.body.endDate;
			var page = req.body.page;
			var pageSize = req.body.pageSize;
			var orderBy = req.body.orderBy;
			var sort = req.body.sort;

			//验证参数

			var requestData = {
				type: type,
				sysUserId: sysUserId,
				beginDate: beginDate,
				endDate: endDate,
				page: page,
				pageSize: pageSize,
				orderBy: orderBy,
				sort: sort
			};
			var key = req.body.key;
			var code = req.body.code;

			var isok = this.checkApiSecurity(requestData, code);
			if(!isok) {
				result.res = apicodes.noauthor;
			} else {
				try {
					var args = {
						page: 1,
						limit: 20
					}
					//当前页
					if(page != undefined && page != "" && page != null) {
						args.page = page;
					}
					//每页上限
					if(pageSize != undefined && pageSize != "" && pageSize != null) {
						args.limit = pageSize;
					}
					//排序
					if(orderBy != undefined && orderBy != "" && orderBy != null) {
						args.orderBy = orderBy;
					} else {
						args.orderBy = 'CreatedDate';
					}
					//排序方式
					if(sort == "asc" || sort == "desc") {
						args.sequence = sort;
					} else {
						args.sequence = 'desc';
					}
					//日志类型
					if(type != undefined && type != "" && type != null) {
						args.Type = type;
					}
					//系统管理员
					if(sysUserId != undefined && sysUserId != "" && sysUserId != null) {
						args.SysUserId = sysUserId;
					}
					//时间段
					if(beginDate != undefined && beginDate != "" && beginDate != null) {
						args.CreatedDate = '>=' + beginDate;
					}
					//时间段
					if(endDate != undefined && endDate != "" && endDate != null) {
						args.CreatedDate = '<=' + endDate;
					}

					var data = await SysLog.use(req.db).getMany(args);
					result.data = {
						pagecount: data.pages,
						data: data.data,
						total: data.total
					}
					result.res = apicodes.success;
				} catch(ex) {
					result.res = apicodes.syserror;
				}
			}
			
		} catch(ex) {
			this.coolLog(req, ex);
			result.res = apicodes.syserror;
		}
		res.set("Access-Control-Allow-Origin", "*");
		this.apiLog(req,result.res);
		return result;
	}

	async reqLog(req, res, apicodes, type) {
		var result = apicodes.syserror;
		try {

			var reqUrl = req.body.reqUrl;
			var reqBody = req.body.reqBody;
			var apiUrl = req.body.apiUrl;
			var detail = req.body.detail;
			var message = req.body.message;
			var sysUserId = req.body.sysUserId;

			//验证参数

			var requestData = {
				reqUrl: reqUrl,
				reqBody: reqBody,
				apiUrl: apiUrl,
				detail: detail,
				message: message,
				sysUserId: sysUserId
			};
			var key = req.body.key;
			var code = req.body.code;
			var isok = this.checkApiSecurity(requestData, code);
			if(!isok) {
				result = apicodes.noauthor;
			} else {
				try {
					var data = await this.sysLog({
						Type: type,
						RequestUrl: reqUrl,
						RequestBody: reqBody,
						ApiUrl: apiUrl,
						Message: message,
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
					this.coolLog(req, ex);
					result = apicodes.syserror;
				}
			}

		} catch(ex) {
			this.coolLog(req, ex);
			result = apicodes.syserror;
		}
		return result;
	}
}