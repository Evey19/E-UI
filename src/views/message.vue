<template>
  <div class="page-component__content">
    <h3>基础用法</h3>
    <div class="demo-block">
      <el-button :plain="true" @click="open">打开消息提示</el-button>
    </div>
    <h3>不同状态</h3>
    <div class="demo-block">
      <el-button :plain="true" @click="open2">成功</el-button>
      <el-button :plain="true" @click="open3">警告</el-button>
      <el-button :plain="true" @click="open1">消息</el-button>
      <el-button :plain="true" @click="open4">错误</el-button>
    </div>
    <h3>文字居中</h3>
    <div class="demo-block">
      <el-button :plain="true" @click="openCenter">文字居中</el-button>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    open() {
      this.$message("这是一条消息提示");
    },
    open1() {
      this.$message("这是一条消息提示");
    },
    open2() {
      this.$message({
        message: "恭喜你，这是一条成功消息",
        type: "success",
      });
    },
    open3() {
      this.$message({
        message: "警告哦，这是一条警告消息",
        type: "warning",
      });
    },
    open4() {
      this.$message({
        message: "错了哦，这是一条错误消息",
        type: "error",
      });
    },
    openCenter() {
      this.$message({
        message: "居中的文字",
        center: true,
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