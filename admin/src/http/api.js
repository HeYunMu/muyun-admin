import { useUserStore } from "@/stores";
import axios from "axios";
// import { useUserStore } from '@/stores'

// 创建axios实例
const api = axios.create({
  baseURL: "http://127.0.0.1:3000", // api 的 base_url
  eout: 100000, // 请求超时时间
  // withCredentials: true
});

// request拦截器
api.interceptors.request.use(
  (config) => {
    const userStore = useUserStore();
    if (userStore.token) {
      config.headers["Authorization"] = `Bearer ${userStore.token}`; // 让每个请求携带自定义token 请根据实际情况自行修改
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

// response 拦截器
api.interceptors.response.use(
  (response) => {
    // 拦截 没有权限的访问
    // let code = response.data?.code ?? 0
    return response.data;
  },
  (error) => {
    let code = 0;
    try {
      code = error.response.data.status;
    } catch (e) {
      if (error.toString().indexOf("Error: timeout") !== -1) {
        // ElNotification({
        //   title: "Error",
        //   message: "网络请求超时",
        //   type: "error",
        // })
        return Promise.reject(error);
      }
    }
    console.log("req err code == > ", code);
    // if (code) {
    //   // TODO
    // } else {
    // ElNotification({
    //   title: "Error",
    //   message: "接口请求失败",
    //   type: "error",
    // })
    // }
    return Promise.reject(error);
  }
);
export default api;
