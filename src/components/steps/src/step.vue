<template>
    <div class="e-step" :style="style"
        :class="[!isSimple && `is-${$parent.direction}`, isSimple && 'is-simple', isLast && !space && !isCenter && 'is-flex', isCenter && !isVertical && !isSimple && 'is-center']">
        <div class="e-step__head" :class="`is-${currentStatus}`">
            <div class="e-step__line" :style="isLast ? '' : { marginRight: $parent.stepOffset + 'px' }">
                <i class="e-step__line-inner"></i>
            </div>
            <div class="e-step__icon" :class="`is-${icon ? 'icon' : 'text'}`">
                <slot v-if="currentStatus !== 'success' && currentStatus !== 'error'" name="icon">
                    <i v-if="icon" class="e-step__icon-inner" :class="[icon]"></i>
                    <div class="e-step__icon-inner" v-if="!icon && !isSimple">{{ index + 1 }}</div>
                </slot>
                <i v-else :class="['el-icon-' + (currentStatus === 'success' ? 'check' : 'close')]"
                    class="e-step__icon-inner is-status">
                </i>
            </div>
        </div>
        <div class="e-step__main">
            <div class="e-step__title" ref="title" :class="['is-' + currentStatus]">
                <slot name="title">{{ title }}</slot>
            </div>
            <div v-if="isSimple" class="e-step__arrow"></div>
            <div v-else class="e-step__description" :class="['is-' + currentStatus]">
                <slot name="description">{{ description }}</slot>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'EStep',
    props: {
        title: String,
        icon: String,
        description: String,
        status: String
    },
    data() {
        return {
            index: -1,
            lineStyle: {},
            internalStatus: ''
        }
    },
    beforeCreate() {
        this.$parent.steps.push(this)
    },
    beforeDestroy() {
        const steps = this.$parent.steps
        const index = steps.indexOf(this)
        if (index >= 0) {
            steps.splice(index, 1)
        }
    },
    computed: {
        currentStatus() {
            return this.status || this.internalStatus
        },
        prevStatus() {
            const prevStep = this.$parent.steps[this.index - 1]
            return prevStep ? prevStep.currentStatus : 'wait'
        },
        isCenter() {
            return this.$parent.alignCenter
        },
        isVertical() {
            return this.$parent.direction === 'vertical'
        },
        isSimple() {
            return this.$parent.simple
        },
        isLast() {
            const parent = this.$parent
            return parent.steps[parent.steps.length - 1] === this
        },
        stepsCount() {
            return this.$parent.steps.length
        },
        space() {
            const { isSimple, $parent: { space } } = this
            return isSimple ? '' : space
        },
        style() {
            const style = {}
            const parent = this.$parent
            const len = parent.steps.length

            const space = (typeof this.space === 'number' ? this.space + 'px' : this.space ? this.space : 100 / (len - (this.isCenter ? 0 : 1)) + '%')
            style.flexBasis = space
            if (this.isVertical) return style
            if (this.isLast) {
                style.maxWidth = 100 / this.stepsCount + '%'
            } else {
                style.marginRight = -this.$parent.stepOffset + 'px'
            }
            return style
        }
    },
    methods: {
        updateStatus(val) {
            const prevChild = this.$parent.$children[this.index - 1]
            if (val > this.index) {
                this.internalStatus = this.$parent.finishStatus
            } else if (val === this.index && this.prevStatus !== 'error') {
                this.internalStatus = this.$parent.processStatus
            } else {
                this.internalStatus = 'wait'
            }
            if (prevChild) prevChild.calcProgress(this.internalStatus)
        },
        calcProgress(status) {
            let step = 100
            const style = {}
            style.transitionDelay = 150 * this.index + 'ms'
            if (status === this.$parent.processStatus) {
                step = this.currentStatus !== 'error' ? 0 : 0
            } else if (status === 'wait') {
                step = 0
                style.transitionDelay = (-150 * this.index) + 'ms'
            }

            style.borderWidth = step && !this.isSimple ? '1px' : 0
            this.$parent.direction === 'vertical'
                ? style.height = step + '%'
                : style.width = step + '%'

            this.lineStyle = style
        }
    },
    mounted() {
        const unwatch = this.$watch('index', val => {
            this.$watch('$parent.active', this.updateStatus, { immediate: true })
            this.$watch('$parent.processStatus', () => {
                const activeIndex = this.$parent.active
                this.updateStatus(activeIndex)
            }, { immediate: true })
            unwatch()
        })
    }
}
</script>

<style lang="scss">
@import "../../../common/mixins.scss";
@import "../../../common/var.scss";

