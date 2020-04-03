<template>
  <!-- 博客具体内容页 -->
  <div class="detail">
    <section class="detail-title">
      <h2>你用过哪些好看到炸裂的壁纸？</h2>
      <button>▲赞 5599</button>
      <div @click="openComBox">
        <img src="@/assets/comment.png" alt />
        添加评论
      </div>
    </section>
    <commentBox v-if="showComment" />
    <section class="detail-content">
      <mavon-editor
        class="editor"
        v-model="blogContent"
        defaultOpen="preview"
        :toolbarsFlag="false"
        :subfield="false"
        ref="md"
      />
      <div class="author">
        关于作者
        <img src="@/assets/user.jpg" alt />
        <p>新建文件夹</p>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      blogContent: "",
      showComment: false
    };
  },
  methods: {
    //打开评论框
    openComBox() {
      this.showComment = true;
    },
    // 关闭评论框
    closeComment() {
      this.showComment = false;
    }
  }
};
</script>
<style lang="less" scoped>
.detail {
  width: 100%;

  &-title {
    padding-left: 200px;
    margin-bottom: 10px;
    height: 120px;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    background-color: white;
    border: 1px solid #ececec;

    h2 {
      width: 100%;
    }

    button {
      background-color: #dceeff;
      width: 7%;
      height: 30px;
      color: #0084ff;
      overflow: hidden;
    }
    button:hover {
      background-color: #cae6ff;
    }

    div {
      cursor: pointer;
      margin-left: 50px;
      width: 10%;
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

  &-content {
    width: 60%;
    padding-left: 200px;
    display: flex;
    flex-wrap: nowrap;

    .editor {
      width: 80%;
      z-index: 3;
    }

    .author {
      background-color: white;
      width: 18%;
      margin-left: 2%;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;

      img {
        width: 80%;
        height: auto;
      }
    }
  }
}
</style>