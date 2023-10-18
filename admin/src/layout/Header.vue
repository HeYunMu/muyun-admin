<template>
  <div class="header">
    <n-space>
      <div
        class="header-options"
        @click="appStore.toogleMenuOpen(!appStore.open)"
      >
        <IconHamburger :isActive="appStore.open" />
      </div>
      <div class="header-options">
        <n-breadcrumb separator="/">
          <transition-group name="breadcrumb">
            <template v-for="(item, index) in matched" :key="index">
              <n-breadcrumb-item
                v-if="item.children && item.children.length != 1"
                @click="toPage(item)"
              >
                <n-icon v-if="item.meta.icon">
                  <component :is="item.meta.icon" />
                </n-icon>
                {{ (item.meta && item.meta.title) ?? "未定义" }}
              </n-breadcrumb-item>
            </template>
          </transition-group>
        </n-breadcrumb>
      </div>
    </n-space>
    <n-space>
      <n-dropdown
        trigger="hover"
        :options="userOptions"
        @select="handleUserSelect"
      >
        <n-button quaternary icon-placement="right">
          <n-space align="center">
            <n-avatar size="medium" :src="userStore?.head" />
            <div>{{ userStore?.name ?? "未登录." }}</div>
          </n-space>
          <template #icon>
            <n-icon>
              <CaretDownOutline />
            </n-icon>
          </template>
        </n-button>
      </n-dropdown>
    </n-space>
    <Password
      ref="passwordRef"
      @logout="
        () => {
          handleUserSelect('logout');
        }
      "
    ></Password>
  </div>
</template>

<script setup>
import { CaretDownOutline } from "@vicons/ionicons5";
import { useAppStore, useUserStore } from "@/stores";
import { useRoute, useRouter } from "vue-router";
import { computed } from "vue";
import Password from "./Password.vue";

const passwordRef = ref(null);

const userOptions = [
  {
    label: "修改密码",
    key: "pass",
  },
  {
    label: "退出账号",
    key: "logout",
  },
];

const appStore = useAppStore();
const userStore = useUserStore();
const router = useRouter();

function handleUserSelect(key) {
  // message.success(String(key));
  if (key === "logout") {
    userStore
      .logout()
      .then(() => {
        window.$msg.success("账号成功退出.");
        router.push({
          name: "login",
        });
      })
      .catch((e) => {
        window.$msg.error(e.message ?? "账号退出失败.");
      });
  } else if (key === "pass") {
    passwordRef.value && passwordRef.value?.showed();
  }
}

const route = useRoute();
const matched = computed(() => {
  let arr = route.matched;
  if (arr[0].path !== "/") {
    arr = route.matched;
  }

  return arr.filter((item) => item.meta && item.meta.title);
});

function toPage(route) {
  // console.log((route));
  // console.log(JSON.stringify(route));

  // 判断有没有子菜单
  if (route.children && route.children.length) {
    // 找到第一个有权限的菜单
    const first = findAccessPage(route.children);
    // console.log(first);
    router.push({ name: first.name });
  } else {
    router.push({ name: route.name });
  }
}

function findAccessPage(routers) {
  let find = false;
  for (const route of routers) {
    let access = true;
    if (userStore.menus === "all") {
      access = true;
    } else {
      const _menus = JSON.parse(userStore.menus ?? "[]") ?? [];
      if (_menus?.includes(route.name)) {
        access = true;
      } else {
        access = false;
      }
    }
    if (route.children && route.children?.length) {
      find = getFirstRoute(route.children);
      if (find) return find;
    } else {
      if (access) {
        find = route;
        return find;
      } else {
        continue;
      }
    }
  }
  return find;
}
</script>

<style lang="scss" scoped>
.header {
  height: var(--header-height);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.breadcrumb-enter-active,
.breadcrumb-leave-active {
  transition: all 0.3s;
}
.breadcrumb-enter-from,
.breadcrumb-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
