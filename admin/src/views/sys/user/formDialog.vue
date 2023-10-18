<template>
  <BaseDialog inject-key="NIL_FORM">
    <n-form-item label="账号">
      <n-input
        v-model:value="formData.form.items.account"
        :disabled="formData.form.loading"
        type="text"
        placeholder="请输入账号"
        :show-count="false"
      />
    </n-form-item>

    <n-form-item label="密码" v-if="formData.form.method === 'add'">
      <n-input
        v-model:value="formData.form.items.password"
        :disabled="formData.form.loading"
        type="text"
        placeholder="请输入密码"
        :show-count="false"
      />
    </n-form-item>

    <n-form-item label="昵称">
      <n-input
        v-model:value="formData.form.items.name"
        :disabled="formData.form.loading"
        type="text"
        placeholder="请输入昵称"
        :show-count="false"
      />
    </n-form-item>

    <n-form-item label="邮箱">
      <n-input
        v-model:value="formData.form.items.email"
        :disabled="formData.form.loading"
        type="email"
        placeholder="请输入邮箱"
        :show-count="false"
      />
    </n-form-item>

    <n-form-item label="角色">
      <n-select
        v-model:value="formData.form.items.roleId"
        :disabled="formData.form.loading"
        placeholder="请选择角色"
        :options="formData.form.extra.roles"
        label-field="roleName"
        value-field="id"
      >
      </n-select>
    </n-form-item>

    <n-form-item label="状态">
      <n-radio-group
        :disabled="formData.form.loading"
        v-model:value="formData.form.items.status"
      >
        <n-radio-button
          v-for="item in statusOptions"
          :disabled="formData.form.loading"
          :key="item.value"
          :value="item.value"
          :label="item.label"
        />
      </n-radio-group>
    </n-form-item>
  </BaseDialog>
</template>

<script setup>
import { inject } from "vue";

const formData = inject("NIL_FORM");

const statusOptions = [
  { label: "启用", value: "0" },
  { label: "禁用", value: "1" },
];
</script>
