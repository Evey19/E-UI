<template>
  <div class="page-component__content">
    <h3>基础用法</h3>
    <div class="demo-block">
      <e-button>默认按钮</e-button>
      <e-button type="primary">主要按钮</e-button>
      <e-button type="success">成功按钮</e-button>
      <e-button type="info">信息按钮</e-button>
      <e-button type="warning">警告按钮</e-button>
      <e-button type="danger">危险按钮</e-button>
    </div>
    <h3>禁用状态</h3>
    <div class="demo-block">
      <e-button disabled>默认按钮</e-button>
      <e-button type="primary" disabled>主要按钮</e-button>
      <e-button type="success" disabled>成功按钮</e-button>
      <e-button type="info" disabled>信息按钮</e-button>
      <e-button type="warning" disabled>警告按钮</e-button>
      <e-button type="danger" disabled>危险按钮</e-button>
    </div>
    <h3>文字按钮</h3>
    <div class="demo-block">
      <e-button type="text">文字按钮</e-button>
      <e-button type="text" disabled>文字按钮</e-button>
    </div>
    <h3>图标按钮</h3>
    <div class="demo-block">
      <e-button type="primary" icon="el-icon-edit"></e-button>
      <e-button type="primary" icon="el-icon-share"></e-button>
      <e-button type="primary" icon="el-icon-delete"></e-button>
      <e-button type="primary" icon="el-icon-search">搜索</e-button>
      <e-button type="primary"
        >上传<i class="el-icon-upload el-icon--right"></i
      ></e-button>
    </div>
    <h3>加载中</h3>
    <div class="demo-block">
      <e-button type="primary" :loading="true">加载中</e-button>
    </div>
    <h3>不同尺寸</h3>
    <div class="demo-block">
      <e-button>默认按钮</e-button>
      <e-button size="medium">中等按钮</e-button>
      <e-button size="small">小型按钮</e-button>
      <e-button size="mini">超小按钮</e-button>
    </div>
    <h3>按钮组</h3>
    <div class="demo-block">
      <e-button-group>
        <e-button type="primary" icon="el-icon-arrow-left">上一页</e-button>
        <e-button type="primary"
          >下一页<i class="el-icon-arrow-right el-icon--right"></i
        ></e-button>
      </e-button-group>
    </div>
  </div>
</template>