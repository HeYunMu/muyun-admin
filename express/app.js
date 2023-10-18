const express = require("express");
const cors = require("cors");
const logger = require("./logger");
const Result = require("./utils/result");
const { CODE_FILED } = require("./utils/constent");
const jwtAuth = require("./middleware/token");
const glob = require('glob');
require("express-async-errors");

const app = express();
const port = 3000;

app.use(cors());

var bodyParser = require("body-parser");
const auth = require("./middleware/auth");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// jwt验证
app.use(jwtAuth);
app.use(auth());

// 加载路由模块
glob.sync('./apps/**/*.api.js').forEach(file => {
  logger.info("load api : " + file)
  const instance = require(`./${file}`);
  app.use("/", instance);
});

process.on("uncaughtException", (err) => {
  console.log("uncaught exception", err);
});

app.use((err, req, res, next) => {
  // console.log(req);
  logger.error(`${req.method} ${req.url} ===> ` + err.message);
  const message = err.sqlMessage || err.message;
  new Result(null, message, CODE_FILED).fail(res);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
