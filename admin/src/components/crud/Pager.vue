<template>
  <div class="pager">
    <n-space justify="end">
      <n-pagination
        :page="pagination?.page"
        :page-size="pagination?.pageSize"
        :page-count="pagination?.pageCount"
        :show-size-picker="pagination?.showSizePicker"
        :page-sizes="pagination?.pageSizes"
        @update:page="onChange"
        @update:page-size="onPageSizeChange"
    /></n-space>
  </div>
</template>

<script>
import { defineComponent, toRef } from 'vue'

export default defineComponent({
  name: 'Pager',
  props: {
    pagination: {
      type: Object,
      require: true
    },
    showRefresh: {
      type: Boolean,
      default: true
    }
  },
  setup(props) {
    const pagination = toRef(props, 'pagination')
    function onChange(page) {
      pagination.value.page = page
      pagination.value.onChange()
    }
    function onPageSizeChange(pageSize) {
      pagination.value.page = 1
      pagination.value.pageSize = pageSize
      pagination.value.onPageSizeChange()
    }
    function refresh() {
      pagination.value.onChange()
    }
    return {
      onChange,
      onPageSizeChange,
      refresh
    }
  }
})
</script>
<style lang="scss" scoped>
.pager {
    padding: 1.5em 0;
}
</style>
