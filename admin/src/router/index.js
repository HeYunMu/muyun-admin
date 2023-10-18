import { createRouter, createWebHashHistory } from "vue-router";
import { WHITE_LIST } from "@/env";
// 自己维护路由表
import { routers } from "./routers";
import { useUserStore } from "@/stores";

const router = createRouter({
  history: createWebHashHistory(),
  routes: routers,
});

router.beforeEach(async (to, from, next) => {
  window.$progress && window.$progress.start();
  const userStore = useUserStore();
  // 不需要判断token的页面
  if (WHITE_LIST.indexOf(to.path) !== -1) {
    next();
  } else {
    try {
      // 检查token获取用户信息
      const info = await userStore.checkToken();
      // 判断用户是否有权限访问
      if (info.menus === "all") {
        console.log(`【${info.name}】是超级管理员`);
        next();
      } else {
        /**
         * @type {Array}
         */
        const _menus = JSON.parse(info.menus ?? "[]") ?? [];
        if (_menus?.includes(to.name)) {
          console.log(`【${info.name}】有权限进入【${to.name}】`);
          next();
        } else {
          console.log(`【${info.name}】没有权限进入【${to.name}】`);
          next({ name: "403", replace: true });
        }
      }
    } catch (error) {
      console.log(error);
      // window.$msg.error(error?.message ? error?.message : error)
      next({ name: "login", query: { callback: to.fullPath } });
    }
  }
});

// 路由加载后
router.afterEach(() => {
  window.$progress && window.$progress.finish();
});

export default router;
