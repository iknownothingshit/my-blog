<template>
  <!-- 博客基本信息框 -->
  <div class="blog">
    <h3 @click="check">{{ artical.text_title }}</h3>
    <section class="blog-content">
      <img src="@/assets/bg.jpg" alt />
      <div>
        {{ artical.text }}
      </div>
    </section>
    <section class="blog-btns">
      <button>▲赞 {{ artical.praiseNum }}</button>
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
  props: {
    artical: {
      type: Object,
      default: () => {
        return {
          text: "这是一个博客",
          text_title: "这是一个博客",
          authorId: 0,
          praiseNum: 0,
          comment_num: 0
        };
      }
    }
  },
  data() {
    return {};
  },
  methods: {
    // 查看博客详情
    check() {
      this.$router.push({
        name: "blog-detail",
        params: { blog: this.artical }
      });
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
