const boom = require("boom");
const asyncFun = fn => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(err => {
        if (!err.isBoom) {
            return next(boom.badImplementation(err));
        }
        next(err);
    });
};

module.exports = {
    asyncFun
}