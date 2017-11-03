const AuthorBaseController = require("../AuthorBaseController");


/**
 * The Home controller is a special controller, it handles requests which 
 * visit the home page of the website through `GET /`.
 */
module.exports = class SysLog extends AuthorBaseController {
	/** GET / or GET /Home/ */
//	constructor(options = {}, req = null) {
//		super(options, req);
//		base.author(options, req, this);
//	}

		//假数据



	// actions
	index(req) {
		return this.view();
	}

	getEdit(req) {
		return this.view();
	}

	getInfo(req) {
		return this.view();
	}

	// doactions

    async postGetList(req) {
		var apiUrl = this.getApiUrl('SysLog','GetReqLog');
		try {
			var result = new Object();
			
			var params={
					type: req.body.type, // 0 用户操作  1 系统操作  2 异常
					beginDate: req.body.beginDate,
					endDate: req.body.endDate,
					page: req.body.page,
					pageSize: req.body.pageSize, //
					orderBy: req.body.orderBy, // Id,Type,CreatedDate
					sort: 'asc', //asc   desc
					// reqUrl: req.url, //用户请求客户端路径
					// reqBody: req.body, //用户请求的参数
					sysUserId: req.session.sysUserId //操作用户id
				};
			console.log('params---',params);
			result = await this.apiRequest(apiUrl,params,req);

			console.log('result---',result.data.data);
		
			var newresult = {};
			newresult.code=0;
			newresult.msg="成功";
			// newresult.count=result.data.total; //真实的
			newresult.count=result.data.data.length;

			newresult.data=result.data.data;
			newresult.data.total = newresult.data.length;
			

			return newresult;

		} catch(ex) {
			// console.log('ex.message------',ex.message);
			// console.log('ex.stack',ex.stack);
			await this.coolLog(req,ex,apiUrl);
		}

		return result;
	}

}