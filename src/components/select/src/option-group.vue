<template>
    <ul class="e-select-group__wrap" v-show="visible">
        <li class="e-select-group__title">{{ label }}</li>
        <li>
            <ul class="e-select-group">
                <slot></slot>
            </ul>
        </li>
    </ul>
</template>

<script>
import Emitter from '@/utils/emitter'
export default {
    mixins: [Emitter],
    name: 'EOptionGroup',
    componentName: 'EOptionGroup',
    props: {
        label: String,
        disabled: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            visible: true
        }
    },
    watch: {
        disabled(val) {
            this.broadcast('EOption', 'handleGrouopDisabled', val)
        }
    },
    methods: {
        queryChange() {
            this.visible = this.$children && Array.isArray(this.$children) && this.$children.some(option => option.visible === true)
        }
    },
    created() {
        this.$on('queryChange', this.queryChange)
    },
    mounted() {
        if (this.disabled) {
            this.broadcast('EOption', 'handleGroupDisabled', this.disabled)
        }
    }
}
</script>