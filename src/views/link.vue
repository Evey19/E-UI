<template>
    <div class="page-component__content">
        <h3>基础用法</h3>
        <div class="demo-block">
            <e-link href="https://element.eleme.io" target="_blank">默认链接</e-link>
            <e-link type="primary">主要链接</e-link>
            <e-link type="success">成功链接</e-link>
            <e-link type="warning">警告链接</e-link>
            <e-link type="danger">危险链接</e-link>
            <e-link type="info">信息链接</e-link>
        </div>
        <h3>禁用状态</h3>
        <div class="demo-block">
            <e-link disabled>默认链接</e-link>
            <e-link type="primary" disabled>主要链接</e-link>
            <e-link type="success" disabled>成功链接</e-link>
            <e-link type="warning" disabled>警告链接</e-link>
            <e-link type="danger" disabled>危险链接</e-link>
            <e-link type="info" disabled>信息链接</e-link>
        </div>
        <h3>下划线</h3>
        <div class="demo-block">
            <e-link :underline="false">无下划线</e-link>
            <e-link>有下划线</e-link>
        </div>
        <h3>图标</h3>
        <div class="demo-block">
            <e-link icon="el-icon-edit">编辑</e-link>
            <e-link>查看<i class="el-icon-view el-icon--right"></i> </e-link>
        </div>
    </div>
</template>

<style lang="scss">
.demo-block {
    .e-link {
        margin-left: 10px;
    }
}
</style>