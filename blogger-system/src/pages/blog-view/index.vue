<template>
  <!-- 主页 -->
  <div class="blog-view">
    <img src="@/assets/bg01.jpg" alt class="bg-horizontal" />
    <img src="@/assets/bg02.jpg" alt class="bg-vertical" />
    <section class="blog-view-content">
      <blog v-for="(e, i) in articals" :key="i" :artical="e" />
    </section>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      articals: [] // 文章
    };
  },
  async mounted() {
    const res = await this.$_api.fetchArticals({ page: 0 });
    console.log("文章：", res);
    if (res.data.code) {
      this.articals = res.data.data;
    }
  },
  methods: {}
};
</script>
<style lang="less" scoped>
.bg-vertical {
  transform: translate3d(510%, 0, 0);
  top: 65px;
  position: fixed;
  width: 10%;
  height: auto;
}

.bg-horizontal {
  width: 100%;
  height: auto;
  margin-bottom: 20px;
}

.blog-view {
  width: 50%;
  min-height: 90vh;
  margin-left: 200px;
  position: relative;

  &-content {
    background-color: white;
  }
}
</style>
