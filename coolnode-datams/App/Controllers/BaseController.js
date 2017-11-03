const HttpController = require("./HttpController");
const request = require('request');
const sys_config = require("../../sys_config");
const apisecurity = require("../../Utility/ApiSecurityUtil");

module.exports = class Base extends HttpController {

	
	
	
	//获取api地址
	getApiUrl(name, method){
		var ip='http://172.29.0.98';//api.url
		var api = sys_config.dataapi;
		var apiurl = ip + ":" + api.port;
		var apiname = '';
		var action = '';
		for(var n in api.apis) {
			var p = api.apis[n];
			if(p.name == name) {

				apiurl += p.url;
				apiname = p.url;
				for(var m in p.methods) {
					var meth = p.methods[m];
					if(meth.method == method) {
						apiurl += meth.action;
						action = meth.action;
						break;
					}
				}
				break;
			}
		}

		if(apiname == '' || action == '') {
			throw {
				message: "apiname 或者 action 名字不正确，请检查！"
			};
		}
		return apiurl;
	}

	//请求第三方api方法
	apiRequest (url, requestData,req) {
		var code = apisecurity.getApiCode(requestData, sys_config.dataapi.key);
		requestData.reqBody = JSON.stringify(req.body);
		requestData.reqUrl = req.url;
		if(req.session.sysUserId != null){
			requestData.sysUserId = req.session.sysUserId;
		}else{
			requestData.sysUserId = 0;
		}
		requestData.key = sys_config.dataapi.key;
		requestData.code = code;
		
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
					resolve("requst failed, check api url or check server code");
				}
			});
		});
	}

	async coolLog(req,ex,apiUrl){

		var apiUrl = this.getApiUrl('SysLog','ErrorLog');

		var sysUserId = 0;
		if(req.session.sysUserId != null){
			sysUserId = req.session.sysUserId;
		}
		
		var params={
			reqUrl: req.url, //用户请求客户端路径
			reqBody: JSON.stringify(req.body), //用户请求的参数
			apiUrl: apiUrl, //该操作对应的api接口
			detail: ex.stack, //错误详细信息
			message: ex.message,//错误信息
			sysUserId: sysUserId //操作用户id
		};

		//写入数据库日志
		var apiResult = await this.apiRequest(apiUrl,params,req);
		
		//写入本地日志
		this.logger.log("*****************************************************");
		this.logger.log("reqUrl:"+req.url);
		this.logger.log("-----------------------------------------------------");
		this.logger.log("reqBody:");
		this.logger.log(req.body);
		this.logger.log("-----------------------------------------------------");
		this.logger.log("ex.message:");
		this.logger.log(ex.message);
		this.logger.log("ex.stack:");
		this.logger.log(ex.stack);
		this.logger.log("-----------------------------------------------------");
		this.logger.log("apiResult:");
		this.logger.log(apiResult);
		this.logger.log("*****************************************************");
		

	}
}
