<template>
  <div class="">
    <Logo :collapsed="appStore.menuOpen" />
    <MenuPart />
  </div>
</template>

<script setup>
import { useAppStore } from '@/stores'
import Logo from './sub/Logo.vue'
import MenuPart from './sub/MenuPart.vue'

const appStore = useAppStore();
</script>

<style lang="scss" scoped></style>
