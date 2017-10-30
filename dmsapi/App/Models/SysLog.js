const Model = require("./Model");

module.exports = class SysLog extends Model {
	constructor(data = {}) {
        super(data, {
            table: "SysLog",
            primary: "Id",
            fields: [ "Id",
            "Type",
            "RequestUrl",
            "RequestBody",
            "ApiUrl",
            "Message",
            "Detail",
            "SysUserId",
            "CreatedDate"],
            searchable: [ "Type" ]
        });
    }
};