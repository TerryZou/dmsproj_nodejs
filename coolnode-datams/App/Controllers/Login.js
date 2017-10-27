const BaseController = require("./BaseController");

/**
 * The Home controller is a special controller, it handles requests which 
 * visit the home page of the website through `GET /`.
 */
module.exports = class Login extends BaseController {
    /** GET / or GET /Home/ */
    index(req) {
        return this.view();
    }
    
    async postDoLogin(req) {
		var result = new Object();
		try {
			
			var name=req.body.name;
			var pwd=req.body.pwd;
			
			//验证参数是否合法
			
			var url = this.getApiUrl('SysUser','Login');
			
			var params={name:name,pwd:pwd};
			
			result = await this.apiRequest(url,params,req.body);
			
			console.log("result-----",result);
			
		} catch(ex) {
			console.log(ex.message);
		}

		return result;
	}
}