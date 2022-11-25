<template>
  <div class="page-component__content">
    <h3>基本用法</h3>
    <div class="demo-block">
      <el-button plain @click="open1"> 可自动关闭 </el-button>
      <el-button plain @click="open2"> 不会自动关闭 </el-button>
    </div>
    <h3>自定义弹出位置</h3>
    <div class="demo-block">
      <el-button plain @click="open3"> 右上角 </el-button>
      <el-button plain @click="open4"> 右下角 </el-button>
      <el-button plain @click="open5"> 左下角 </el-button>
      <el-button plain @click="open6"> 左上角 </el-button>
    </div>
    <h3>带有icon</h3>
    <div class="demo-block">
      <el-button plain @click="open7"> 成功 </el-button>
      <el-button plain @click="open8"> 警告 </el-button>
      <el-button plain @click="open9"> 消息 </el-button>
      <el-button plain @click="open10"> 错误 </el-button>
    </div>
    <h3>带有偏移</h3>
    <div class="demo-block">
      <el-button plain @click="open11"> 偏移的消息 </el-button>
    </div>
    <h3>隐藏关闭按钮</h3>
    <div class="demo-block">
      <el-button plain @click="open12"> 隐藏关闭按钮 </el-button>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    open1() {
      this.$notify({
        title: "标题名称",
        message: "这是提示",
      });
    },
    open2() {
      this.$notify({
        title: "提示",
        message: "这是一条不会自动关闭的消息",
        duration: 0,
      });
    },
    open3() {
      this.$notify({
        title: "自定义位置",
        message: "右上角弹出的消息",
      });
    },

    open4() {
      this.$notify({
        title: "自定义位置",
        message: "右下角弹出的消息",
        position: "bottom-right",
      });
    },

    open5() {
      this.$notify({
        title: "自定义位置",
        message: "左下角弹出的消息",
        position: "bottom-left",
      });
    },

    open6() {
      this.$notify({
        title: "自定义位置",
        message: "左上角弹出的消息",
        position: "top-left",
      });
    },
    open7() {
      this.$notify({
        title: "成功",
        message: "这是一条成功的提示消息",
        type: "success",
      });
    },

    open8() {
      this.$notify({
        title: "警告",
        message: "这是一条警告的提示消息",
        type: "warning",
      });
    },

    open9() {
      this.$notify({
        title: "消息",
        message: "这是一条消息的提示消息",
        type: "info",
      });
    },

    open10() {
      this.$notify({
        title: "错误",
        message: "这是一条错误的提示消息",
        type: "error",
      });
    },
    open11() {
      this.$notify({
        title: "偏移",
        message: "这是一条带有偏移的提示消息",
        offset: 100,
      });
    },
    open12() {
      this.$notify({
        title: "Info",
        message: "这是一条没有关闭按钮的消息",
        showClose: false,
        type:'success'
      });
    },
  },
};
</script>

<style>
.page-component__content {
  width: 868px;
  padding-bottom: 100px;
  box-sizing: border-box;
}
.demo-block {
  border: 1px solid #ebebeb;
  border-radius: 3px;
  margin-bottom: 24px;
  padding: 24px;
}
</style>