const { expressjwt } = require("express-jwt");
const { jwt } = require("../config");

// express-jwt中间件帮我们自动做了token的验证以及错误处理，所以一般情况下我们按照格式书写就没问题，其中unless放的就是你想要不检验token的api。
const jwtAuth = expressjwt({
  secret: jwt.secretKey,
  algorithms: ["HS256"],
}).unless({ path: ["/admin/login"] });

module.exports = jwtAuth;
