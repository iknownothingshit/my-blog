<template>
  <!-- 写博客页面 -->
  <div class="blogging">
    <input
      type="text"
      maxlength="50"
      v-model="title"
      placeholder="请输入标题（最多50个字）"
      class="title"
    />
    <section class="blogging-edit" ref="editor">
      <mavon-editor
        :class="{ editor: true, slideControl: isToolBarReachTop }"
        :toolbars="toolbars"
        @imgAdd="imgAdd"
        v-model="blogContent"
        ref="md"
        placeholder="此编辑器可使用markdown语法，语法详情可点击右上角问号哦..."
      />
    </section>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      test: "",
      toolbars: {
        // 编辑器的配置
        bold: true, // 粗体
        italic: true, // 斜体
        header: true, // 标题
        underline: true, // 下划线
        strikethrough: true, // 中划线
        mark: true, // 标记
        superscript: true, // 上角标
        subscript: true, // 下角标
        quote: true, // 引用
        ol: true, // 有序列表
        ul: true, // 无序列表
        link: true, // 链接
        imagelink: true, // 图片链接
        code: true, // code
        table: true, // 表格
        fullscreen: false, // 全屏编辑
        readmodel: true, // 沉浸式阅读
        htmlcode: true, // 展示html源码
        help: true, // 帮助
        /* 1.3.5 */
        undo: true, // 上一步
        redo: true, // 下一步
        trash: true, // 清空
        save: false, // 保存（触发events中的save事件）
        /* 1.4.2 */
        navigation: true, // 导航目录
        /* 2.1.8 */
        alignleft: true, // 左对齐
        aligncenter: true, // 居中
        alignright: true, // 右对齐
        /* 2.2.1 */
        subfield: true, // 单双栏模式
        preview: true, // 预览
      },
      title_img: "", //文章头图
      title: "", // 博客标题
      blogContent: ``, //博客内容
      isToolBarReachTop: false, // 下滑窗口时控制工具栏始终悬浮在顶部
    };
  },
  mounted() {
    document.scrollingElement.scrollTop = 0; //让页面滚动到最顶部
    window.addEventListener("scroll", this.scrollHandler);
    this.$bus.$on("uploadBlog", this.uploadBlog);
  },
  beforeDestroy() {
    this.$bus.$off("uploadBlog");
  },
  destroyed() {
    window.removeEventListener("scroll", this.scrollHandler);
  },
  methods: {
    // 编辑器里的图片上传，说明文档：https://github.com/hinesboy/mavonEditor/blob/master/doc/cn/upload-images.md
    async imgAdd(pos, $file) {
      let formData = new FormData();
      formData.append("file", $file);
      const img_res = await this.$_api.uploadImg(formData);
      if (img_res.data.code) {
        this.$refs.md.$img2Url(pos, `api/images/${img_res.data.data}`);
        this.title_img = img_res.data.data;
      } else {
        console.log(图片上传失败);
      }
    },
    scrollHandler(e) {
      // 下拉时将工具栏固定在顶部
      let editor = this.$refs.editor.getBoundingClientRect().top;
      if (editor <= 55) {
        this.isToolBarReachTop = true;
      } else {
        this.isToolBarReachTop = false;
      }
    },
    // 发表文章
    async uploadBlog() {
      let userMsg = JSON.parse(sessionStorage.getItem("user"));
      if (this.title && this.blogContent) {
        const res = await this.$_api.uploadBlog({
          text_title: this.title,
          text: this.blogContent,
          authorId: userMsg.userId,
          title_img: this.title_img,
        });
        console.log("发表文章的结果：", res);
        if (res.data.code) {
          this.$router.push("/home/home-page");
        }
      }
    },
  },
};
</script>
<style lang="less" scoped>
.blogging {
  margin-left: 20%;
  width: 40%;

  .title {
    width: 96%;
    border: 0;
    outline: none;
    border-bottom: 2px solid #757575;
    padding: 20px 2%;
    font-size: 20px;
    font-weight: 600;
  }

  &-edit {
    width: 100%;

    .editor {
      min-height: 800px;
      width: 100%;
      z-index: 3;
    }

    .slideControl {
    }
    .slideControl > :first-child {
      position: fixed;
      width: 900px;
      top: 55px;
      border-bottom: 1px solid #eeeeee;
    }
  }
}
</style>
