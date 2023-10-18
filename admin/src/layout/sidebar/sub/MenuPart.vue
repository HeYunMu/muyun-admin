<template>
  <n-menu
    ref="menu"
    class="menu-part"
    :collapsed="appStore.menuOpen"
    :indent="18"
    :collapsed-icon-size="22"
    :collapsed-width="64"
    :options="menuOptions"
    :value="selectedKeys"
    :expanded-keys="openMenus"
    @update:expanded-keys="menuExpanded"
    @update:value="handleMenuSelect"
  />
</template>

<script setup>
import { NIcon } from "naive-ui";
import { computed, h, ref, onMounted, watch } from "vue";
import { useRouter } from "vue-router";
import { useAppStore, useUserStore } from "@/stores";
import { menus } from "@/router/routers";

const router = useRouter();

const appStore = useAppStore();

// 菜单配置
const menuOptions = computed(() => {
  return menus.map((item) => genMenuItem(item));
});

function renderIcon(icon) {
  return () => h(NIcon, null, { default: () => icon && h(icon) });
}

const selectedKeys = ref(router.currentRoute.name);
const openMenus = ref([]);

//展开菜单
function menuExpanded(openKeys) {
  if (!openKeys) return;
  const latestOpenKey = openKeys.find(
    (key) => openMenus.value.indexOf(key) === -1
  );
  const isExistChildren = findChildrenLen(latestOpenKey);
  openMenus.value = isExistChildren
    ? latestOpenKey
      ? [latestOpenKey]
      : []
    : openKeys;
}

//查找是否存在子路由
function findChildrenLen(key) {
  if (!key) return false;
  const subRouteChildren = [];
  for (const { children, key } of menus) {
    if (children && children.length) {
      subRouteChildren.push(key);
    }
  }
  return subRouteChildren.includes(key);
}

function updateSelectedKeys() {
  const matched = router.currentRoute.value.matched;
  openMenus.value = matched.map((item) => item.name);
  selectedKeys.value = router.currentRoute.value.name;
}

onMounted(() => {
  const matched = router.currentRoute.value.matched;
  openMenus.value =
    matched && matched.length ? matched.map((item) => item.name) : [];
  console.log(JSON.stringify(openMenus.value));
  updateSelectedKeys();
});

watch(
  () => router.currentRoute.value.fullPath,
  () => {
    updateSelectedKeys();
  }
);

const userStore = useUserStore();

// 生成菜单项
function genMenuItem(route) {
  let show = true;
  if (userStore.menus === "all") {
    show = true;
  } else {
    const _menus = JSON.parse(userStore.menus ?? "[]") ?? [];
    if (_menus?.includes(route.name)) {
      show = true;
    } else {
      show = false;
    }
  }

  let menuItem = {
    label: (route.meta && route.meta.title) || route.name,
    key: route.name,
    path: route.path,
    name: route.name,
    meta: route.meta,
    icon: renderIcon(route.meta.icon),
    show: show
  };

  const routerChildren = route?.children ?? [];

  if (!routerChildren.length) return menuItem;

  if (routerChildren.length === 1) {
    // 单个子路由处理
    const singleRoute = routerChildren[0];
    menuItem = {
      ...menuItem,
      label: singleRoute.meta?.title || singleRoute.name,
      key: singleRoute.name,
      name: singleRoute.name,
      path: singleRoute.path,
      meta: route.meta,
      icon: renderIcon(singleRoute.meta.icon),
    };
    const visibleItems = singleRoute.children
      ? singleRoute.children.filter((item) => item.name && !item.isHidden)
      : [];

    if (visibleItems.length === 1) {
      menuItem = genMenuItem(visibleItems[0]);
    } else if (visibleItems.length > 1) {
      menuItem.children = visibleItems;
    }
  } else {
    menuItem.children = routerChildren
      .map((item) => genMenuItem(item))
      .sort((a, b) => a.order - b.order);
  }
  return menuItem;
}

// 点击菜单
function handleMenuSelect(key, item) {
  try {
    router.push({ name: item.name });
  } catch (error) {
    console.log(error);
    window.$msg.warning("未找到此页面: " + error.message);
  }
}
</script>

<style lang="scss" scoped></style>
