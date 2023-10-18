<template>
  <n-card :hoverable="!unhoverable" :style="{ marginBottom: gap }">
    <div class="header" v-if="header">
      <n-space>
        <slot name="left"></slot>
      </n-space>
      <n-space justify="end">
        <slot name="right"></slot>
      </n-space>
    </div>

    <slot></slot>
  </n-card>
</template>

<script setup>
defineProps({
  header: Boolean,
  unhoverable: Boolean,
  gap: {
    type: String,
    default: "0"
  }
});
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  flex-wrap: wrap;
}
</style>
