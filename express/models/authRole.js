const Base = require('./base');

class AuthRole extends Base {
    constructor(props = 'auth_role'){
        super(props);
    }
}

module.exports = new AuthRole();