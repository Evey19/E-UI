<template>
    <div class="page-component__content">
        <h3>基础用法</h3>
        <div class="demo-block">
            <e-badge :value="12" class="item">
                <e-button size="small">评论</e-button>
            </e-badge>
            <e-badge :value="3" class="item">
                <e-button size="small">回复</e-button>
            </e-badge>
            <e-badge :value="1" class="item" type="primary">
                <e-button size="small">评论</e-button>
            </e-badge>
            <e-badge :value="2" class="item" type="warning">
                <e-button size="small">回复</e-button>
            </e-badge>
        </div>
        <h3>最大值</h3>
        <div class="demo-block">
            <e-badge :value="200" :max="99" class="item">
                <e-button size="small">评论</e-button>
            </e-badge>
            <e-badge :value="100" :max="10" class="item">
                <e-button size="small">回复</e-button>
            </e-badge>
        </div>
        <h3>自定义内容</h3>
        <div class="demo-block">
            <e-badge value="new" class="item">
                <e-button size="small">评论</e-button>
            </e-badge>
            <e-badge value="hot" class="item">
                <e-button size="small">回复</e-button>
            </e-badge>
        </div>
        <h3>小红点</h3>
        <div class="demo-block">
            <e-badge is-dot class="item">数据查询</e-badge>
            <e-badge is-dot class="item">
                <e-button class="share-button" icon="el-icon-share" type="primary"></e-button>
            </e-badge>
        </div>
    </div>
</template>

<style>
.item {
    margin-top: 10px;
    margin-right: 40px;
}
</style>