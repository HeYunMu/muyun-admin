const knex = require("../models/knex");
const md5 = require("md5");
const authUser = require("../models/authUser");
module.exports = function (options) {
  return async function (req, res, next) {
    // logger.info(req.auth.id);
    if ((req.auth?.id ?? "") !== "") {
      const user = await authUser.getOne((table) =>
        knex(table).where({
          id: req.auth.id,
        })
      );
      req.auth = Object.assign(req.auth, user);
      req.auth.head = `https://cravatar.cn/avatar/${md5(req.auth.email || "")}`;
      delete req.auth.password;
    }
    next();
  };
};
