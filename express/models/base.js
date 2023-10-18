const knex = require("../models/knex");

class Base {
  constructor(props) {
    this.table = props;
  }

  // 查找
  getById(id) {
    return knex(this.table).select().where("id", "=", id).first();
  }

  getOne(qw = () => {}) {
    return qw(this.table).first();
  }

  // 查找
  list() {
    return knex(this.table).select();
  }

  // 查找
  listColumn(select) {
    return knex(this.table).column(select).select();
  }
  

  count(qw = () => {}) {
    return qw(this.table).count({ count: "id" }).first();
  }

  // 分页
  async page(page = 1, size = 10, select, qw = () => {}) {
    const _page = +page - 1 >= 0 ? +page - 1 : 0;
    console.log(qw(this.table)
    .column(select)
    .select()
    .limit(+size)
    .offset(+_page * +size).toString());
    return {
      records: await qw(this.table)
        .column(select)
        .select()
        .limit(+size)
        .offset(+_page * +size),
      total: (await qw(this.table).count({ count: "id" }).first()).count ?? 0,
    };
  }

  // 新增
  insert(params) {
    return knex(this.table).insert(params);
  }

  // 更改
  update(id, params) {
    return knex(this.table).where("id", "=", id).update(params);
  }

  // 删除
  delete(id) {
    return knex(this.table).where("id", "=", id).del();
  }
}

module.exports = Base;
