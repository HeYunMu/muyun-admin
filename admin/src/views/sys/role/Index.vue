<template>
  <div class="page">
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
    </Container>
    <FormDialog />
  </div>
</template>

<script setup>
import { useTable, useForm } from "@/hooks";
import { onMounted, provide } from "vue";
import api from "@/http/api";
import {
  ADMIN_ROLE_CHANGE,
  ADMIN_ROLE_DELETE,
  ADMIN_ROLE_LIST,
} from "@/http/url";
import FormDialog from "./formDialog.vue";

// 表格 ----------- start
const tableUse = useTable();

const tableColumns = [
  {
    title: "角色 ID",
    key: "id",
  },
  {
    title: "角色 名称",
    key: "roleName",
  },
  tableUse.options([
    {
      type: "primary",
      label: "修改",
      onClick: handleChangeClick,
    },
    {
      type: "error",
      label: "删除",
      onClick: handleDeleteClick,
    },
  ]),
];

// 添加
function handleAddClick() {
  formUse.toggleForm("add", {});
}

// 修改
function handleChangeClick(row) {
  formUse.toggleForm("edit", {
    ...row,
    menuNames: JSON.parse(row.menuNames ?? "[]"),
  });
}

// 删除
function handleDeleteClick(row) {
  //
  const d = window.$dialog.warning({
    title: "温馨提示",
    content: `是否删除角色【${row.roleName}】?`,
    positiveText: "确认",
    positiveButtonProps: {
      type: "error",
    },
    onPositiveClick: () => {
      d.loading = true;
      api
        .delete(ADMIN_ROLE_DELETE(row.id))
        .then(({ ok, message }) => {
          d.loading = false;
          if (ok) {
            window.$msg.success(message);
            initData();
          } else {
            window.$msg.warning(message);
          }
        })
        .catch((e) => {
          d.loading = false;
          window.$msg.error(e);
        });
    },
  });
}

// 表格 ----------- end

// 表单 ----------- start
const formUse = useForm();

provide("NIL_FORM", formUse);

formUse.listener.onSave = (method, items) => {
  formUse.form.loading = true;
  const methodMap = { add: "post", edit: "put" };
  items.menuNames = JSON.stringify(items.menuNames ?? []);
  api[methodMap[method]](ADMIN_ROLE_CHANGE, items)
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
    .get(ADMIN_ROLE_LIST)
    .then(({ ok, data, message }) => {
      if (ok) {
        tableUse.loadData(data ?? []);
      } else {
        window.$msg.warning(message);
      }
    })
    .finally(() => {
      tableUse.table.loading = false;
    });
}

// 页面加载完成
onMounted(() => {
  initData();
});
</script>

<style lang="scss" scoped></style>
