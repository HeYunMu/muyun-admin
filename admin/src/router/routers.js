import { AccessibilitySharp } from "@vicons/ionicons5";

// 组成菜单
export const menus = [
  {
    path: "/home",
    name: "home",
    component: () => import("@/views/Home.vue"),
    meta: {
      title: "主页",
      icon: AccessibilitySharp,
    },
  },
  {
    path: "/auth",
    name: "auth",
    meta: {
      title: "权限管理",
      icon: AccessibilitySharp,
    },
    children: [
      {
        path: "/auth/user",
        name: "authUser",
        component: () => import("@/views/sys/user/Index.vue"),
        meta: {
          title: "用户管理",
          icon: AccessibilitySharp,
        },
      },
      {
        path: "/auth/role",
        name: "authRole",
        component: () => import("@/views/sys/role/Index.vue"),
        meta: {
          title: "角色管理",
          icon: AccessibilitySharp,
        },
      },
    ],
  },
];

const modRouters = [
  {
    path: "/403",
    name: "403",
    component: () => import("@/layout/mod/403.vue"),
    meta: {
      title: "403 禁止访问",
      icon: AccessibilitySharp,
    },
  },
];

export const routers = [
  {
    path: "/",
    name: "base",
    component: () => import("@/layout/Index.vue"),
    redirect: "/home",
    children: [...modRouters, ...menus],
  },
  {
    // 管理员登录
    path: "/login",
    name: "login",
    component: () => import("@/views/Login.vue"),
    meta: {
      title: "登录",
    },
  },
];
