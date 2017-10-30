const AuthorBaseController = require("../AuthorBaseController");

/**
 * The Home controller is a special controller, it handles requests which 
 * visit the home page of the website through `GET /`.
 */
module.exports = class DataQuery extends AuthorBaseController {
	
	
    /** GET / or GET /Home/ */
    index(req) {
        return this.view();
    }
    
    getDeviceActUser(req){
    		return this.view();
    }
}