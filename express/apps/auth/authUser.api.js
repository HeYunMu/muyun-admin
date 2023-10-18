var express = require('express');
const Result = require("../../utils/result");
const {asyncFun} = require("../../middleware/async");
const AuthUserService = require('./authUser.service');
var router = express.Router();


// 账号登录
router.post('/admin/login',  asyncFun(async function(req, res, next) {
    let userData = await AuthUserService.loginUser(req.body)
    new Result(userData,'登录成功').success(res);
}));

// 账号是否登录
router.get('/admin/islogin',  asyncFun(async function(req, res, next) {
    new Result(req.auth,'登录成功').success(res);
}));


/* 获取用户列表 */
router.get('/admin/auth/users',  asyncFun(async function(req, res, next) {
    let userData = await AuthUserService.listUser(req.query)
    new Result(userData,'用户获取成功').success(res);
}));


/* 添加一个用户 */
router.post('/admin/auth/user',  asyncFun(async function(req, res, next) {
    let userData = await AuthUserService.createUser(req.body)
    new Result(userData,'用户创建成功').success(res);
}));


/* 修改一个用户 */
router.put('/admin/auth/user',  asyncFun(async function(req, res, next) {
    let userData = await AuthUserService.modifyUser(req.body)
    new Result(userData,'用户修改成功').success(res);
}));

/* 修改一个用户密码 */
router.put('/admin/auth/user/pass',  asyncFun(async function(req, res, next) {
    let userData = await AuthUserService.modifyUserPass(req.auth, req.body)
    new Result(userData,'密码修改成功').success(res);
}));



module.exports = router;




