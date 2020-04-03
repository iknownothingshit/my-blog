<template>
  <!-- 截图插件的容器 -->
  <div class="cropper-container">
    <div :class="(fade == 'in'?'fadeIn':'fadeOut')">
      <img src="@/assets/close.png" @click="close('cancel')" />
      <h2>编辑头像</h2>
      <vueCropper
        :img="previewImg"
        :autoCrop="true"
        :canScale="true"
        :canMove="false"
        :fixedBox="true"
        :autoCropWidth="200"
        :autoCropHeight="200"
        :enlarge="3"
        class="cropper"
        ref="cropper"
      ></vueCropper>
      <button @click="confirm">确定</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    previewImg: String //原图url
  },
  data() {
    return {
      fade: "in", //控制展示与收起动画
      uploadImg: ""
    };
  },
  methods: {
    //确认截图，并把生成的base64传到后台
    confirm() {
      this.$refs.cropper.getCropData(data => {
        this.close(data);
      });
    },
    // 关闭插件
    close(data) {
      this.fade = "out";
      setTimeout(() => {
        this.$emit("close", data);
      }, 500);
    }
  }
};
</script> 
<style lang="less" scoped>
.cropper-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 20;
  display: flex;
  align-items: center;
  justify-content: center;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(50px);
    }

    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes fadeOut {
    to {
      opacity: 0;
      transform: translateY(50px);
    }

    from {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .fadeIn {
    animation: fadeIn 0.7s;
  }
  .fadeOut {
    animation: fadeOut 0.7s;
  }

  div {
    height: 500px;
    padding: 0 30px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    background-color: white;
    position: relative;

    img {
      position: absolute;
      right: -30px;
      top: 5px;
      width: 15px;
      height: auto;
      cursor: pointer;
    }

    h2 {
      font-weight: 100;
    }

    .cropper {
      width: 260px;
      height: 260px;
    }

    .cropper > :nth-child(1) {
      background-color: #f6f6f6 !important;
    }

    button {
      background-color: #0084ff;
      width: 40%;
      color: white;
      height: 40px;
    }
    button:hover {
      background-color: #0068c9;
    }
  }
}
</style>