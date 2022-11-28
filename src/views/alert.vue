<template>
  <div class="page-component__content">
    <h3>基本用法</h3>
    <div class="demo-block">
      <e-alert title="成功提示的文案" type="success"> </e-alert>
      <e-alert title="消息提示的文案" type="info"> </e-alert>
      <e-alert title="警告提示的文案" type="warning"> </e-alert>
      <e-alert title="错误提示的文案" type="error"> </e-alert>
    </div>
    <h3>主题</h3>
    <div class="demo-block">
      <e-alert title="成功提示的文案" type="success" effect="dark"> </e-alert>
      <e-alert title="消息提示的文案" type="info" effect="dark"> </e-alert>
      <e-alert title="警告提示的文案" type="warning" effect="dark"> </e-alert>
      <e-alert title="错误提示的文案" type="error" effect="dark"> </e-alert>
    </div>
    <h3>自定义关闭按钮</h3>
    <div class="demo-block">
      <e-alert title="不可关闭的 alert" type="success" :closable="false">
      </e-alert>
      <e-alert title="自定义 close-text" type="info" close-text="知道了">
      </e-alert>
      <e-alert title="设置了回调的 alert" type="warning" @close="hello">
      </e-alert>
    </div>
    <h3>带有 icon</h3>
    <div class="demo-block">
      <e-alert title="成功提示的文案" type="success" show-icon> </e-alert>
      <e-alert title="消息提示的文案" type="info" show-icon> </e-alert>
      <e-alert title="警告提示的文案" type="warning" show-icon> </e-alert>
      <e-alert title="错误提示的文案" type="error" show-icon> </e-alert>
    </div>
    <h3>文字居中</h3>
    <div class="demo-block">
      <e-alert title="成功提示的文案" type="success" center show-icon>
      </e-alert>
      <e-alert title="消息提示的文案" type="info" center show-icon> </e-alert>
      <e-alert title="警告提示的文案" type="warning" center show-icon>
      </e-alert>
      <e-alert title="错误提示的文案" type="error" center show-icon> </e-alert>
    </div>
    <h3>带有辅助性文字介绍</h3>
    <div class="demo-block">
      <e-alert
        title="带辅助性文字介绍"
        type="success"
        description="这是一句绕口令：黑灰化肥会挥发发灰黑化肥挥发；灰黑化肥会挥发发黑灰化肥发挥。 黑灰化肥会挥发发灰黑化肥黑灰挥发化为灰……"
      >
      </e-alert>
    </div>
    <h3>带有 icon 和辅助性文字介绍</h3>
    <div class="demo-block">
      <e-alert
        title="成功提示的文案"
        type="success"
        description="文字说明文字说明文字说明文字说明文字说明文字说明"
        show-icon
      >
      </e-alert>
      <e-alert
        title="消息提示的文案"
        type="info"
        description="文字说明文字说明文字说明文字说明文字说明文字说明"
        show-icon
      >
      </e-alert>
      <e-alert
        title="警告提示的文案"
        type="warning"
        description="文字说明文字说明文字说明文字说明文字说明文字说明"
        show-icon
      >
      </e-alert>
      <e-alert
        title="错误提示的文案"
        type="error"
        description="文字说明文字说明文字说明文字说明文字说明文字说明"
        show-icon
      >
      </e-alert>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    hello() {
      alert("Hello World!");
    },
  },
};
</script>

<style lang="scss">
.demo-block {
  .e-alert {
    margin: 20px 0;
  }
}
</style>