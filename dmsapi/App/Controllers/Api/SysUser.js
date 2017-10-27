const BaseController = require("../BaseController");
const SysUser = require("../../Models/SysUser");
const toolutil = require("../../../Utility/ToolUtil");

module.exports = class extends BaseController {

	async postAdd(req, res) {

		var now = toolutil.getNowDate();
		var user = {
			Name: req.body.name,
			Password: req.body.password,
			Email: req.body.email,
			Status: 1,
			IsDeleted: 0,
			CreatedDate: now,
			CreatedBy: 1,
			UpdatedDate: now,
			UpdatedBy: 1
		};
		var result = await SysUser.use(req.db).insert(user);
		//req.db.close();

		res.set("Access-Control-Allow-Origin", "*");
		return result;
	}

	async postGetByLogin(req, res) {

		var name = req.body.name;
		var pwd = req.body.pwd;
		console.log("有人请求操作了")
		var requestData = {
			name: name,
			pwd: pwd
		};
		var key = req.body.key;
		var code = req.body.code;

		var isok = this.checkApiSecurity(requestData, code);
		var result
		if(isok) {
			console.log("请求数据");
			console.log(requestData);
			try {
				result = await SysUser.use(req.db).where("Name", "=", name).where("Password", "=", pwd).get();
				console.log("***********");
				console.log(result);
				console.log("***********");
			} catch(ex) {
				console.log(ex);
			}
		} else {
			result = {
				message: "无权访问接口"
			};
		}
		//req.db.close();
		res.set("Access-Control-Allow-Origin", "*");

		return result;
	}

	async postGetById(req, res) {
		var id = req.body.id;
		var result = await SysUser.use(req.db).get(id);
		//req.db.close();
		res.set("Access-Control-Allow-Origin", "*");
		console.log(result);
		return result;
	}
}