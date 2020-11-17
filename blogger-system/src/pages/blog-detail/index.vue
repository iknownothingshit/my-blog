<template>
  <!-- 博客具体内容页 -->
  <div class="detail">
    <section class="detail-title">
      <h2>{{ blog.text_title }}</h2>
      <button :class="{ praised: blog.isPraise }" @click="praiseUp">
        ▲ 赞 {{ blog.praiseNum }}
      </button>
      <div @click="openComBox">
        <img src="@/assets/comment.png" alt />
        {{ allComments.length ? `${allComments.length}条评论` : "添加评论" }}
      </div>
    </section>
    <commentBox v-if="showComment" :allComments="allComments" />
    <section class="detail-content">
      <mavon-editor
        class="editor"
        v-model="blog.text"
        defaultOpen="preview"
        :toolbarsFlag="false"
        :subfield="false"
        ref="md"
      />
      <div class="author">
        关于作者
        <img
          :src="
            author.userAvatars
              ? `api/images/${author.userAvatars}`
              : '@/assets/user.jpg'
          "
          alt
        />
        <p>{{ author.name }}</p>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      blog: {}, // 文章
      showComment: false, // 控制评论框的显示和隐藏
      author: {}, // 当前文章作者
      user: "", // 当前用户信息
      allComments: [], // 当前文章的所有评论
    };
  },
  async mounted() {
    document.scrollingElement.scrollTop = 0; //让页面滚动到最顶部
    this.user = JSON.parse(sessionStorage.getItem("user"));
    this.init();
  },
  methods: {
    // 初始化
    async init() {
      this.blog = this.$route.params.blog;
      // 这个if是防止路由前进后退时丢失文章信息
      if (!this.blog) {
        this.blog = JSON.parse(sessionStorage.getItem("curArtical"));
      } else {
        sessionStorage.setItem("curArtical", JSON.stringify(this.blog));
      }
      // 获取文章作者信息
      const author_res = await this.$_api.getUser({ id: this.blog.authorId });
      console.log("本文作者：", author_res);
      if (author_res.data.code) {
        this.author = author_res.data.data;
      }

      // 获取文章评论
      this.fetchComments();
    },
    //打开评论框
    openComBox() {
      this.showComment = true;
    },
    // 关闭评论框
    closeComment() {
      this.showComment = false;
    },
    // 点赞文章
    async praiseUp() {
      if (this.blog.isPraise) return;
      const res = await this.$_api.praiseUp({
        userId: this.user.userId,
        blogId: this.blog.blogId,
      });
      if (res.data.code) {
        this.blog.isPraise = true;
        this.blog.praiseNum++;
      } else {
        console.log("完了点赞这里出问题了");
      }
    },
    // 获取文章评论
    async fetchComments() {
      const comments_res = await this.$_api.fetchComments({
        blogId: this.blog.blogId,
      });
      if (comments_res.data.code) {
        this.allComments = comments_res.data.data.rows;
      } else {
        console.log("获取评论出问题啦");
      }
    },
    // 发表评论
    async comment(data) {
      if (!data) return;
      const res = await this.$_api.comment({
        userName: this.user.name,
        userAvatars: this.user.userAvatars,
        text: data,
        userId: this.user.userId,
        blogId: this.blog.blogId,
      });
      if (res.data.code) {
        this.fetchComments();
      } else {
        console.log("发表评论出问题了");
      }
    },
  },
};
</script>
<style lang="less" scoped>
.praised {
  background-color: #0070f8 !important;
  color: white !important;
  width: 8% !important;
}

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
      max-height: 300px;
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
