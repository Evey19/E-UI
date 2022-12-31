<template>
    <div class="e-rate">
        <span v-for="(item, key) in max" class="e-rate__item" @mousemove="setCurrentValue(item, $event)"
            @mouseleave="resetCurrentValue" @click="selectValue(item)"
            :style="{ cursor: rateDisabled ? 'auto' : 'pointer' }" :key="key">
            <i :class="[classes[item - 1], { 'hover': hoverIndex === item }]" class="e-rate__icon"
                :style="getIconStyle(item)">
                <i v-if="showDecimalIcon(item)" :class="decimalIconClass" :style="decimalStyle"
                    class="e-rate__decimal"></i>
            </i>
        </span>
        <span v-if="showText || showScore" class="e-rate__text" :style="{ color: textColor }">{{ text }}</span>
    </div>
</template>

<script>
import { isObject } from '@/utils/types';
import { hasClass } from '@/utils/dom'
export default {
    name: 'ERate',
    data() {
        return {
            pointerAtLeftHalf: true,
            currentValue: this.value,
            hoverIndex: -1
        }
    },
    props: {
        value: {
            type: Number,
            default: 0
        },
        lowThreshold: {
            type: Number,
            default: 2
        },
        highThreshold: {
            type: Number,
            default: 4
        },
        max: {
            type: Number,
            default: 5
        },
        colors: {
            type: [Array, Object],
            default() {
                return ['#F7BA2A', '#F7BA2A', '#F7BA2A'];
            }
        },
        voidColor: {
            type: String,
            default: '#C6D1DE'
        },
        disabledVoidColor: {
            type: String,
            default: '#EFF2F7'
        },
        iconClasses: {
            type: [Array, Object],
            default() {
                return ['el-icon-star-on', 'el-icon-star-on', 'el-icon-star-on'];
            }
        },
        voidIconClass: {
            type: String,
            default: 'el-icon-star-off'
        },
        disabledVoidIconClass: {
            type: String,
            default: 'el-icon-star-on'
        },
        disabled: {
            type: Boolean,
            default: false
        },
        allowHalf: {
            type: Boolean,
            default: false
        },
        showText: {
            type: Boolean,
            default: false
        },
        showScore: {
            type: Boolean,
            default: false
        },
        textColor: {
            type: String,
            default: '#1f2d3d'
        },
        texts: {
            type: Array,
            default() {
                return ['极差', '失望', '一般', '满意', '惊喜'];
            }
        },
        scoreTemplate: {
            type: String,
            default: '{value}'
        }
    },
    computed: {
        text() {
            let result = ''
            if (this.showScore) {
                result = this.scoreTemplate.replace(/\{\s*value\s*\}/, this.rateDisabled
                    ? this.value
                    : this.currentValue)
            } else if (this.showText) {
                result = this.texts[Math.ceil(this.currentValue) - 1]
            }
            return result
        },
        decimalStyle() {
            let width = ''
            if (this.rateDisabled) {
                width = `${this.valueDecimal}%`
            } else if (this.allowHalf) {
                width = '50%'
            }
            return {
                color: this.activeColor,
                width
            }
        },
        valueDecimal() {
            return this.value * 100 - Math.floor(this.value) * 100
        },
        classMap() {
            return Array.isArray(this.iconClasses) ? {
                [this.lowThreshold]: this.iconClasses[0],
                [this.highThreshold]: { value: this.iconClasses[1], excluded: true },
                [this.max]: this.iconClasses[2]
            } : this.iconClasses
        },
        decimalIconClass() {
            return this.getValueFromMap(this.value, this.classMap)
        },
        voidClass() {
            return this.rateDisabled ? this.disabledVoidIconClass : this.voidIconClass
        },
        activeClass() {
            return this.getValueFromMap(this.currentValue, this.classMap)
        },
        colorMap() {
            return Array.isArray(this.colors) ? {
                [this.lowThreshold]: this.colors[0],
                [this.highThreshold]: { value: this.colors[1], excluded: true },
                [this.max]: this.colors[2]
            } : this.colors
        },
        activeColor() {
            return this.getValueFromMap(this.currentValue, this.colorMap)
        },
        classes() {
            let result = []
            let i = 0
            let threshold = this.currentValue
            if (this.allowHalf && this.currentValue) {
                threshold--
            }
            for (; i < threshold; i++) {
                result.push(this.activeClass)
            }
            for (; i < this.max; i++) {
                result.push(this.voidClass)
            }
            return result
        },
        rateDisabled() {
            return this.disabled
        }
    },
    methods: {
        getValueFromMap(value, map) {
            const matchedKeys = Object.keys(map).filter(key => {
                const val = map[key]
                const excluded = isObject(val) ? val.excluded : false
                return excluded ? value < key : value <= key
            }).sort((a, b) => a - b)
            const matchedValue = map[matchedKeys[0]]
            return isObject(matchedValue) ? matchedValue.value : (matchedValue || '')
        },
        showDecimalIcon(item) {

        },
        getIconStyle(item) {
            const voidColor = this.rateDisabled ? this.disabledVoidColor : this.voidColor
            return {
                color: item <= this.currentValue ? this.activeColor : voidColor
            }
        },
        setCurrentValue(value, event) {
            if (this.rateDisabled) return
            if (this.allowHalf) {
                let target = event.target
                if (hasClass(target, 'e-rate__item')) {
                    target = target.querySelector('.e-rate__icon')
                }
                if (hasClass(target, 'e-rate__decimal')) {
                    target = target.parentNode
                }
                this.pointerAtLeftHalf = event.offsetX * 2 <= target.clientWidth
                this.currentValue = this.pointerAtLeftHalf ? value - 0.5 : value
            } else {
                this.currentValue = value
            }
            this.hoverIndex = value
        },
        resetCurrentValue() {
            if (this.rateDisabled) return
            if (this.allowHalf) {
                this.pointerAtLeftHalf = this.value !== Math.floor(this.value)
            }
            this.currentValue = this.value
            this.hoverIndex = -1
        },
        selectValue(value) {
            if (this.rateDisabled) return
            if (this.allowHalf && this.pointerAtLeftHalf) {
                this.$emit('input', this.currentValue)
                this.$emit('change', this.currentValue)
            } else {
                this.$emit('input', value)
                this.$emit('change', value)
            }
        },
        showDecimalIcon(item) {
            let showWhenDisabled = this.rateDisabled && this.valueDecimal > 0 && item - 1 < this.value && item > this.value;
            /* istanbul ignore next */
            let showWhenAllowHalf = this.allowHalf &&
                this.pointerAtLeftHalf &&
                item - 0.5 <= this.currentValue &&
                item > this.currentValue;
            return showWhenDisabled || showWhenAllowHalf;
        },
    },
    watch: {
        value(val) {
            this.currentValue = val
            this.pointerAtLeftHalf = this.value !== Math.floor(this.value)
        }
    },
    created() {
        if (!this.value) {
            this.$emit('input', 0)
        }
    }
}
</script>

<style lang="scss">
@import '../../../common/mixins.scss';
@import '../../../common/var.scss';

@include b(rate) {
    height: $--rate-height;
    line-height: 1;

    &:focus,
    &:active {
        outline-width: 0;
    }

    @include e(item) {
        display: inline-block;
        position: relative;
        font-size: 0;
        vertical-align: middle;
    }

    @include e(icon) {
        position: relative;
        display: inline-block;
        font-size: $--rate-icon-size;
        margin-right: $--rate-icon-margin;
        color: $--rate-icon-color;
        transition: .3s;

        &.hover {
            transform: scale(1.15);
        }

        .path2 {
            position: absolute;
            left: 0;
            top: 0;
        }
    }

    @include e(decimal) {
        position: absolute;
        top: 0;
        left: 0;
        display: inline-block;
        overflow: hidden;
    }

    @include e(text) {
        font-size: $--rate-font-size;
        vertical-align: middle;
    }
}
</style>