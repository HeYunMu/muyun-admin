<script setup>
import { inject, ref } from 'vue'

const form = ref(null)
const props = defineProps({
  rules: {
    type: Object,
    default: () => ({})
  },
  injectKey: {
    type: String,
    default: 'NIL_FORM'
  }
})

const formData = inject(props.injectKey ?? 'NIL_FORM')
</script>

<template>
  <n-modal
    class="nil-dialog"
    :close-on-click-modal="false"
    :show="formData.form.method ? true : false"
    @close="formData?.toggleForm"
    :showIcon="false"
    preset="dialog"
    title="Dialog"
  >
    <template #header>
      <div class="nil-dialog-title">
        {{ formData.form.method ? formData.headerText[formData.form.method] : '' }}
      </div>
    </template>
    <n-scrollbar :loading="formData.form.loading" class="nil-dialog-scrollbar">
      <div class="nil-form">
        <n-form
          ref="form"
          :model="formData.form.items"
          label-placement="left"
          label-align="left"
          label-width="120px"
          require-mark-placement="right-hanging"
        >
          <slot></slot>
        </n-form>
      </div>
    </n-scrollbar>
    <template #action>
      <n-space>
        <n-button @click="formData?.toggleForm('')">取消</n-button>
        <slot name="action">
          <n-button :loading="formData.form.loading" @click="formData?.onSave(form)" type="primary"
            >保存</n-button
          >
        </slot>
      </n-space>
    </template>
  </n-modal>
</template>
