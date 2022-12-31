<template>
    <div class="page-component__content">
        <h3>基础用法</h3>
        <div class="demo-block">
            <e-tag>标签一</e-tag>
            <e-tag type="success">标签二</e-tag>
            <e-tag type="info">标签三</e-tag>
            <e-tag type="warning">标签四</e-tag>
            <e-tag type="danger">标签五</e-tag>
        </div>
        <h3>可移除标签</h3>
        <div class="demo-block">
            <e-tag v-for="tag in tags" :key="tag.name" closable :type="tag.type">
                {{ tag.name }}
            </e-tag>
        </div>
        <h3>动态编辑标签</h3>
        <div class="demo-block">
            <e-tag :key="tag" v-for="tag in dynamicTags" closable :disable-transitions="false"
                @close="handleClose(tag)">
                {{ tag }}
            </e-tag>
            <e-input class="input-new-tag" v-if="inputVisible" v-model="inputValue" ref="saveTagInput" size="small"
                @keyup.enter.native="handleInputConfirm" @blur="handleInputConfirm">
            </e-input>
            <e-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</e-button>
        </div>
        <h3>不同尺寸</h3>
        <div class="demo-block">
            <e-tag closable>默认标签</e-tag>
            <e-tag size="medium" closable>中等标签</e-tag>
            <e-tag size="small" closable>小型标签</e-tag>
            <e-tag size="mini" closable>超小标签</e-tag>
        </div>
        <h3>不同主题</h3>
        <div class="demo-block">
            <span class="tag-group__title">Dark</span>
            <e-tag v-for="item in items" :key="item.label" :type="item.type" effect="dark">
                {{ item.label }}
            </e-tag>
        </div>
        <div class="demo-block">
            <span class="tag-group__title">Plain</span>
            <e-tag v-for="item in items" :key="item.label" :type="item.type" effect="plain">
                {{ item.label }}
            </e-tag>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            tags: [
                { name: '标签一', type: '' },
                { name: '标签二', type: 'success' },
                { name: '标签三', type: 'info' },
                { name: '标签四', type: 'warning' },
                { name: '标签五', type: 'danger' }
            ],
            items: [
                { type: '', label: '标签一' },
                { type: 'success', label: '标签二' },
                { type: 'info', label: '标签三' },
                { type: 'danger', label: '标签四' },
                { type: 'warning', label: '标签五' }
            ],
            dynamicTags: ['标签一', '标签二', '标签三'],
            inputVisible: false,
            inputValue: ''
        };
    },
    methods: {
        handleClose(tag) {
            this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
        },

        showInput() {
            this.inputVisible = true;
            this.$nextTick(_ => {
                this.$refs.saveTagInput.$refs.input.focus();
            });
        },

        handleInputConfirm() {
            let inputValue = this.inputValue;
            if (inputValue) {
                this.dynamicTags.push(inputValue);
            }
            this.inputVisible = false;
            this.inputValue = '';
        }
    }
}
</script>

<style lang="scss">
.demo-block {
    .e-tag {
        margin-left: 10px;
    }
}
</style>