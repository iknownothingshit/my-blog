<template>
  <!-- 博客基本信息框 -->
  <div class="blog delayShow" :style="{ 'animation-delay': `${delay * 0.2}s` }">
    <h3 @click="check">{{ artical.text_title }}</h3>
    <section class="blog-content">
      <div class="blog-content-img" v-if="artical.title_img">
        <img :src="`api/images/${artical.title_img}`" alt />
      </div>
      <div>
        {{ artical.text }}
      </div>
    </section>
    <section class="blog-btns">
      <button :class="{ praised: isPraise }" @click="praiseUp">
        ▲ 赞 {{ artical.praiseNum }}
      </button>
      <div>
        <img src="@/assets/comment.png" alt />
        {{ artical.comment_num ? `${artical.comment_num}条评论` : "暂无评论" }}
      </div>
    </section>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    delay: {
      // 动画延迟
      type: Number,
      default: 0,
    },
    artical: {
      // 文章信息
      type: Object,
      default: () => {
        return {
          text: "这是一个博客",
          text_title: "这是一个博客",
          authorId: 0,
          praiseNum: 0,
          comment_num: 0,
          praise_user: [],
          title_img: "",
        };
      },
    },
  },
  data() {
    return {
      userId: "", // 当前用户的id
      isPraise: false, // 用户是否已点赞当前文章
    };
  },
  async mounted() {
    this.userId = JSON.parse(sessionStorage.getItem("user")).userId;
    // 查看当前用户是否已点赞文章
    this.isPraise = JSON.parse(this.artical.praise_user).includes(this.userId);
    this.artical.isPraise = this.isPraise;
  },
  methods: {
    // 查看博客详情
    check() {
      this.$router.push({
        name: "blog-detail",
        params: { blog: this.artical },
      });
    },
    // 点赞文章
    async praiseUp() {
      if (this.isPraise) return;
      const res = await this.$_api.praiseUp({
        userId: this.userId,
        blogId: this.artical.blogId,
      });
      if (res.data.code) {
        this.isPraise = true;
        this.artical.praiseNum++;
        this.artical.isPraise = true;
      } else {
        console.log("完了点赞这里出问题了");
      }
    },
  },
};
</script>
<style lang="less" scoped>
.praised {
  background-color: #0070f8 !important;
  color: white !important;
  width: 16% !important;
}

.delayShow {
  animation: delayShow 0.5s linear forwards;
}

@keyframes delayShow {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.blog {
  opacity: 0;
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

    &-img {
      width: 25% !important;
      height: 100px;
      overflow: hidden;

      img {
        width: 100%;
        height: auto;
      }
    }

    div {
      width: 73%;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 3;
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
