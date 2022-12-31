<template>
    <li @mouseenter="hoverItem" @click.stop="selectOptionClick" class="e-select-dropdown__item" v-show="visible"
        :class="{'selected':itemSelected,'is-disabled':disabled||groupDisabled||limitReached,'hover':hover}">
        <slot>
            <span>{{ currentLabel }}</span>
        </slot>
    </li>
</template>

<script>
import Emitter from '@/utils/emitter'
import { getValueByPath } from '@/utils/util'
export default {
    mixins: [Emitter],
    name: 'EOption',
    componentName: 'EOption',
    inject: ['select'],
    props: {
        value: {
            required: true
        },
        label: [String, Number],
        created: Boolean,
        disabled: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            index: -1,
            groupDisabled: false,
            visible: true,
            hitState: false,
            hover: false
        }
    },
    computed: {
        isObject() {
            return Object.prototype.toString.call(this.value).toLowerCase() === '[object object]'
        },
        currentLabel() {
            return this.label || (this.isObject ? '' : this.value)
        },
        currentValue() {
            return this.value || this.label || ''
        },
        itemSelected() {
            if (!this.select.multiple) {
                return this.isEqual(this.value, this.select.value)
            } else {
                return this.contains(this.select.value, this.value)
            }
        },
        limitReached() {
            if (this.select.multiple) {
                return !this.itemSelected && (this.select.value || []).length >= this.select.multipleLimit && this.select.multipleLimit > 0
            } else {
                return false
            }
        }
    },
    methods: {
        isEqual(a, b) {
            if (!this.isObject) {
                return a === b
            } else {
                const valueKey = this.select.valueKey
                return getValueByPath(a, valueKey) === getValueByPath(b, valueKey)
            }
        },
        contains(arr = [], target) {
            if (!this.isObject) {
                return arr && arr.indexOf(target) > -1
            } else {
                const valueKey = this.select.valueKey
                return arr && arr.some(item => {
                    return getValueByPath(item, valueKey) === getValueByPath(target, valueKey)
                })
            }
        },
        hoverItem() {
            if (!this.disabled && !this.groupDisabled) {
                this.select.hoverIndex = this.select.options.indexOf(this)
            }
        },
        selectOptionClick() {
            if (this.disabled !== true && this.groupDisabled !== true) {
                this.dispatch('ESelect', 'handleOptionClick', [this, true])
            }
        },
        handleGroupDisabled(val) {
            this.groupDisabled = val
        }
    },
    created() {
        this.select.options.push(this)
        this.select.cachedOptions.push(this)
        this.select.optionsCount++
        this.select.filteredOptionsCount++
        this.$on('handleGroupDisabled', this.handleGroupDisabled)
    }
}
</script>