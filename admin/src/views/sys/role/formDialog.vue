<template>
  <BaseDialog inject-key="NIL_FORM">
    <n-form-item label="角色 名称">
      <n-input
        v-model:value="formData.form.items.roleName"
        :disabled="formData.form.loading"
        type="text"
        placeholder="请输入名称"
        :show-count="false"
      />
    </n-form-item>

    <n-form-item label="菜单">
      <n-tree
        style="width: 100%"
        checkbox-placement="right"
        block-line
        :checkable="formData.form.items.id != '1'"
        :data="menus"
        key-field="name"
        label-field="name"
        children-field="children"
        default-expand-all
        v-model:checked-keys="formData.form.items.menuNames"
        :render-switcher-icon="renderSwitcherIcon"
        :render-label="renderlabel"
      />
    </n-form-item>
  </BaseDialog>
</template>

<script setup>
import { inject, h } from "vue";
import { menus } from "@/router/routers";
import { PlanetOutline, SunnyOutline } from "@vicons/ionicons5";
import { NIcon } from "naive-ui";

const formData = inject("NIL_FORM");

const renderSwitcherIcon = ({ expanded }) =>
  h(NIcon, null, {
    default: () => h(expanded ? SunnyOutline : PlanetOutline),
  });

const renderlabel = ({ option }) => h("div", option.meta?.title ?? option.name);
</script>
