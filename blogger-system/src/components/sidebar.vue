<template>
  <div class="sidebar" ref="tools">
    <img class="advertisement" src="@/assets/ad.jpg" alt="" />
    <section :class="{ tools: true, 'slide-control': isToolBarReachTop }">
      <div class="tools-item">
        <img src="@/assets/report.png" alt="" />
        <p>举报反馈</p>
      </div>
      <div class="tools-item">
        <img src="@/assets/service.png" alt="" />
        <p>客服中心</p>
      </div>
      <div class="tools-item">
        <img src="@/assets/help.png" alt="" />
        <p>帮助</p>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isToolBarReachTop: false,
    };
  },
  methods: {
    scrollHandler(e) {
      // 下拉时将工具栏固定在顶部
      let tools = this.$refs.tools.getBoundingClientRect().top;
      if (tools <= -194) {
        this.isToolBarReachTop = true;
      } else {
        this.isToolBarReachTop = false;
      }
    },
  },
  mounted() {
    document.scrollingElement.scrollTop = 0; //让页面滚动到最顶部
    window.addEventListener("scroll", this.scrollHandler);
  },
  destroyed() {
    window.removeEventListener("scroll", this.scrollHandler);
  },
};
</script>

<style lang="less" scoped>
.sidebar {
  width: 15%;
  margin-left: 1%;

  .advertisement {
    width: 100%;
    height: auto;
  }

  .tools {
    width: 100%;
    margin-top: 10px;
    background-color: white;
    padding: 20px 0;

    .tools-item {
      display: flex;
      justify-content: flex-start;
      align-items: center;

      img {
        width: 7%;
        height: auto;
        margin: 0 10px 0 20px;
      }

      p {
        width: 60%;
        color: #707070;
        margin: 10px 0;
      }
    }

    .tools-item:hover {
      cursor: pointer;
      background-color: #eee;
    }
  }

  .slide-control {
    width: 15%;
    position: fixed;
    top: 55px;
  }
}
</style>