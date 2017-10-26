const HttpController = require("./HttpController");

/**
 * The Home controller is a special controller, it handles requests which 
 * visit the home page of the website through `GET /`.
 */
module.exports = class Home extends HttpController {
	
	constructor(options = {}, req = null){
        super(options, req);

        this.requireAuth = true;

        this.authorized = false;

        this.fallbackTo = "/Login/index";
    }
	
    /** GET / or GET /Home/ */
    index(req) {
        return this.view();
    }
    
    getDeviceActUser(req){
    		return this.view();
    }
}