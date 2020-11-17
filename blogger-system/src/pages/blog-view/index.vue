<template>
  <!-- 主页 -->
  <div class="blog-view">
    <img src="@/assets/bg01.jpg" alt class="bg-horizontal" />
    <section class="blog-view-content">
      <blog v-for="(e, i) in articals" :key="i" :artical="e" :delay="i" />
    </section>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      articals: [], // 文章
    };
  },
  async mounted() {
    const res = await this.$_api.fetchArticals({ page: 0 });
    console.log("文章：", res);
    if (res.data.code) {
      this.articals = res.data.data.rows;
      console.log(`当前文章总数：${res.data.data.count}`);
    }
  },
  methods: {},
};
</script>
<style lang="less" scoped>
.bg-horizontal {
  width: 100%;
  height: auto;
  margin-bottom: 20px;
}

.blog-view {
  width: 40%;
  min-height: 90vh;
  margin-left: 20%;
  position: relative;

  &-content {
    background-color: white;
  }
}
</style>
