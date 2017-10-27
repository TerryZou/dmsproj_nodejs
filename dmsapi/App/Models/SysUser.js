const Model = require("./Model");

module.exports = class SysUser extends Model {
	constructor(data = {}) {
        super(data, {
            table: "SysUser",
            primary: "Id",
            fields: [ "Id",
            "Name",
            "Password",
            "Email",
            "Status",
            "IsDeleted",
            "CreatedDate",
            "CreatedBy",
            "UpdatedDate",
            "UpdatedBy"],
            searchable: [ "Name" ]
        });
    }
};