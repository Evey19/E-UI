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
    <h3>密码框</h3>
    <div class="demo-block">
      <e-input placeholder="请输入密码" v-model="input" show-password></e-input>
    </div>
    <h3>文本域</h3>
    <div class="demo-block">
      <e-input
        type="textarea"
        :rows="2"
        placeholder="请输入内容"
        v-model="textarea"
      >
      </e-input>
    </div>
    <h3>可自适应文本高度的文本域</h3>
    <div class="demo-block">
      <e-input
        type="textarea"
        autosize
        placeholder="请输入内容"
        v-model="textarea1"
      >
      </e-input>
      <div style="margin: 20px 0"></div>
      <e-input
        type="textarea"
        :autosize="{ minRows: 2, maxRows: 4 }"
        placeholder="请输入内容"
        v-model="textarea2"
      >
      </e-input>
    </div>
    <h3>输入长度限制</h3>
    <div class="demo-block">
      <e-input
        type="text"
        placeholder="请输入内容"
        v-model="text"
        maxlength="10"
        show-word-limit
      >
      </e-input>
    </div>
    <h3>复合型输入框</h3>
    <div class="demo-block">
      <e-input placeholder="请输入内容" v-model="input2">
        <template slot="append">.com</template>
      </e-input>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      input: "",
      input1: "",
      input2: "",
      textarea: "",
      textarea1: "",
      textarea2: "",
      text: "",
    };
  },
};
</script>
