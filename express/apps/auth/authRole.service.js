const logger = require("../../logger");
const authRole = require("../../models/authRole");
const knex = require("../../models/knex");

const AuthRoleService = {
  async listRole(query) {
    logger.info("query ====> " + JSON.stringify(query));
    const select = query?.select ?? "";
    if (select) {
      const _select = select.split(",");
      return await authRole.listColumn(_select);
    } else {
      return await authRole.list();
    }
  },
  async createRole(role) {
    logger.info("role === > " + JSON.stringify(role));
    if ((role.roleName ?? "") === "") {
      throw Error("角色名称为空");
    }
    if ((role.menuNames ?? "[]") === "[]") {
      throw Error("权限菜单为空");
    }

    const roleCount = await authRole.count((table) =>
      knex(table).where("roleName", role.roleName)
    );
    if (roleCount.count > 0) {
      throw Error("角色名称已存在");
    }
    return await authRole.insert(role);
  },
  async modifyRole(role) {
    logger.info("role === > " + JSON.stringify(role));
    if ((role.id ?? "") === "") {
      throw Error("角色ID为空");
    }
    if ((role.roleName ?? "") === "") {
      throw Error("角色名称为空");
    }
    if ((role.menuNames ?? "[]") === "[]") {
      throw Error("权限菜单为空");
    }
    const roleCount = await authRole.count((table) =>
      knex(table).where("roleName", role.roleName).whereNot("id", role.id)
    );
    if (roleCount.count > 0) {
      throw Error("角色名称已存在");
    }
    return await authRole.update(role.id, {
      ...role,
      id: void "love",
    });
  },
  async deleteRole(role) {
    if ((role.id ?? "") === "") {
      throw Error("角色ID为空");
    }
    if (role.id == 1) {
      throw Error("超级管理员不允许被删除");
    }
    return await authRole.delete(role.id);
  },
};

module.exports = AuthRoleService;
