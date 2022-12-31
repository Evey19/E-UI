<template>
    <div class="page-component__content">
        <div class="demo-block">
            <h3>基础用法</h3>
            <span>默认不区分颜色</span>
            <e-rate v-model="value1"></e-rate>
            <span>区分颜色</span>
            <e-rate v-model="value2" :colors="colors">
            </e-rate>
        </div>
        <div class="demo-block">
            <h3>辅助文字</h3>
            <e-rate v-model="value" show-text>
            </e-rate>
        </div>
        <div class="demo-block">
            <h3>只读</h3>
            <e-rate v-model="value3" disabled text-color="#ff9900" show-score score-template="{value}">
            </e-rate>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            value1: null,
            value2: null,
            value: null,
            value3: 3.7,
            colors: ['#99A9BF', '#F7BA2A', '#FF9900']  // 等同于 { 2: '#99A9BF', 4: { value: '#F7BA2A', excluded: true }, 5: '#FF9900' }
        }
    }
}
</script>