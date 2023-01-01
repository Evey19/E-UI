<template>
    <div class="e-steps" :class="[!simple && 'e-steps--' + direction, simple && 'e-steps--simple']">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'ESteps',
    props: {
        space: [Number, String],
        active: Number,
        direction: {
            type: String,
            default: 'horizontal'
        },
        alignCenter: Boolean,
        simple: Boolean,
        finishStatus: {
            type: String,
            default: 'finish'
        },
        processStatus: {
            type: String,
            default: 'process'
        }
    },
    data() {
        return {
            steps: [],
            stepOffset: 0
        }
    },
    watch: {
        active(newVal, oldVal) {
            this.$emit('change', newVal, oldVal)
        },
        steps(steps) {
            steps.forEach((child, index) => {
                child.index = index
            })
        }
    }
}
</script>

<style lang="scss">
@import '../../../common/mixins.scss';

@include b(steps) {
    display: flex;

    @include m(simple) {
        padding: 13px 8%;
        border-radius: 4px;
        background: $--background-color-base;
    }

    @include m(horizontal) {
        white-space: nowrap;
    }

    @include m(vertical) {
        height: 100%;
        flex-flow: column;
    }
}
</style>