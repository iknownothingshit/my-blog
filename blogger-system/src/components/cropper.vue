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
        let file = this.getFileFromBase64(data, "file");
        this.close("", data, file);
      });
    },
    // 关闭插件
    close(msg, base64, file) {
      this.fade = "out";
      let data = {
        msg: msg,
        base64: base64,
        file: file
      };
      setTimeout(() => {
        this.$emit("close", data);
      }, 500);
    },
    // 将base64数据转换成file类型
    getFileFromBase64(base64URL, filename) {
      var arr = base64URL.split(","),
        mime = arr[0].match(/:(.*?);/)[1], // 截取mime 为 图片类型 例：image/jpeg
        bstr = atob(arr[1]), // atob()用于解码使用 base-64 编码的字符串
        n = bstr.length,
        u8arr = new Uint8Array(n); // Uint8Array 数组类型表示一个8位无符号整型数组，创建时内容被初始化为0。创建完后，可以以对象的方式或使用数组下标索引的方式引用数组中的元素。
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n); // charCodeAt() 方法可返回指定位置的字符的 Unicode 编码
      }
      return new File([u8arr], filename, { type: mime });
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