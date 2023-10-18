// 引用配置文件
const configs = require("../config");
const humps = require("humps");
// 把配置文件中的信息，设置在初始化配置中
module.exports = require("knex")({
  client: "mysql",
  connection: {
    host: configs.mysql.host,
    port: configs.mysql.port,
    user: configs.mysql.user,
    password: configs.mysql.password,
    database: configs.mysql.database,
  },
  wrapIdentifier: (value, origImpl, queryContext) =>
    origImpl(humps.decamelize(value)),
  postProcessResponse: (result, queryContext) => {
    if (result.rows) {
      return humps.camelizeKeys(result);
    }
    return humps.camelizeKeys(result);
  },
  // debug: true,
  // 打印错误
  log: {
    error(message) {
      console.log("[knex error]", message);
    },
    warn(message) {
      console.log("[knex warn]", message);
    },
    deprecate(message) {
      console.log("[knex deprecate]", message);
    },
    debug(message) {
      console.log("[knex debug]", message);
    },
  },
});
