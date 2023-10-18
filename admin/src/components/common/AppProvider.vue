<template>
  <n-config-provider wh-full :locale="zhCN" :date-locale="dateZhCN">
    <n-loading-bar-provider>
      <n-dialog-provider>
        <n-notification-provider>
          <n-message-provider>
            <slot></slot>
            <NaiveProviderContent />
          </n-message-provider>
        </n-notification-provider>
      </n-dialog-provider>
    </n-loading-bar-provider>
  </n-config-provider>
</template>

<script setup>
import { defineComponent, h } from 'vue'
import { zhCN, dateZhCN, useDialog, useMessage, useNotification, useLoadingBar } from 'naive-ui'
import { setupMessage, setupDialog } from '@/utils'

// 挂载naive组件的方法至window, 以便在全局使用
function setupNaiveTools() {
  window.$notify = useNotification()
  window.$progress = useLoadingBar()
  window.$msg = setupMessage(useMessage())
  window.$dialog = setupDialog(useDialog())
}

const NaiveProviderContent = defineComponent({
  setup() {
    setupNaiveTools()
  },
  render() {
    return h('div')
  }
})
</script>
