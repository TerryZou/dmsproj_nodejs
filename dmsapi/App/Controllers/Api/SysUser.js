const BaseController = require("../BaseController");
const SysUser = require("../../Models/SysUser");
const toolutil = require("../../../Utility/ToolUtil");

module.exports = class extends BaseController {

	async postGetByLogin(req, res) {
		try {
			var SysUserApiCode = this.getApiResCode("SysUser");

			var apicodes = SysUserApiCode.GetByLogin.codes;

			var result = SysUserApiCode.GetByLogin.result;

			var name = req.body.name;
			var password = req.body.password;

			//验证参数

			var requestData = {
				name: name,
				password: password
			};
			var key = req.body.key;
			var code = req.body.code;

			var isok = this.checkApiSecurity(requestData, code);
			if(!isok) {
				result.res = apicodes.noauthor;
			} else {
				try {
					var data = await SysUser.use(req.db).where("Name", "=", name).where("Password", "=", password).get();
					result.data = data;
					result.res = apicodes.success;
				} catch(ex) {
					this.coolLog(req,ex);
					result.res = apicodes.syserror;
				}
			}

		} catch(ex) {
			this.coolLog(req,ex);
			result.res = apicodes.syserror;
		}
		res.set("Access-Control-Allow-Origin", "*");
		this.apiLog(req,result.res);
		return result;
	}
}