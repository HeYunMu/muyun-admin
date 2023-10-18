<template>
  <div class="page">
    <SearchBar />
    <Container header>
      <template #left>
        <n-button type="primary" @click="handleAddClick"> 添加 </n-button>
      </template>
      <n-data-table
        :columns="tableColumns"
        :data="tableUse.table.data"
        :loading="tableUse.table.loading"
        :bordered="true"
      />
      <Pager :pagination="pageUse" />
    </Container>
    <FormDialog />
  </div>
</template>

<script setup>
import { useTable, usePage, useForm } from "@/hooks";
import { onMounted, provide, ref, h } from "vue";
import useSearchBar from "@/hooks/useSearchBar";
import api from "@/http/api";
import {
  ADMIN_ROLE_LIST,
  //   ADMIN_ROLE_LIST,
  ADMIN_USER_CHANGE,
  ADMIN_USER_LIST,
} from "@/http/url";
import FormDialog from "./formDialog.vue";

// 搜索 ----------- start
const searchBar = useSearchBar({
  columns: [{ prop: "name", label: "昵称" }],
});

provide("NIL_SEARCH", searchBar);
searchBar.call.search = (item) => {
  searchBar.search.last = searchBar.formatSearchData(item);
  pageUse.reset();
  initData();
};
searchBar.call.cancel = (item) => {
  searchBar.search.last = searchBar.formatSearchData(item);
  pageUse.reset();
  initData();
};

// 搜索 ----------- end

// 表格 ----------- start
const tableUse = useTable();

const tableColumns = [
  {
    title: "昵称",
    key: "name",
  },
  {
    title: "账号",
    key: "account",
  },
  {
    key: "roleId",
    title: "角色",
    render(row) {
      return h(
        "div",
        {},
        {
          default: () => roleMap.value[row.roleId] ?? "",
        }
      );
    },
  },
  {
    title: "状态",
    key: "status",
    render(row) {
      return h(
        "div",
        {},
        {
          default: () => (row.status == "0" ? "启用" : "禁用"),
        }
      );
    },
  },
  tableUse.options([
    {
      type: "primary",
      label: "修改",
      onClick: handleChangeClick,
    },
  ]),
];

// 添加
function handleAddClick() {
  formUse.toggleForm("add", {
    roleId: formUse.form.extra.roles[0].id,
    status: "0",
  });
}

// 修改
function handleChangeClick(row) {
  row.roleId = +row.roleId;
  formUse.toggleForm("edit", row);
}

// 分页
const pageUse = usePage(initData);

// 表格 ----------- end

// 表单 ----------- start
const formUse = useForm();

provide("NIL_FORM", formUse);

formUse.listener.onSave = (method, items) => {
  formUse.form.loading = true;
  const methodMap = { add: "post", edit: "put" };
  method == "add" && (items.password = items.password ?? "");
  api[methodMap[method]](ADMIN_USER_CHANGE, items)
    .then((res) => {
      if (res.ok) {
        window.$msg.success(res.message);
        formUse.toggleForm();
        initData();
      } else {
        window.$msg.warning(res.message);
      }
    })
    .finally(() => {
      formUse.form.loading = false;
    });
};
// 表单 ----------- end

// 获取数据
function initData() {
  tableUse.table.loading = true;
  api
    .get(ADMIN_USER_LIST, {
      params: {
        current: pageUse.page ?? 1,
        size: pageUse.pageSize ?? 1,
        ...searchBar.search.last,
      },
    })
    .then(({ ok, data, message }) => {
      if (ok) {
        tableUse.loadData(data.records ?? []);
        pageUse.setTotalSize(data.total);
      } else {
        window.$msg.warning(message);
      }
    })
    .finally(() => {
      tableUse.table.loading = false;
    });
}

const roleMap = ref({});

function initRoles() {
  tableUse.table.loading = true;
  api
    .get(ADMIN_ROLE_LIST, {
      params: {
        select: "id,roleName",
      },
    })
    .then((res) => {
      if (res.ok) {
        const _role_map = {};
        res.data.forEach((element) => {
          _role_map[element.id] = element.roleName;
        });
        roleMap.value = _role_map;
        formUse.form.extra.roles = res.data;
      }
    })
    .then(() => {
      initData();
    });
}

// 页面加载完成
onMounted(() => {
  initRoles();
});
</script>

<style lang="scss" scoped></style>
