const BaseController = require("./BaseController");
const toolUtil = require("../../Utility/ToolUtil");

/**
 * The Home controller is a special controller, it handles requests which 
 * visit the home page of the website through `GET /`.
 */
var crypto = require('crypto');
// var md5 = function(data) {
// 	var Buffer = require("buffer").Buffer;
// 	var buf = new Buffer(data);
// 	var str = buf.toString("binary");
// 	var crypto = require("crypto");
// 	return crypto.createHash("md5WithRSAEncryption").update(str).digest("hex");
// }

module.exports = class Login extends BaseController {
    /** GET / or GET /Home/ */
    index(req) {
        return this.view();
    }
    
    async postDoLogin(req) {
		var result = new Object();
		var apiUrl = this.getApiUrl('SysUser','Login');
		try {
			
			var name=req.body.name;
			var pwd=req.body.pwd;
			
			//验证参数是否合法
			
			pwd = toolUtil.md5(pwd);
			var params={name:name,password:pwd};
			
			result = await this.apiRequest(apiUrl,params,req);
			// result.success = true;
			console.log('result---',result);
			if(result.res.success){
				result.success = true;
				req.session.username = name;
				req.session.sysUserId = result.data.Id;
			}
			
		} catch(ex) {
			await this.coolLog(req,ex,apiUrl);
		}

		return result;
	}
	async postLogout_User(req) {
		var result = new Object();
		try {
			req.session.username = null;
			result.success = true;

		} catch(ex) {
			console.log(ex.message);
		}

		return result;
	}
}