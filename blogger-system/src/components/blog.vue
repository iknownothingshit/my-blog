<template>
  <!-- 博客基本信息框 -->
  <div class="blog">
    <h3 @click="check">你都见过什么奇奇怪怪的网站</h3>
    <section class="blog-content">
      <img src="@/assets/bg.jpg" alt />
      <div>
        阿里妈妈MUX倾力打造的矢量图标管理、交流平台。
        设计师将图标上传到Iconfont平台，用户可以自定义下载多种格式的icon，平台也可将图标转换为字体，便于前端工程师自由调整与调用。
        ©ALIMAMA MUX, powered by alimama THX.
        转载内容版权归作者及来源网站所有，本站原创内容转载请注明来源，商业媒体及纸媒请先联系：zy99945@alibaba-inc.com
        法律声明浙ICP备09109183号-25浙公网安备 33010002000124号阿里妈妈MUX倾力打造的矢量图标管理、交流平台。
        设计师将图标上传到Iconfont平台，用户可以自定义下载多种格式的icon，平台也可将图标转换为字体，便于前端工程师自由调整与调用。
        ©ALIMAMA MUX, powered by alimama THX.
        转载内容版权归作者及来源网站所有，本站原创内容转载请注明来源，商业媒体及纸媒请先联系：zy99945@alibaba-inc.com
        法律声明浙ICP备09109183号-25浙公网安备 33010002000124号
      </div>
    </section>
    <section class="blog-btns">
      <button>▲赞 5599</button>
      <div>
        <img src="@/assets/comment.png" alt />
        0条评论
      </div>
    </section>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {};
  },
  methods: {
    // 查看博客详情
    check() {
      this.$router.push("/home/blog-detail");
    }
  }
};
</script>
<style lang="less" scoped>
.blog {
  width: 96%;
  padding: 0 2%;
  border: 1px solid #ececec;
  display: flex;
  flex-wrap: wrap;

  h3 {
    margin: 25px 0;
    width: 92%;
    letter-spacing: 2px;
    cursor: pointer;
  }

  h3:hover {
    color: #175199;
  }

  &-content {
    margin-bottom: 20px;
    width: 100%;
    display: flex;
    justify-content: space-between;

    img {
      width: 25%;
      height: auto;
    }

    div {
      width: 73%;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 6;
      -webkit-box-orient: vertical;
    }
  }

  &-btns {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 20px;

    button {
      background-color: #dceeff;
      width: 15%;
      height: 30px;
      color: #0084ff;
      overflow: hidden;
    }
    button:hover {
      background-color: #cae6ff;
    }

    div {
      margin-left: 50px;
      width: 20%;
      height: 30px;
      display: flex;
      align-items: center;
      color: #76839b;

      img {
        width: 12%;
        height: auto;
        margin-right: 10px;
      }
    }
  }
}
</style>