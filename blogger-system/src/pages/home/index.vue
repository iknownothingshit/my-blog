<template>
  <!-- 主页容器 -->
  <div class="home">
    <topNav />
    <router-view />
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {};
  },
  methods: {}
};
</script>
<style scoped>
.home {
  background-color: #f6f6f6;
  width: 100%;
  min-height: 100vh;
  padding-top: 65px;
  display: flex;
}
</style>