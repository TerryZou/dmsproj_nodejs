const HttpController = require("../HttpController");
const base = require("../Base");
const SysUser = require("../../Models/SysUser");
const toolutil = require("../../../Utility/ToolUtil");

module.exports = class extends HttpController {

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
		var result= await SysUser.use(req.db).insert(user);
		//req.db.close();

		res.set("Access-Control-Allow-Origin", "*");
		return result;
	}
	
	async postGetById(req, res) {
		var id=req.body.id;
		var result= await SysUser.use(req.db).get(id);
		//req.db.close();
		res.set("Access-Control-Allow-Origin", "*");
		console.log(result);
		return result;
	}
}