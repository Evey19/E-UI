<template>
    <label class="e-checkbox-button" :class="[
        size ? 'e-checkbox-button--' + size : '',
        { 'is-disabled': isDisabled },
        { 'is-checked': isChecked },
        { 'is-focus': focus },
    ]">
        <input class="e-checkbox-button__original" type="checkbox" :name="name" :disabled="isDisabled" :value="label"
            v-model="model" @change="handleChange" @focus="focus = true" @blur="focus = false">

        <span class="e-checkbox-button__inner" v-if="$slots.default || label" :style="isChecked ? activeStyle : null">
            <slot>{{ label }}</slot>
        </span>

    </label>
</template>
<script>
import Emitter from '@/utils/emitter';

export default {
    name: 'ECheckboxButton',

    mixins: [Emitter],


    data() {
        return {
            selfModel: false,
            focus: false,
            isLimitExceeded: false
        };
    },

    props: {
        value: {},
        label: {},
        disabled: Boolean,
        checked: Boolean,
        name: String,
    },
    computed: {
        model: {
            get() {
                return this._checkboxGroup
                    ? this.store : this.value !== undefined
                        ? this.value : this.selfModel;
            },

            set(val) {
                if (this._checkboxGroup) {
                    this.isLimitExceeded = false;
                    (this._checkboxGroup.min !== undefined &&
                        val.length < this._checkboxGroup.min &&
                        (this.isLimitExceeded = true));

                    (this._checkboxGroup.max !== undefined &&
                        val.length > this._checkboxGroup.max &&
                        (this.isLimitExceeded = true));

                    this.isLimitExceeded === false &&
                        this.dispatch('ECheckboxGroup', 'input', [val]);
                } else if (this.value !== undefined) {
                    this.$emit('input', val);
                } else {
                    this.selfModel = val;
                }
            }
        },

        // eslint-disable-next-line vue/return-in-computed-property
        isChecked() {
            if ({}.toString.call(this.model) === '[object Boolean]') {
                return this.model;
            } else if (Array.isArray(this.model)) {
                return this.model.indexOf(this.label) > -1;
            }
        },

        _checkboxGroup() {
            let parent = this.$parent;
            while (parent) {
                if (parent.$options.componentName !== 'ECheckboxGroup') {
                    parent = parent.$parent;
                } else {
                    return parent;
                }
            }
            return false;
        },

        store() {
            return this._checkboxGroup ? this._checkboxGroup.value : this.value;
        },

        activeStyle() {
            return {
                backgroundColor: this._checkboxGroup.fill || '',
                borderColor: this._checkboxGroup.fill || '',
                color: this._checkboxGroup.textColor || '',
                'box-shadow': '-1px 0 0 0 ' + this._checkboxGroup.fill

            };
        },

        size() {
            return this._checkboxGroup.checkboxGroupSize
        },

        /* used to make the isDisabled judgment under max/min props */
        isLimitDisabled() {
            const { max, min } = this._checkboxGroup;
            return !!(max || min) &&
                (this.model.length >= max && !this.isChecked) ||
                (this.model.length <= min && this.isChecked);
        },

        isDisabled() {
            return this._checkboxGroup
                ? this._checkboxGroup.disabled || this.disabled || this.isLimitDisabled
                : this.disabled;
        }
    },
    methods: {
        addToStore() {
            if (
                Array.isArray(this.model) &&
                this.model.indexOf(this.label) === -1
            ) {
                this.model.push(this.label);
            } else {
                this.model = this.trueLabel || true;
            }
        },
        handleChange(ev) {
            if (this.isLimitExceeded) return;
            let value;
            if (ev.target.checked) {
                value = this.trueLabel === undefined ? true : this.trueLabel;
            } else {
                value = this.falseLabel === undefined ? false : this.falseLabel;
            }
            this.$emit('change', value, ev);
            this.$nextTick(() => {
                if (this._checkboxGroup) {
                    this.dispatch('ECheckboxGroup', 'change', [this._checkboxGroup.value]);
                }
            });
        }
    },

    created() {
        this.checked && this.addToStore();
    }
};
</script>
  

<style lang="scss" scoped>
@import "../../../common/var.scss";
@import "../../../common/mixins.scss";
@import "../../../common/button.scss";
@import "../../../common/utils.scss";


@include b(checkbox-button) {
    position: relative;
    display: inline-block;

    @include e(inner) {
        display: inline-block;
        line-height: 1;
        font-weight: $--checkbox-font-weight;
        white-space: nowrap;
        vertical-align: middle;
        cursor: pointer;
        background: $--button-default-background-color;
        border: $--border-base;
        border-left: 0;
        color: $--button-default-font-color;
        -webkit-appearance: none;
        text-align: center;
        box-sizing: border-box;
        outline: none;
        margin: 0;
        position: relative;
        transition: $--all-transition;
        @include utils-user-select(none);

        @include button-size($--button-padding-vertical,
            $--button-padding-horizontal,
            $--button-font-size,
            0);

        &:hover {
            color: $--color-primary;
        }

        & [class*="el-icon-"] {
            line-height: 0.9;

            &+span {
                margin-left: 5px;
            }
        }
    }

    @include e(original) {
        opacity: 0;
        outline: none;
        position: absolute;
        margin: 0;
        z-index: -1;
    }

    &.is-checked {
        & .e-checkbox-button__inner {
            color: $--checkbox-button-checked-font-color;
            background-color: $--checkbox-button-checked-background-color;
            border-color: $--checkbox-button-checked-border-color;
            box-shadow: -1px 0 0 0 $--color-primary-light-4;
        }

        &:first-child .e-checkbox-button__inner {
            border-left-color: $--checkbox-button-checked-border-color;
        }
    }

    &.is-disabled {
        & .e-checkbox-button__inner {
            color: $--button-disabled-font-color;
            cursor: not-allowed;
            background-image: none;
            background-color: $--button-disabled-background-color;
            border-color: $--button-disabled-border-color;
            box-shadow: none;
        }

        &:first-child .e-checkbox-button__inner {
            border-left-color: $--button-disabled-border-color;
        }
    }

    &:first-child {
        .e-checkbox-button__inner {
            border-left: $--border-base;
            border-radius: $--border-radius-base 0 0 $--border-radius-base;
            box-shadow: none !important;
        }
    }

    &.is-focus {
        & .e-checkbox-button__inner {
            border-color: $--checkbox-button-checked-border-color;
        }
    }

    &:last-child {
        .e-checkbox-button__inner {
            border-radius: 0 $--border-radius-base $--border-radius-base 0;
        }
    }

    @include m(medium) {
        .e-checkbox-button__inner {
            @include button-size($--button-medium-padding-vertical,
                $--button-medium-padding-horizontal,
                $--button-medium-font-size,
                0);
        }
    }

    @include m(small) {
        .e-checkbox-button__inner {
            @include button-size($--button-small-padding-vertical,
                $--button-small-padding-horizontal,
                $--button-small-font-size,
                0);
        }
    }

    @include m(mini) {
        .e-checkbox-button__inner {
            @include button-size($--button-mini-padding-vertical,
                $--button-mini-padding-horizontal,
                $--button-mini-font-size,
                0);
        }
    }
}

@include b(checkbox-group) {
    font-size: 0;
}
</style>