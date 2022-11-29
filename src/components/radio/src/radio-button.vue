<template>
  <label
    class="e-radio-button"
    :class="[
      size ? 'e-radio-button--' + size : '',
      { 'is-active': value === label },
      { 'is-disabled': isDisabled },
      { 'is-focus': focus },
    ]"
  >
    <input
      class="e-radio-button__orig-radio"
      :value="label"
      type="radio"
      v-model="value"
      :name="name"
      @change="handleChange"
      :disabled="isDisabled"
      @focus="focus = true"
      @blur="focus = false"
      autocomplete="off"
    />
    <span
      class="e-radio-button__inner"
      :style="value === label ? activeStyle : null"
    >
      <slot></slot>
      <template v-if="!$slots.default">{{ label }}</template>
    </span>
  </label>
</template>

<script>
import Emitter from "@/utils/emitter";
export default {
  name: "ERadioButton",
  mixins: [Emitter],
  props: {
    label: {},
    disabled: Boolean,
    name: String,
  },
  data() {
    return {
      focus: false,
    };
  },
  computed: {
    value: {
      get() {
        return this._radioGroup.value;
      },
      set(value) {
        this._radioGroup.$emit("input", value);
      },
    },
    _radioGroup() {
      let parent = this.$parent;
      while (parent) {
        if (parent.$options.componentName !== "ERadioGroup") {
          parent = parent.$parent;
        } else {
          return parent;
        }
      }
      return false;
    },
    activeStyle() {
      return {
        backgroundColor: this._radioGroup.fill || "",
        borderColor: this._radioGroup.fill || "",
        boxShadow: this._radioGroup.fill
          ? `-1px 0 0 0 ${this._radioGroup.fill}`
          : "",
        color: this._radioGroup.textColor || "",
      };
    },
    size() {
      return this._radioGroup.radioGroupSize;
    },
    isDisabled() {
      return this._radioGroup.disabled || this.disabled;
    },
  },
  methods: {
    handleChange() {
      this.$nextTick(() => {
        this.dispatch("ERadioGroup", "handleChange", this.value);
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../../common/mixins.scss";
@import "../../../common/button.scss";
@import "../../../common/var.scss";

@include b(radio-button) {
  position: relative;
  display: inline-block;
  outline: none;

  @include e(inner) {
    display: inline-block;
    line-height: 1;
    white-space: nowrap;
    vertical-align: middle;
    background: $--button-default-background-color;
    border: $--border-base;
    font-weight: $--button-font-weight;
    border-left: 0;
    color: $--button-default-font-color;
    -webkit-appearance: none;
    text-align: center;
    box-sizing: border-box;
    outline: none;
    margin: 0;
    position: relative;
    cursor: pointer;
    transition: $--all-transition;

    @include button-size(
      $--button-padding-vertical,
      $--button-padding-horizontal,
      $--button-font-size,
      0
    );

    &:hover {
      color: $--color-primary;
    }

    & [class*="el-icon-"] {
      line-height: 0.9;

      & + span {
        margin-left: 5px;
      }
    }
  }

  &:first-child {
    .e-radio-button__inner {
      border-left: $--border-base;
      border-radius: $--border-radius-base 0 0 $--border-radius-base;
      box-shadow: none !important;
    }
  }

  @include e(orig-radio) {
    opacity: 0;
    outline: none;
    position: absolute;
    z-index: -1;

    &:checked {
      & + .e-radio-button__inner {
        color: $--radio-button-checked-font-color;
        background-color: $--radio-button-checked-background-color;
        border-color: $--radio-button-checked-border-color;
        box-shadow: -1px 0 0 0 $--radio-button-checked-border-color;
      }
    }

    &:disabled {
      & + .e-radio-button__inner {
        color: $--button-disabled-font-color;
        cursor: not-allowed;
        background-image: none;
        background-color: $--button-disabled-background-color;
        border-color: $--button-disabled-border-color;
        box-shadow: none;
      }
      &:checked + .e-radio-button__inner {
        background-color: $--radio-button-disabled-checked-fill;
      }
    }
  }

  &:last-child {
    .e-radio-button__inner {
      border-radius: 0 $--border-radius-base $--border-radius-base 0;
    }
  }

  &:first-child:last-child {
    .e-radio-button__inner {
      border-radius: $--border-radius-base;
    }
  }

  @include m(medium) {
    & .e-radio-button__inner {
      @include button-size(
        $--button-medium-padding-vertical,
        $--button-medium-padding-horizontal,
        $--button-medium-font-size,
        0
      );
    }
  }
  @include m(small) {
    & .e-radio-button__inner {
      @include button-size(
        $--button-small-padding-vertical,
        $--button-small-padding-horizontal,
        $--button-small-font-size,
        0
      );
    }
  }
  @include m(mini) {
    & .e-radio-button__inner {
      @include button-size(
        $--button-mini-padding-vertical,
        $--button-mini-padding-horizontal,
        $--button-mini-font-size,
        0
      );
    }
  }

  &:focus:not(.is-focus):not(:active):not(.is-disabled) {
    /*获得焦点时 样式提醒*/
    box-shadow: 0 0 2px 2px $--radio-button-checked-border-color;
  }
}
</style>