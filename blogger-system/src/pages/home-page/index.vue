<template>
  <!-- 我的主页 -->
  <div class>
    <section class="user">
      <div class="user-head" @mouseover="headMouseOver" @mouseout="headMouseOut">
        <input type="file" id="head" accept="image/*" @change="openCropper" ref="head" />
        <cropper v-if="showCropper" @close="closeCropper($event)" :previewImg="previewImg" />
        <img :src="userHead" alt class="user-head-img" />
        <div class="user-head-hover" ref="headHover">
          <img src="@/assets/upload.png" alt />
          <label for>点击修改头像</label>
        </div>
      </div>
      <div class="user-name">
        <h2 tabindex="0" @click="changeName" v-if="!changeControl">{{nickName}}</h2>
        <div class="user-name-changebox" v-if="changeControl">
          <input type="text" v-model="newName" />
          <button class="save">保存</button>
          <button class="cancel" @click="cancel">取消</button>
        </div>
      </div>
    </section>

    <section class="my-blog">
      <div class="my-blog-title">我的博客</div>
      <blog />
    </section>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      showCropper: false, // 控制截图插件的显示与隐藏
      previewImg: "", // 截图照片
      userHead: require("@/assets/user.jpg"),
      nickName: "派大星",
      newName: "", //修改后的昵称
      changeControl: false // 控制昵称修改框的显示
    };
  },
  methods: {
    //关闭截图插件并获取返回的数据
    closeCropper(data) {
      this.showCropper = false;
      if (data === "cancel") {
        // 若取消上传则清空input的值
        this.$refs.head.value = "";
      } else {
        this.userHead = data;
      }
    },
    // 点击打开截图插件
    openCropper() {
      this.showCropper = true;
      let head = document.getElementById("head").files[0];
      let read = new FileReader();
      read.readAsDataURL(head);
      let that = this;
      read.onload = function() {
        that.previewImg = this.result;
      };
    },
    // 点击上传头像
    uploadHead() {},
    //隐藏昵称修改框
    cancel() {
      this.changeControl = false;
      this.newName = "";
    },
    changeName() {
      this.changeControl = true;
      this.newName = this.nickName;
    },
    // 鼠标悬停于头像时显示hover
    headMouseOver() {
      this.$refs.headHover.style.opacity = 1;
    },
    headMouseOut() {
      this.$refs.headHover.style.opacity = 0;
    }
  }
};
</script>
<style lang="less" scoped>
.my-blog {
  width: 50%;
  margin-left: 200px;
  margin-top: 30px;
  border-top: 1px solid #ececec;

  &-title {
    width: 98%;
    border-bottom: 1px solid #d8d8d8;
    margin-top: 10px;
    padding-bottom: 20px;
    padding-left: 2%;
  }
}

.user {
  margin-left: 200px;
  height: 1px;
  width: 50%;
  border-top: 140px solid #999999;
  border-bottom: 140px solid white;
  position: relative;

  &-head {
    position: absolute;
    left: 10%;
    top: -60px;
    height: 130px;
    width: 130px;
    overflow: hidden;
    border: 2px solid white;
    border-radius: 5px;

    &-hover {
      height: 100%;
      width: 100%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 3;
      background-color: rgba(0, 0, 0, 0.65);
      opacity: 0;
      text-align: center;
      color: white;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-around;
      transition: opacity 0.7s;

      img {
        height: auto;
        width: 25%;
      }
    }

    &-img {
      width: 100%;
      height: 100%;
    }

    input {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 4;
      opacity: 0;
      cursor: pointer;
    }
  }

  &-name {
    position: absolute;
    left: 28%;

    &-changebox {
      width: 400px;
      margin: 10px 0;
      display: flex;
      justify-content: space-between;
      align-items: center;

      input {
        padding-left: 4%;
        width: 66%;
        height: 40px;
        outline: none;
        border: 1px solid #999999;
        border-radius: 3px;
      }

      button {
        width: 13%;
        height: 40px;
        color: white;
        border: 0;
        outline: none;
        border-radius: 5px;
        cursor: pointer;
      }

      .save {
        background-color: #0077e6;
      }
      .save:hover {
        background-color: #0068ca;
      }
      .cancel {
        background-color: #999999;
      }
      .cancel:hover {
        background-color: #7c7c7c;
      }
    }

    h2 {
      outline: none;
      margin: 10px 0;
    }
  }

  &-name:hover {
    h2::after {
      content: "🖊 修改";
      font-size: 15px;
      font-weight: 200;
      color: #999999;
      margin-left: 15px;
      cursor: pointer;
    }
  }
}
</style>