<template>
  <n-card hoverable style="margin-bottom: 16px;">
    <n-form
      :label-width="80"
      :model="searchBar.search.form"
      label-placement="left"
      label-align="left"
      :show-feedback="false"
    >
      <n-space :wrap-item="false">
        <template v-for="(item, index) in searchBar.search.columns" :key="index">
          <n-form-item :label="item.label">
            <n-input v-model:value="searchBar.search.form[`${item.prop}`]" />
          </n-form-item>
        </template>
        <n-space style="flex: 1" justify="end" :wrap="false">
          <n-button @click="searchBar.doSearch" type="primary">搜索</n-button>
          <n-button @click="searchBar.doCancel" type="">重置</n-button>
        </n-space>
      </n-space>
    </n-form>
  </n-card>
</template>

<script setup>
import { inject } from 'vue'

const searchBar = inject('NIL_SEARCH')
</script>

<style lang="scss" scoped></style>
