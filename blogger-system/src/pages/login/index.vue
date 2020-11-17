<template>
  <!-- 登录页 -->
  <div class>
    <img src="@/assets/bg.jpg" alt />
    <section class="login-box" ref="loginBox">
      <div class="login-box-toggle-btn" @click="toggle">
        <p>{{ btnType == 1 ? "注册" : "登录" }}</p>
      </div>
      <div class="login-box-title">
        <h3 :style="{ marginTop: btnType == 1 ? '-25px' : '0' }">
          用户注册
          <br />用户登录
        </h3>
      </div>
      <div class="login-box-item">
        <input
          ref="account"
          type="text"
          placeholder="用户名"
          v-model="account"
          @focus="focus(1, $event, 'ac')"
          @blur="blur($event)"
        />
        <div
          class="login-box-item-bottomLine"
          :style="{ width: focusId == 1 ? '100%' : '0' }"
        ></div>
        <label>{{ inputErr.ac }}</label>
      </div>
      <div class="login-box-item">
        <input
          ref="password"
          type="password"
          placeholder="密码"
          v-model="password"
          @focus="focus(2, $event, 'pd')"
          @blur="blur($event)"
        />
        <div
          class="login-box-item-bottomLine"
          :style="{ width: focusId == 2 ? '100%' : '0' }"
        ></div>
        <label>{{ inputErr.pd }}</label>
      </div>
      <div class="login-box-item confirmPsw" ref="confirmPsw">
        <input
          ref="confirmPassword"
          type="password"
          v-model="confirmPassword"
          placeholder="确认密码"
          @focus="focus(3, $event, 'cpd')"
          @blur="blur($event)"
        />
        <div
          class="login-box-item-bottomLine"
          :style="{ width: focusId == 3 ? '100%' : '0' }"
        ></div>
        <label>{{ inputErr.cpd }}</label>
      </div>
      <button @click="btnClick">{{ btnType == 1 ? "登录" : "注册" }}</button>
    </section>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      mmm: "",
      focusId: 0, // 当前聚焦的输入框编号
      account: "",
      password: "",
      confirmPassword: "",
      inputErr: { ac: "", pd: "", cpd: "" }, //输入框的错误提示
      btnType: 1, // 按钮文本，1为登录0为注册
    };
  },
  mounted() {
    window.addEventListener("keydown", this.listenEnter);
  },
  destroyed() {
    window.removeEventListener("keydown", this.listenEnter);
  },
  methods: {
    // 监听回车
    listenEnter(e) {
      if (e.keyCode === 13) {
        this.btnClick();
      }
    },
    // 点击登录、注册按钮
    btnClick() {
      if (this.btnType) {
        this.login();
      } else {
        this.register();
      }
    },
    // 登录或者注册后将用户信息存储到vuex以及sessionStorage里，并前往主页
    setMsg(res) {
      sessionStorage.setItem("token", res.data.token);
      sessionStorage.setItem("user", JSON.stringify(res.data.data));
      this.$_api.setToken(res.data.token);
      if (res.data.data.userAvatars) {
        this.$store.commit(
          "setAvatars",
          "api/images/" + res.data.data.userAvatars
        );
      }
      this.$router.push("/home");
    },
    //注册
    async register() {
      if (
        this.account &&
        this.password &&
        this.confirmPassword &&
        this.password == this.confirmPassword
      ) {
        const register_res = await this.$_api.register({
          account: this.account,
          password: this.password,
        });
        if (register_res.data.code) {
          this.setMsg(register_res);
        } else {
          this.inputErr.ac = "用户名已存在";
        }
      } else if (this.password != this.confirmPassword) {
        this.inputErr.cpd = "确认密码与密码不一致";
      }
    },
    // 登录
    async login() {
      if (this.account && this.password) {
        const login_res = await this.$_api.login({
          account: this.account,
          password: this.password,
        });
        if (login_res.data.code) {
          this.setMsg(login_res);
        } else {
          if (login_res.data.message == "密码不正确") {
            this.inputErr.pd = "密码不正确";
          } else {
            this.inputErr.ac = "用户名不存在";
          }
        }
        console.log(this.inputErr);
      }
    },
    //切换登录与注册
    toggle() {
      this.clearClass();
      if (this.btnType == 1) {
        this.btnType = 0;
        this.$refs.confirmPsw.style.height = "44px";
      } else {
        this.btnType = 1;
        this.$refs.confirmPsw.style.height = "0";
      }
    },
    //切换时清空输入框样式以及输入框内容
    clearClass() {
      this.account = "";
      this.password = "";
      this.confirmPassword = "";
      this.inputErr = { ac: "", pd: "", cpd: "" };
      let inputs = [
        this.$refs.account,
        this.$refs.password,
        this.$refs.confirmPassword,
      ];
      for (let e of inputs) {
        e.className = "";
        e.placeholder = e.placeholder.replace("请输入", "");
      }
    },
    // 输入框聚焦
    focus(id, e, err) {
      this.focusId = id;
      this.inputErr[err] = "";
      let target = e.target;
      target.className = "";
      target.placeholder = target.placeholder.replace("请输入", "");
    },
    // 输入框失焦
    blur(e) {
      this.focusId = 0;
      let target = e.target;
      if (!target.value) {
        target.className = "redPhd";
        target.placeholder = "请输入" + target.placeholder;
      }
    },
  },
};
</script>
<style lang="less" scoped>
.login-box {
  width: 400px;
  margin: auto;
  margin-top: 100px;
  background-color: white;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
  text-align: center;
  padding: 40px 0;
  position: relative;

  &-toggle-btn {
    position: absolute;
    right: -40px;
    top: -40px;
    width: 0;
    height: 0;
    border: 40px solid #0077e6;
    border-color: transparent transparent #0077e6 transparent;
    transform: rotate(45deg);
    cursor: pointer;

    p {
      background-color: transparent;
      width: 40px;
      position: absolute;
      top: 5px;
      left: -18px;
      font-size: 10px;
      color: white;
      font-weight: 300;
    }
  }

  &-title {
    width: 70%;
    margin: auto;
    height: 25px;
    overflow: hidden;
  }

  h3 {
    text-align: left;
    transition: margin-top 0.4s;
  }

  .confirmPsw {
    transition: height 0.4s;
    height: 0;
    overflow: hidden;
  }

  &-item {
    position: relative;
    width: 70%;
    margin: 20px auto;

    label {
      position: absolute;
      right: 5%;
      top: 50%;
      transform: translateY(-50%);
      color: red;
      font-size: 5px;
    }

    input {
      width: 100%;
      height: 40px;
      border: 0;
      outline: none;
      border-bottom: 1px solid #eeeeee;
    }

    .redPhd::-webkit-input-placeholder {
      color: red;
    }

    &-bottomLine {
      height: 1px;
      width: 0;
      background-color: #0077e6;
      transition: width 0.4s;
    }
  }

  &-item:hover {
    div {
      width: 100% !important;
    }
  }

  button {
    letter-spacing: 5px;
    font-weight: 300;
    padding: 5px 0;
    width: 70%;
    height: 40px;
    background-color: #0077e6;
    border: 0;
    border-radius: 5px;
    color: white;
    margin-top: 20px;
    cursor: pointer;
  }

  button:hover {
    background-color: #006ace;
  }
}

img {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  z-index: -1;
}
</style>
