<template>
  <div class="login-view">
    <div class="login-form-part">
      <div class="inner-login-form">
        <img src="../assets/logo.svg" alt="" class="logo" />
        <div class="title">
          <n-el tag="span" class="name">{{ TITLE }}</n-el>
        </div>
        <div class="hint">{{ SUB_TITLE }}</div>
        <n-form
          ref="formRef"
          :model="model"
          label-placement="left"
          class="login-form login-reg-box"
          size="large"
          :rules="rules"
        >
          <n-form-item label="账号" path="account">
            <n-input
              v-model:value="model.account"
              @keydown.enter.prevent
              :disabled="loginLoading"
            />
          </n-form-item>
          <n-form-item label="密码" path="passowrd">
            <n-input
              v-model:value="model.passowrd"
              @keydown.enter.prevent
              type="password"
              show-password-on="mousedown"
              @keyup.enter="login(formRef)"
              :disabled="loginLoading"
            />
          </n-form-item>
          <div class="flexcb" style="margin-bottom: 1.5rem">
            <div class=""></div>
            <n-button
              type="primary"
              :loading="loginLoading"
              @click="tologin(formRef)"
            >
              登录
            </n-button>
          </div>
        </n-form>
      </div>
      <div class="copy">Copyright &copy; 2023 heyunmu.com</div>
    </div>
    <div class="image-part background-walk-y">
      <div class="info-part">
        <div class="hello">{{ nowTimeHello() }}</div>
        <div class="love"></div>
        <div class="say"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, nextTick } from "vue";
import api from "@/http/api";
import { USER_LOGIN } from "@/http/url";
import { useRouter } from "vue-router";
import { useUserStore } from "../stores";
import { TITLE, SUB_TITLE } from "@/env";

const router = useRouter();

const userStore = useUserStore();

const loginLoading = ref(false);
const model = reactive({
  account: "",
  passowrd: "",
});

const rules = {
  account: {
    required: true,
    message: "请输入账号",
    trigger: "blur",
  },
  passowrd: {
    required: true,
    message: "请输入密码",
    trigger: ["input", "blur"],
  },
};
const formRef = ref(null);

function tologin(v) {
  v?.validate((errors) => {
    if (!errors) {
      login();
    } else {
      window.$msg.warning("请输入账号或密码");
    }
  });
}

function login() {
  if (model.account.trim() === "") {
    return window.$msg.warning("请输入账号");
  }
  if (model.passowrd.trim() === "") {
    return window.$msg.warning("请输入密码");
  }
  loginLoading.value = true;
  const data = {
    account: model.account ?? "",
    password: model.passowrd ?? "",
  };
  loginLoading.value = true;
  api
    .post(USER_LOGIN, data)
    .then(({ ok, data, message }) => {
      if (ok) {
        console.log(data);
        userStore.setToken(data);
        nextTick(() => {
          const callback = router.currentRoute.value.query?.callback ?? "";
          if (callback) {
            router.push(callback);
          } else {
            router.push("/");
          }
        });
      } else {
        window.$msg.warning(message);
      }
    })
    .catch((e) => {
      window.$msg.error(e?.message ?? e);
    })
    .finally(() => {
      loginLoading.value = false;
    });
}

function nowTimeHello() {
  const _hour = new Date().getHours();
  let _str = "Hi Helo!";
  // 12 14 18 24
  if (_hour >= 0 && _hour <= 12) {
    _str = "Good morning!";
  } else if (_hour > 12 && _hour <= 14) {
    _str = "Good noon!";
  } else if (_hour > 14 && _hour <= 18) {
    _str = "Good afternoon!";
  } else if (_hour > 18 && _hour <= 24) {
    _str = "Good evening!";
  }
  return _str;
}
</script>

<style lang="scss" scoped>
@-webkit-keyframes backgroundWalkX {
  0% {
    background-position: 0 0%;
  }

  100% {
    background-position: 100% 0;
  }
}

@keyframes backgroundWalkX {
  0% {
    background-position: 0 0%;
  }

  100% {
    background-position: 100% 0;
  }
}
.login-view {
  --bg: #f4f6f9;
  --bg-pri: #fff;
  --bg-hover: #f5f5f5;
  --color-pri: #191d21;
  --color-info: #98a6ad;

  display: flex;
  width: 100%;
  .login-form-part {
    width: 25%;
    background-color: var(--bg-pri);
    overflow: hidden;
    min-height: 100vh;
    position: relative;
    transition: all 0.3s;
    .inner-login-form {
      margin: 1rem;
      padding: 1.5rem;
    }
    .logo {
      // box-shadow: 0 2px 6px #e6ecf1;
      margin-bottom: 3rem;
      margin-top: 0.5rem;
      border-radius: 3px;
      vertical-align: middle;
      border-style: none;
      width: 70px;
      height: 70px;
    }
    .title {
      font-weight: normal;
      font-size: 1.5rem;
      // color: var(--color-pri);
    }
    .name {
      font-weight: bold;
      color: var(--primary-color);
    }
    .hint {
      color: var(--color-info);
      line-height: 28px;
      margin-bottom: 1rem;
    }

    .copy {
      color: var(--color-info);
      text-align: center;
      position: absolute;
      bottom: 60px;
      width: 100%;
    }
  }

  .image-part {
    transition: all 0.3s;
    flex: 1;
    position: relative;
    background-image: url(../assets/login-bg.jpg);
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    user-select: none;
    &::after {
      content: " ";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: false;
      background-image: linear-gradient(
        to bottom,
        rgba(0, 0, 0, 0) 65%,
        rgba(0, 0, 0, 0.65) 100%
      );
      z-index: 1;
    }
    .info-part {
      z-index: 2;
      position: absolute;
      left: 0;
      bottom: 0;
      color: #e3eaef;
      padding: 3rem;
    }
    .hello {
      font-size: 3.5rem;
      line-height: 1.2;
      margin-bottom: 0.5rem;
      font-weight: 700;
    }
    .love {
      font-size: 1.25rem;
      color: rgba(255, 255, 255, 0.8);
      font-weight: 500;
      margin-bottom: 3rem;
    }
  }

  .background-walk-y {
    background-repeat: no-repeat;
    background-position: 0 0%;
    -webkit-animation-name: backgroundWalkX;
    animation-name: backgroundWalkX;
    -webkit-animation-duration: 50s;
    animation-duration: 50s;
    -webkit-animation-iteration-count: infinite;
    animation-iteration-count: infinite;
    -webkit-animation-direction: alternate;
    animation-direction: alternate;
    -webkit-animation-fill-mode: forwards;
    animation-fill-mode: forwards;
    -webkit-animation-timing-function: linear;
    animation-timing-function: linear;
  }

  @media screen and (max-width: 1000px) {
    .login-form-part {
      width: 50%;
    }
  }
  @media screen and (max-width: 768px) {
    .login-form-part {
      width: 100%;
    }
    .image-part {
      display: none;
    }
  }
}
</style>
