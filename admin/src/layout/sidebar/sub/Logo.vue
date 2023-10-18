<template>
  <div class="logo">
    <img src="../../../assets/logo.svg" alt="" :class="{ mr8: !collapsed }" />
    <n-el tag="h2" v-show="!collapsed" class="title">{{ TITLE }}</n-el>
  </div>
</template>

<script setup>
import { TITLE } from '@/env'
defineProps({
  collapsed: {
    type: Boolean
  }
})
</script>

<style lang="scss" scoped>
.logo {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 64px;
  line-height: 64px;
  overflow: hidden;
  white-space: nowrap;

  img {
    width: auto;
    height: 32px;
  }

  .title {
    margin: 0;
    color: var(--primary-color);
  }
}
</style>
