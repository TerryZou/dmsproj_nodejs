const HttpController = require("./HttpController");
const request = require('request');
const sys_config = require("../../sys_config");
const apisecurity = require("../../Utility/ApiSecurityUtil");

exports.getApiUrl=(name,method)=>{
	var api=sys_config.dataapi
	var apiurl=api.url+":"+api.port;
	var apiname='';
	var action='';
	for(var n in api.apis)
	{
		var p=api.apis[n];
		if(p.name==name){
			
			apiurl+=p.url;
			apiname=p.url;
			for(var m in p.methods)
			{
				var meth=p.methods[m];
				if(meth.method==method){
					apiurl+=meth.action;
					action=meth.action;
					break;
				}
			}
			break;
		}
	}
	
	if(apiname==''||action==''){
		throw {message:"apiname 或者 action 名字不正确，请检查！"};
	}
	
	return apiurl;
}



exports.author = (options, req, sender) => {

	//super(options, req);

	sender.requireAuth = true;

	sender.authorized = false;

	sender.fallbackTo = "/Login/index";
}

//请求第三方api方法
exports.apiRequest = (url, requestData) => {
	var code=apisecurity.getApiCode(requestData,sys_config.dataapi.key);
	requestData.key=sys_config.dataapi.key;
	requestData.code=code;
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
				resolve("requst faild, check api url or check server code");
			}
		});
	});
}