@include b(step) {
    position: relative;
    flex-shrink: 1;

    @include pseudo(last-of-type) {
        @include e(line) {
            display: none;
        }

        // 只有未设置 space 的情况下才自适应宽度
        @include when(flex) {
            flex-basis: auto !important;
            flex-shrink: 0;
            flex-grow: 0;
        }

        @include e((main, description)) {
            padding-right: 0;
        }
    }

    @include e(head) {
        position: relative;
        width: 100%;

        @include when(process) {
            color: $--color-text-primary;
            border-color: $--color-text-primary;
        }

        @include when(wait) {
            color: $--color-text-placeholder;
            border-color: $--color-text-placeholder;
        }

        @include when(success) {
            color: $--color-success;
            border-color: $--color-success;
        }

        @include when(error) {
            color: $--color-danger;
            border-color: $--color-danger;
        }

        @include when(finish) {
            color: $--color-primary;
            border-color: $--color-primary;
        }
    }

    @include e(icon) {
        position: relative;
        z-index: 1;
        display: inline-flex;
        justify-content: center;
        align-items: center;
        width: 24px;
        height: 24px;
        font-size: 14px;
        box-sizing: border-box;
        background: $--color-white;
        transition: .15s ease-out;

        @include when(text) {
            border-radius: 50%;
            border: 2px solid;
            border-color: inherit;
        }

        @include when(icon) {
            width: 40px;
        }
    }

    @include e(icon-inner) {
        display: inline-block;
        user-select: none;
        text-align: center;
        font-weight: bold;
        line-height: 1;
        color: inherit;

        &[class*=el-icon]:not(.is-status) {
            font-size: 25px;
            font-weight: normal;
        }

        // 组件自身表示状态的图标
        @include when(status) {
            transform: translateY(1px);
        }
    }

    @include e(line) {
        position: absolute;
        border-color: inherit;
        background-color: $--color-text-placeholder;
    }

    @include e(line-inner) {
        display: block;
        border-width: 1px;
        border-style: solid;
        border-color: inherit;
        transition: .15s ease-out;
        box-sizing: border-box;
        width: 0;
        height: 0;
    }

    @include e(main) {
        white-space: normal;
        text-align: left;
    }

    @include e(title) {
        font-size: 16px;
        line-height: 38px;

        @include when(process) {
            font-weight: bold;
            color: $--color-text-primary;
        }

        @include when(wait) {
            color: $--color-text-placeholder;
        }

        @include when(success) {
            color: $--color-success;
        }

        @include when(error) {
            color: $--color-danger;
        }

        @include when(finish) {
            color: $--color-primary;
        }
    }

    @include e(description) {
        padding-right: 10%;
        margin-top: -5px;
        font-size: 12px;
        line-height: 20px;
        font-weight: normal;

        @include when(process) {
            color: $--color-text-primary;
        }

        @include when(wait) {
            color: $--color-text-placeholder;
        }

        @include when(success) {
            color: $--color-success;
        }

        @include when(error) {
            color: $--color-danger;
        }

        @include when(finish) {
            color: $--color-primary;
        }
    }

    @include when(horizontal) {
        display: inline-block;

        @include e(line) {
            height: 2px;
            top: 11px;
            left: 0;
            right: 0;
        }
    }

    @include when(vertical) {
        display: flex;

        @include e(head) {
            flex-grow: 0;
            width: 24px;
        }

        @include e(main) {
            padding-left: 10px;
            flex-grow: 1;
        }

        @include e(title) {
            line-height: 24px;
            padding-bottom: 8px;
        }

        @include e(line) {
            width: 2px;
            top: 0;
            bottom: 0;
            left: 11px;
        }

        @include e(icon) {
            @include when(icon) {
                width: 24px;
            }
        }
    }

    @include when(center) {

        @include e(head) {
            text-align: center;
        }

        @include e(main) {
            text-align: center;
        }

        @include e(description) {
            padding-left: 20%;
            padding-right: 20%;
        }

        @include e(line) {
            left: 50%;
            right: -50%;
        }
    }

    @include when(simple) {
        display: flex;
        align-items: center;

        @include e(head) {
            width: auto;
            font-size: 0;
            padding-right: 10px;
        }

        @include e(icon) {
            background: transparent;
            width: 16px;
            height: 16px;
            font-size: 12px;
        }

        @include e(icon-inner) {
            &[class*=el-icon]:not(.is-status) {
                font-size: 18px;
            }

            &.is-status {
                transform: scale(.8) translateY(1px);
            }
        }

        @include e(main) {
            position: relative;
            display: flex;
            align-items: stretch;
            flex-grow: 1;
        }

        @include e(title) {
            font-size: 16px;
            line-height: 20px;
        }

        @include pseudo('not(:last-of-type)') {
            @include e(title) {
                max-width: 50%;
                word-break: break-all;
            }
        }

        @include e(arrow) {
            flex-grow: 1;
            display: flex;
            align-items: center;
            justify-content: center;

            &::before,
            &::after {
                content: '';
                display: inline-block;
                position: absolute;
                height: 15px;
                width: 1px;
                background: $--color-text-placeholder;
            }

            &::before {
                transform: rotate(-45deg) translateY(-4px);
                transform-origin: 0 0;
            }

            &::after {
                transform: rotate(45deg) translateY(4px);
                transform-origin: 100% 100%;
            }
        }

        @include pseudo(last-of-type) {
            @include e(arrow) {
                display: none;
            }
        }
    }
}
</style>