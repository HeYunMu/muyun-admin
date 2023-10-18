<script setup>
import api from "@/http/api";
import { ADMIN_USER_PASS } from "@/http/url";
import { ref } from "vue";
const show = ref(false);
const loading = ref(false);
const model = ref({
  oldPassword: "",
  password: "",
  newPassword: "",
});

function showed() {
  show.value = true;
}

function hided() {
  show.value = false;
  model.value = {
    oldPassword: "",
    password: "",
    newPassword: "",
  };
}

function doChange() {
  loading.value = true;
  api
    .put(ADMIN_USER_PASS, { ...model.value })
    .then((res) => {
      if (res.ok) {
        window.$msg.success("密码修改成功,即将退出登录");
        setTimeout(() => {
            emits("logout")
        }, 1000)
      } else {
        window.$msg.warning(res.message);
      }
    })
    .finally(() => {
      loading.value = false;
    });
}

const emits =  defineEmits(["logout"])

defineExpose({
  showed,
});
</script>

<template>
  <n-modal
    class="nil-dialog pass"
    :close-on-click-modal="false"
    :show="show"
    :showIcon="false"
    preset="dialog"
    title="Dialog"
    @close="hided"
  >
    <template #header>
      <div class="nil-dialog-title">密码修改</div>
    </template>
    <div class="nil-form">
      <n-form
        ref="form"
        :model="model"
        label-placement="left"
        label-align="left"
        label-width="120px"
        require-mark-placement="right-hanging"
      >
        <n-form-item label="旧密码">
          <n-input
            v-model:value="model.oldPassword"
            :disabled="loading"
            type="password"
            placeholder=""
            :show-count="false"
          />
        </n-form-item>

        <n-form-item label="新密码">
          <n-input
            v-model:value="model.password"
            :disabled="loading"
            type="password"
            placeholder=""
            :show-count="false"
          />
        </n-form-item>

        <n-form-item label="确认密码">
          <n-input
            v-model:value="model.newPassword"
            :disabled="loading"
            type="password"
            placeholder=""
            :show-count="false"
          />
        </n-form-item>
      </n-form>
    </div>
    <template #action>
      <n-space>
        <n-button @click="hided">取消</n-button>
        <slot name="action">
          <n-button :loading="loading" @click="doChange" type="primary"
            >修改</n-button
          >
        </slot>
      </n-space>
    </template>
  </n-modal>
</template>

<style lang="scss">
.pass {
  min-width: 200px;
  width: 200px;
  max-width: 200px;
}
</style>
