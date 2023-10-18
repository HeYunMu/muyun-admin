<template>
  <n-layout has-sider class="app">
    <n-layout-sider
      bordered
      collapse-mode="width"
      :collapsed-width="64"
      :width="220"
      :collapsed="appStore.menuOpen"
      :native-scrollbar="false"
    >
      <SideBar />
    </n-layout-sider>

    <n-layout>
      <div class="app-header">
        <Header />
      </div>
      <div class="window">
        <n-scrollbar>
          <router-view v-slot="{ Component }">
            <transition name="zoom-fade" mode="out-in" appear>
              <component :is="Component" />
            </transition>
          </router-view>
        </n-scrollbar>
      </div>
    </n-layout>
  </n-layout>
</template>

<script setup>
import SideBar from "./sidebar/index.vue";
import { useAppStore } from "@/stores";
import Header from "./Header.vue";
const appStore = useAppStore();
</script>

<style lang="scss" scoped>
.app {
  width: 100vw;
  height: 100vh;
  .window {
    background-color: var(--main-primary-background-color);
    min-height: calc(100vh - 50px);
    height: calc(100vh - 50px);
  }
}
</style>
