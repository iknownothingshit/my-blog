<template>
  <!-- 评论框 -->
  <div class="comment-box-cover">
    <div class="mantle" @click="close"></div>
    <div :class="['comment-box', fade == 'in' ? 'fadeIn' : 'fadeOut']">
      <img src="@/assets/close.png" class="close" @click="close" />
      <h3>{{ allComments.length }}条评论</h3>
      <section class="comment-box-content">
        <div
          class="comment-box-content-item"
          v-for="(e, i) in allComments"
          :key="i"
        >
          <div>
            <img :src="`api/images/${e.user_avatars}`" alt />
            {{ e.user_name }}
          </div>
          <span>{{ e.date }}</span>
          <p>
            {{ e.text }}
          </p>
        </div>
      </section>
      <section class="comment-box-edit">
        <input
          type="text"
          placeholder="写下你的评论..."
          v-model="comment"
          maxlength="200"
        />
        <button :class="{ 'btn-disable': comment != '' }" @click="emitComment">
          发布
        </button>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    allComments: Array, // 全部评论
  },
  data() {
    return {
      fade: "in", //设置展示和收起动画
      comment: "", //评论内容
    };
  },
  methods: {
    // 关闭评论框组件
    close() {
      setTimeout(() => {
        this.$parent.closeComment();
      }, 500);
      this.fade = "out";
    },
    // 触发父组件发表评论方法
    emitComment() {
      if (!this.comment || !this.comment.replace(/\s/g, "")) return;
      this.$parent.comment(this.comment);
      this.comment = "";
    },
  },
  mounted() {
    // 加载组件时禁止主页面的滑动
    let m = function (e) {
      e.preventDefault();
    };
    document.body.style.overflow = "hidden";
    document.addEventListener("touchmove", m, { passive: false }); //禁止页面滑动
    console.log("评论列表：", this.allComments);
  },
  destroyed() {
    // 组件销毁时恢复页面的滑动
    let m = function (e) {
      e.preventDefault();
    };
    document.body.style.overflow = ""; //出现滚动条
    document.removeEventListener("touchmove", m, { passive: true });
  },
};
</script>
<style lang="less" scoped>
.mantle {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  background-color: rgba(0, 0, 0, 0.6);
}

.comment-box-cover {
  position: fixed;
  left: 0;
  top: 0;
  // background-color: rgba(0, 0, 0, 0.6);
  z-index: 20;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(50px);
    }

    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes fadeOut {
    to {
      opacity: 0;
      transform: translateY(50px);
    }

    from {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .fadeIn {
    animation: fadeIn 0.7s;
  }
  .fadeOut {
    animation: fadeOut 0.7s;
  }

  .comment-box {
    width: 30%;
    height: 90%;
    display: flex;
    flex-direction: column;
    background-color: white;
    position: relative;

    .close {
      position: absolute;
      right: -30px;
      top: 5px;
      width: 15px;
      height: auto;
      cursor: pointer;
    }

    h3 {
      width: 94%;
      padding: 0 3%;
      margin: 0;
      height: 5%;
      line-height: 220%;
      border-bottom: 1px solid rgba(235, 235, 235, 0.6);
    }

    &-content {
      width: 94%;
      padding: 0 3%;
      padding-top: 20px;
      height: 88%;
      overflow-y: scroll;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;

      &-item {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        border-bottom: 1px solid rgba(235, 235, 235, 0.6);
        padding: 10px 0;

        div {
          width: 80%;
          display: flex;
          justify-content: flex-start;
          align-items: center;

          img {
            width: 30px;
            height: 30px;
            margin-right: 10px;
          }
        }

        span {
          width: 20%;
        }

        p {
          width: 95%;
          padding-top: 10px;
          margin: 0;
          margin-left: 40px;
          font-size: 15px;
        }
      }
    }

    &-edit {
      width: 100%;
      height: 7%;
      border-top: 1px solid rgba(235, 235, 235, 0.6);
      display: flex;
      justify-content: space-around;
      align-items: center;

      input {
        width: 75%;
        height: 60%;
        outline: none;
        border-radius: 5px;
        border: 1px solid #8590a6;
        padding: 0 2%;
      }

      input:focus {
        border: 1px solid #000;
      }

      button {
        width: 10%;
        height: 60%;
        color: white;
        background-color: #80c2ff;
        cursor: auto;
      }

      .btn-disable {
        cursor: pointer;
        background-color: #0084ff;
      }
      .btn-disable:hover {
        background-color: #0077e6;
      }
    }
  }
}
</style>