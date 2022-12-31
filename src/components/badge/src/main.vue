<template>
    <div class="e-badge">
        <slot></slot>
        <transition name="el-zoom-in-center">
            <sup v-show="!hidden && (content || content === 0 || isDot)" v-text="content" class="e-badge__content"
                :class="[type?'e-badge__content--'+type:null,
                {
                    'is-fixed':$slots.default,
                    'is-dot':isDot
                }
                ]">
            </sup>
        </transition>
    </div>
</template>

<script>

export default {
    name: 'EBadge',
    props: {
        value: [String, Number],
        max: Number,
        isDot:Boolean,
        hidden: Boolean,
        type: {
            type: String,
            validator(val) {
                return ['primary', 'success', 'warning', 'info', 'danger'].indexOf(val) > -1
            }
        }
    },
    computed: {
        content() {
            if (this.isDot) return
            const value = this.value
            const max = this.max
            if (typeof value === 'number' && typeof max === 'number') {
                return max < value ? `${max}+` : value
            }
            return value
        }
    }
}

</script>

<style lang="scss" scoped>
@use "sass:math";
@import "../../../common/mixins.scss";
@import "../../../common/var.scss";

@include b(badge) {
    position: relative;
    vertical-align: middle;
    display: inline-block;

    @include e(content) {
        background-color: $--badge-background-color;
        border-radius: $--badge-radius;
        color: $--color-white;
        display: inline-block;
        font-size: $--badge-font-size;
        height: $--badge-size;
        line-height: $--badge-size;
        padding: 0 $--badge-padding;
        text-align: center;
        white-space: nowrap;
        border: 1px solid $--color-white;

        @include when(fixed) {
            position: absolute;
            top: 0;
            right: #{1 + math.div($--badge-size, 2)};
            transform: translateY(-50%) translateX(100%);

            @include when(dot) {
                right: 5px;
            }
        }

        @include when(dot) {
            height: 8px;
            width: 8px;
            padding: 0;
            right: 0;
            border-radius: 50%;
        }

        @each $type in (primary, success, warning, info, danger) {
            @include m($type) {
                @if $type ==primary {
                    background-color: $--color-primary;
                }

                @else if $type ==success {
                    background-color: $--color-success;
                }

                @else if $type ==warning {
                    background-color: $--color-warning;
                }

                @else if $type ==info {
                    background-color: $--color-info;
                }

                @else {
                    background-color: $--color-danger;
                }
            }
        }
    }
}
</style>