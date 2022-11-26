<template>
  <div class="page-component__content">
    <h3>基本用法</h3>
    <div class="demo-block">
      <e-input v-model="input" placeholder="请输入内容"></e-input>
    </div>
    <h3>禁用状态</h3>
    <div class="demo-block">
      <e-input placeholder="请输入内容" v-model="input" :disabled="true">
      </e-input>
    </div>
    <h3>可清空</h3>
    <div class="demo-block">
      <e-input placeholder="请输入内容" v-model="input2" clearable> </e-input>
    </div>
    <h3>带有偏移</h3>
    <div class="demo-block"></div>
    <h3>隐藏关闭按钮</h3>
    <div class="demo-block"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      input: "",
      input2: "",
    };
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