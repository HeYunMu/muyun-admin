const authUser = require("../../models/authUser");
const authRole = require("../../models/authRole");
const { DB_FLAG_TRUE, DB_FLAG_FALSE } = require("../../utils/constent");
var bcrypt = require("bcryptjs");
const logger = require("../../logger");
const knex = require("../../models/knex");
const configs = require("../../config");
const jsonwebtoken = require("jsonwebtoken");

const AuthUserService = {
  async createUser(user) {
    logger.info("user === > " + JSON.stringify(user));

    if ((user.account ?? "") === "") {
      throw Error("用户账号为空");
    }
    if ((user.password ?? "") === "") {
      throw Error("用户密码为空");
    }
    if ((user.name ?? "") === "") {
      throw Error("用户昵称为空");
    }
    if ((user.roleId ?? "") === "") {
      throw Error("用户角色为空");
    }

    // 组合数据
    const saveData = {
      ...user,
      createTime: new Date(),
      updateTime: new Date(),
      status: DB_FLAG_FALSE,
    };

    // 密码加密一下
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(user.password, salt);

    saveData.password = hash;

    return await authUser.insert(saveData);
  },

  // 修改用户
  async modifyUser(user) {
    logger.info("user === > " + JSON.stringify(user));
    if ((user.id ?? "") === "") {
      throw Error("用户ID为空");
    }
    if ((user.account ?? "") === "") {
      throw Error("用户账号为空");
    }
    if ((user.name ?? "") === "") {
      throw Error("用户昵称为空");
    }
    if ((user.roleId ?? "") === "") {
      throw Error("用户角色为空");
    }
    // 组合数据
    const saveData = {
      ...user,
      updateTime: new Date(),
      password: void "love",
      id: void "love",
    };

    return await authUser.update(user.id, saveData);
  },

  async modifyUserPass(auth, user) {
    if ((user.oldPassword ?? "") === "") {
      throw Error("旧密码为空");
    }
    if ((user.password ?? "") === "") {
      throw Error("新密码为空");
    }
    if ((user.newPassword ?? "") === "") {
      throw Error("确认密码为空");
    }
    if (user.newPassword !== user.password) {
      throw Error("密码不一致");
    }
    const userDb = await authUser.getById(auth.id);

    // 对比旧密码是否正确
    const isPassOk = bcrypt.compareSync(user.oldPassword, userDb.password);
    console.log("isPassOk === > " + isPassOk);
    if (!isPassOk) {
      throw Error("旧密码错误");
    }
    // 密码加密一下
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(user.newPassword, salt);

    const saveData = {
      updateTime: new Date(),
      password: hash,
      id: void "love",
    };
    return await authUser.update(userDb.id, saveData);
  },

  async listUser(query) {
    logger.info("query ====> " + JSON.stringify(query));
    return await authUser.page(
      query?.current ?? 1,
      query?.size ?? 10,
      ["id", "account", "name", "role_id", "status", "email"],
      (table) => knex(table).whereILike("name", `%${query?.name ?? ""}%`)
    );
  },

  async loginUser(user) {
    // user 就是 req.body
    logger.info("user ====> " + JSON.stringify(user));
    if ((user.account ?? "") === "") {
      throw Error("用户账号为空");
    }
    if ((user.password ?? "") === "") {
      throw Error("用户密码为空");
    }
    let userDb = null;
    // 这里是从数据库获取一条数据 通过 account = user.account
    try {
      userDb = await authUser.getOne((table) =>
        knex(table).where({
          account: user.account,
        })
      );
    } catch (error) {
      throw Error("账号或密码错误");
    }

    // 用户状态 === "1" 的情况
    if (userDb.status === DB_FLAG_TRUE) {
      throw Error("该账户已被禁用");
    }

    // 对比密码是否正确
    const isPassOk = bcrypt.compareSync(user.password, userDb.password);
    console.log("isPassOk === > " + isPassOk);
    if (!isPassOk) {
      throw Error("账号或密码错误");
    }
    userDb.password = void "love";

    // 查询角色允许的菜单列表
    const roleDb = await authRole.getById(userDb.roleId);
    let menus = "";
    if (roleDb.id == 1) {
      menus = "all";
    } else {
      menus = roleDb.menuNames;
    }

    let token = jsonwebtoken.sign(
      { ...userDb, iss: configs.jwt.iss, menus },
      configs.jwt.secretKey,
      {
        expiresIn: configs.jwt.expiresIn, // 授权时效24小时
      }
    );
    return token;
  },
};

module.exports = AuthUserService;
