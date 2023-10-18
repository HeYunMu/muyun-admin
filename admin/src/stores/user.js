import api from "@/http/api";
import { CHECK_USER_IS_LOGIN } from "@/http/url";
import { defineStore } from "pinia";
// import { useTabsStore } from './tabs'

export const useUserStore = defineStore("user", {
  state: () => {
    const session =
      JSON.parse(sessionStorage.getItem("2022-nil-user-info") ?? "{}") ?? {};
    const token = sessionStorage.getItem("2022-nil-token-value") ?? "";
    return Object.assign(
      {
        account: "",
        head: "",
        id: "",
        name: "",
        role: "",
        status: "",
        token: "",
      },
      session,
      {
        token,
      }
    );
  },
  getters: {},
  actions: {
    setToken(token) {
      this.token = token ?? "";
      sessionStorage.setItem("2022-nil-token-value", token);
    },
    fill(obj = {}) {
      this.account = obj?.account ?? "";
      this.head = obj?.head ?? "";
      this.id = obj?.id ?? "";
      this.name = obj?.name ?? "";
      this.role = obj?.role ?? "";
      this.status = obj?.status ?? "";
      this.menus = obj?.menus ?? "[]";
      sessionStorage.setItem("2022-nil-user-info", JSON.stringify(obj));
    },
    checkToken() {
      return new Promise((resolve, reject) => {
        api
          .get(CHECK_USER_IS_LOGIN)
          .then((res) => {
            if (res.ok) {
              this.fill(res.data);
              resolve(res.data);
            } else {
              reject(res.message);
            }
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    logout() {
      return new Promise((resolve) => {
        sessionStorage.removeItem("2022-nil-user-info");
        sessionStorage.removeItem("2022-nil-token-value");
        this.setToken("");
        this.fill({});
        // useTabsStore().tabs = []
        resolve(this.token);
      });
    },
  },
});
