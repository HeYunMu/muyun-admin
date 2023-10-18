const configs = {
  mysql: {
    host: "localhost",
    port: "3306",
    user: "root",
    password: "", // 自己设置的密码
    database: "", // 数据库的名字
  },
  // 打印错误
  log: {
    error(message) {
      console.log("[knex error]", message);
    },
  },
  jwt: {
    secretKey: "asdfapfaiwhretuiqwrohtgoawsudreitrgirwqyu",
    expiresIn: 60 * 60 * 24,
    iss: "heyunmu.com",
  },
};

module.exports = configs;
