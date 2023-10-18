var express = require('express');
const Result = require("../../utils/result");
const {asyncFun} = require("../../middleware/async");
const AuthRoleService = require('./authRole.service');
var router = express.Router();


// 获取角色列表
router.get('/admin/auth/roles',  asyncFun(async function(req, res, next) {
    let data = await AuthRoleService.listRole(req.query)
    new Result(data,'角色获取成功').success(res);
}));

// 创建角色
router.post('/admin/auth/role',  asyncFun(async function(req, res, next) {
    let data = await AuthRoleService.createRole(req.body)
    new Result(data,'角色创建成功').success(res);
}));

// 修改角色
router.put('/admin/auth/role',  asyncFun(async function(req, res, next) {
    let data = await AuthRoleService.modifyRole(req.body)
    new Result(data,'角色修改成功').success(res);
}));

// 删除角色
router.delete('/admin/auth/role/:id',  asyncFun(async function(req, res, next) {
    let data = await AuthRoleService.deleteRole(req.params)
    new Result(data,'角色删除成功').success(res);
}));


module.exports = router;




