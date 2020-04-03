<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  mounted() {
    document.title = "博客系统";
  }
};
</script>

<style>
body {
  margin: 0;
  padding: 0;
}

button {
  border: 0;
  border-radius: 5px;
  outline: none;
  cursor: pointer;
}
</style>
