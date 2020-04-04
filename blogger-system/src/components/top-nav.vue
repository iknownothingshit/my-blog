<template>
  <!-- 顶部栏 -->
  <div class="top-nav">
    <section class="top-nav-content">
      <h3 @click="go(0)">首页</h3>
      <div class="search-box" ref="searchBox" @blur="blur" tabindex="0">
        <input type="text" placeholder="searching..." @click="focus" />
        <img src="@/assets/search.png" alt />
        <div class="search-box-content" v-if="showResult">
          <div>
            历史记录
            <img src="@/assets/clean.png" alt />
          </div>
          <p @click="go(1)">搜索结果</p>
          <p>搜索结果</p>
          <p>搜索结果</p>
        </div>
      </div>
      <button @click="go(2)">{{blogging}}</button>
      <div class="user" @blur="blur" tabindex="0">
        <img :src="$store.state.avatars || defaultHead" @click="checkUser()" />
        <div class="user-hover" v-if="option">
          <div>
            <img src="@/assets/me.png" alt />
            <p @click="go(3)">我的主页</p>
          </div>
          <div>
            <img src="@/assets/logout.png" alt />
            <p @click="logout">注销</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      defaultHead: require("@/assets/user.jpg"),
      showResult: false, // 控制搜索历史框的弹出
      option: false, // 控制我的主页和注销按钮的弹出
      blogging: "写文章"
    };
  },
  methods: {
    // 注销
    logout() {
      sessionStorage.removeItem("user");
      sessionStorage.removeItem("token");
      this.$_api.setToken();
      this.$router.push("/");
    },
    // 搜索框聚焦时显示历史记录
    focus() {
      this.showResult = true;
      this.$refs.searchBox.focus();
    },
    blur() {
      this.showResult = false;
      this.option = false;
    },
    // 弹出我的主页和注销按钮
    checkUser() {
      this.option = !this.option;
    },
    // 跳转页面
    go(id) {
      switch (id) {
        case 0:
          this.$router.push("/home");
          this.blogging = "写文章";
          break;
        case 1:
          this.$router.push("/home/search-result");
          this.blur();
          break;
        case 2:
          this.$router.push("/home/blogging");
          this.blogging = "发表";
          break;
        case 3:
          this.$router.push("/home/home-page");
          this.blogging = "写文章";
          this.option = false;
          break;
      }
    }
  }
};
</script>
<style lang="less" scoped>
.top-nav {
  width: 100%;
  padding: 5px 0;
  padding-left: 200px;
  background-color: white;
  position: fixed;
  top: 0;
  z-index: 5;
  border-bottom: 1px solid #ececec;

  &-content {
    width: 60%;
    display: flex;
    justify-content: space-between;
    align-items: center;

    h3 {
      margin: 0;
      cursor: pointer;
    }

    .search-box {
      outline: none;
      width: 400px;
      height: 25px;
      background-color: #f6f6f6;
      display: flex;
      flex-wrap: nowrap;
      align-items: center;
      border: 1px solid #ececec;
      border-radius: 5px;
      padding: 5px;
      position: relative;

      @keyframes fade {
        from {
          opacity: 0;
        }
        to {
          opacity: 1;
        }
      }

      &-content {
        animation: fade 0.5s;
        background-color: white;
        width: 100%;
        min-height: 200px;
        position: absolute;
        top: 105%;
        z-index: 2;
        left: 0;
        border: 1px solid #ececec;
        border-radius: 4px;

        div {
          width: 94%;
          margin: 5px 3%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid rgba(174, 181, 195, 0.7);
          color: #aeb5c3;
          padding: 10px 0;
          font-size: 13px;

          img {
            width: 5%;
            height: auto;
            cursor: pointer;
          }
        }

        p {
          cursor: pointer;
          color: #aeb5c3;
          width: 94%;
          margin: 0;
          padding: 6px 3%;
        }

        p:hover {
          background-color: #f6f6f6;
        }
      }

      input {
        width: 92%;
        height: 90%;
        border: 0;
        outline: none;
        background-color: transparent;
      }

      img {
        width: 7%;
        height: auto;
        cursor: pointer;
      }
    }

    button {
      width: 60px;
      height: 40px;
      color: white;
      background-color: #0077e6;
      border: 0;
      border-radius: 3px;
      cursor: pointer;
      outline: none;
    }

    button:hover {
      background-color: #0068ca;
    }

    .user {
      width: 40px;
      position: relative;
      outline: none;

      img {
        width: 100%;
        height: auto;
        cursor: pointer;
      }

      &-hover::before {
        content: "";
        position: absolute;
        border: 15px solid white;
        border-color: transparent transparent white transparent;
        width: 0;
        height: 0;
        top: -34%;
        left: 33%;
      }

      &-hover {
        text-align: center;
        animation: fade 0.5s;
        position: absolute;
        top: 140%;
        left: -90%;
        width: 300%;
        background-color: white;
        z-index: 2;
        border: 1px solid #ececec;
        display: flex;
        flex-wrap: wrap;

        div {
          width: 100%;
          display: flex;
          align-items: center;
          padding: 5px 10px;
          margin: 5px 0;

          img {
            width: 15px !important;
            height: 15px !important;
            margin-right: 10%;
          }

          p {
            text-align: left;
            width: 70%;
            cursor: pointer;
            color: #aeb5c3;
            margin: 0;
          }
        }

        div:hover {
          background-color: rgb(241, 241, 241);
        }
      }
    }
  }
}
</style>