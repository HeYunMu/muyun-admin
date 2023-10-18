const Base = require('./base');

class AuthUser extends Base {
    constructor(props = 'auth_user'){
        super(props);
    }
}

module.exports = new AuthUser();