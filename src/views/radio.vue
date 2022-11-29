<template>
  <div class="page-component__content">
    <h3>基础用法</h3>
    <div class="demo-block">
      <e-radio v-model="radio" label="1">备选项</e-radio>
      <e-radio v-model="radio" label="2">备选项</e-radio>
    </div>
    <h3>禁用状态</h3>
    <div class="demo-block">
      <e-radio disabled v-model="radio" label="禁用">备选项</e-radio>
      <e-radio disabled v-model="radio" label="选中且禁用">备选项</e-radio>
    </div>
    <h3>单选框组</h3>
    <div class="demo-block">
      <e-radio-group v-model="radio2">
        <e-radio :label="3">备选项</e-radio>
        <e-radio :label="6">备选项</e-radio>
        <e-radio :label="9">备选项</e-radio>
      </e-radio-group>
    </div>
    <h3>按钮样式</h3>
    <div class="demo-block">
      <e-radio-group v-model="radio1">
        <e-radio-button label="上海"></e-radio-button>
        <e-radio-button label="北京"></e-radio-button>
        <e-radio-button label="广州"></e-radio-button>
        <e-radio-button label="深圳"></e-radio-button>
      </e-radio-group>
    </div>
    <h3>带有边框</h3>
    <div class="demo-block">
      <e-radio v-model="radio3" label="1" border>备选项1</e-radio>
      <e-radio v-model="radio3" label="2" border>备选项2</e-radio>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      radio: "1",
      radio1: "深圳",
      radio2: 3,
      radio3: "1",
    };
  },
};
</script>