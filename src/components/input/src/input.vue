<template>
  <div
    :class="[
      type === 'textarea' ? 'e-textarea' : 'e-input',
      inputSize ? 'e-input--' + inputSize : '',
      {
        'is-disabled': inputDisabled,
        'e-input--prefix': $slots.prefix || prefixIcon,
        'e-input--suffix':
          $slots.suffix || suffixIcon || clearable || showPassword,
        'e-input-group--prepend': $slots.prepend,
        'e-input-group--append': $slots.append,
        'is-exceed': inputExceed,
      },
    ]"
    @mouseenter="hovering = true"
    @mouseleave="hovering = false"
  >
    <template v-if="type !== 'textarea'">
      <div class="e-input-group__prepend" v-if="$slots.prepend">
        <slot name="prepend"></slot>
      </div>
      <input
        v-if="type !== 'textarea'"
        class="e-input__inner"
        v-bind="$attrs"
        :type="showPassword ? (passwordVisible ? 'text' : 'password') : type"
        :disabled="inputDisabled"
        :readonly="readonly"
        :autocomplete="autocomplete"
        ref="input"
        @input="handleInput"
        @focus="handleFocus"
        @blur="handleBlur"
        @change="handleChange"
      />
      <span class="e-input__prefix" v-if="$slots.prefix || prefixIcon">
        <slot name="prefix"></slot>
        <i class="e-input__icon" v-if="prefixIcon" :class="prefixIcon"></i>
      </span>
      <span class="e-input__suffix" v-if="getSuffixVisible()">
        <span class="e-input__suffix-inner">
          <template v-if="!showClear || !showPwdVisible || !isWordLimitVisible">
            <slot name="suffix"></slot>
            <i class="e-input__icon" v-if="suffixIcon" :class="suffixIcon"></i>
          </template>
          <i
            v-if="showClear"
            class="e-input__icon el-icon-circle-close e-input__clear"
            @click="clear"
          ></i>
          <i
            v-if="showPwdVisible"
            class="e-input__icon el-icon-view e-input__clear"
            @click="handlePasswordVisible"
          ></i>
          <span v-if="isWordLimitVisible" class="e-input__count">
            <span class="e-input__count-inner"
              >{{ textLength }}/{{ upperLimit }}</span
            >
          </span>
        </span>
        <!-- <i
          class="el-input__icon"
          v-if="validateState"
          :class="['el-input__validateIcon', validateIcon]"
        ></i> -->
      </span>
      <div class="e-input-group__append" v-if="$slots.append">
        <slot name="append"></slot>
      </div>
    </template>
    <textarea
      v-else
      class="e-textarea__inner"
      @input="handleInput"
      ref="textarea"
      v-bind="$attrs"
      :disabled="inputDisabled"
      :readonly="readonly"
      :autocomplete="autocomplete"
      :style="textareaStyle"
      @focus="handleFocus"
      @blur="handleBlur"
      @change="handleChange"
    ></textarea>
    <span
      v-if="isWordLimitVisible && type === 'textarea'"
      class="e-input__count"
      >{{ textLength }}/{{ upperLimit }}</span
    >
  </div>
</template>

<script>
import merge from "@/utils/merge";
import calcTextareaHeight from "./calcTextareaHeight";
export default {
  name: "EInput",
  componentName: "EInput",
  data() {
    return {
      textareaCalcStyle: {},
      hovering: false,
      focused: false,
      passwordVisible: false,
    };
  },
  props: {
    value: [String, Number],
    size: String,
    resize: String,
    disabled: Boolean,
    readonly: Boolean,
    type: {
      type: String,
      default: "text",
    },
    autoSize: {
      type: [Boolean, Object],
      default: false,
    },
    autocomplete: {
      type: String,
      default: "off",
    },
    validateEvent: {
      type: Boolean,
      default: true,
    },
    suffixIcon: String,
    prefixIcon: String,
    label: String,
    clearable: {
      type: Boolean,
      default: false,
    },
    showPassword: {
      type: Boolean,
      default: false,
    },
    showWordLimit: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    textareaStyle() {
      return merge({}, this.textareaCalcStyle, { resize: this.resize });
    },
    inputSize() {
      return this.size;
    },
    inputDisabled() {
      return this.disabled;
    },
    nativeInputValue() {
      return this.value === null || this.value === undefined
        ? ""
        : String(this.value);
    },
    showClear() {
      return (
        this.clearable &&
        !this.inputDisabled &&
        !this.readonly &&
        this.nativeInputValue &&
        (this.focused || this.hovering)
      );
    },
    showPwdVisible() {
      return (
        this.showPassword &&
        !this.inputDisabled &&
        !this.readonly &&
        (!!this.nativeInputValue || this.focused)
      );
    },
    isWordLimitVisible() {
      return (
        this.showWordLimit &&
        this.$attrs.maxlength &&
        (this.type === "text" || this.type === "textarea") &&
        !this.inputDisabled &&
        !this.readonly &&
        !this.showPassword
      );
    },
    upperLimit() {
      return this.$attrs.maxlength;
    },
    textLength() {
      if (typeof this.value === "number") {
        return String(this.value).length;
      }
      return (this.value || "").length;
    },
    inputExceed() {
      return this.isWordLimitVisible && this.textLength > this.upperLimit;
    },
  },
  watch: {
    nativeInputValue() {
      this.setNativeInputValue();
    },
  },
  methods: {
    focus() {
      this.getInput().focus();
    },
    blur() {
      this.getInput().blur();
    },
    getInput() {
      return this.$refs.input || this.$refs.textarea;
    },
    handleBlur(event) {
      this.focused = false;
      this.$emit("blur", event);
    },
    select() {
      this.getInput().select();
    },
    resizeTextarea() {
      const { autoSize, type } = this;
      if (type !== "textarea") return;
      if (!autoSize) {
        this.textareaCalcStyle = {
          minHeight: calcTextareaHeight(this.$refs.textarea).minHeight,
        };
        return;
      }
      const minRows = autoSize.minRows;
      const maxRows = autoSize.maxRows;
      this.textareaCalcStyle = calcTextareaHeight(
        this.$refs.textarea,
        minRows,
        maxRows
      );
    },
    setNativeInputValue() {
      const input = this.getInput();
      if (!input) return;
      if (input.value === this.nativeInputValue) return;
      input.value = this.nativeInputValue;
    },
    handleFocus(event) {
      this.focused = true;
      this.$emit("focus", event);
    },
    handleInput(event) {
      if (event.target.value === this.nativeInputValue) return;
      this.$emit("input", event.target.value);
      this.$nextTick(this.setNativeInputValue);
    },
    handleChange(event) {
      this.$emit("change", event.target.value);
    },
    clear() {
      this.$emit("input", "");
      this.$emit("change", "");
      this.$emit("clear");
    },
    handlePasswordVisible() {
      this.passwordVisible = !this.passwordVisible;
      this.$nextTick(() => {
        this.focus();
      });
    },
    getSuffixVisible() {
      return (
        this.$slots.suffix ||
        this.suffixIcon ||
        this.showClear ||
        this.showPassword ||
        this.isWordLimitVisible
      );
    },
  },
  mounted() {
    this.setNativeInputValue();
    this.resizeTextarea();
  },
};
</script>

<style>
.e-input__inner,
.e-textarea__inner {
  background-image: none;
  box-sizing: border-box;
  transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
}

.e-textarea {
  position: relative;
  display: inline-block;
  width: 100%;
  vertical-align: bottom;
  font-size: 14px;
}

.e-textarea__inner {
  display: block;
  resize: vertical;
  padding: 5px 15px;
  line-height: 1.5;
  box-sizing: border-box;
  width: 100%;
  font-size: inherit;
  color: #606266;
  background-color: #fff;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
}

.e-textarea__inner::placeholder {
  color: #c0c4cc;
}

.e-textarea__inner:hover {
  border-color: #c0c4cc;
}

.e-textarea__inner:focus {
  outline: 0;
  border-color: #409eff;
}

.e-textarea .e-input__count {
  color: #909399;
  background: #fff;
  position: absolute;
  font-size: 12px;
  bottom: 5px;
  right: 10px;
}

.e-textarea.is-disabled .e-textarea__inner {
  background-color: #f5f7fa;
  border-color: #e4e7ed;
  color: #c0c4cc;
  cursor: not-allowed;
}

.e-textarea.is-disabled .e-textarea__inner::placeholder {
  color: #c0c4cc;
}

.e-textarea.is-exceed .e-textarea__inner {
  border-color: #f56c6c;
}

.e-textarea.is-exceed .e-input__count {
  color: #f56c6c;
}

.e-input {
  position: relative;
  font-size: 14px;
  display: inline-block;
  width: 100%;
}

.e-input .e-input__clear {
  color: #c0c4cc;
  font-size: 14px;
  cursor: pointer;
  transition: color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
}

.e-input .e-input__clear:hover {
  color: #909399;
}

.e-input .e-input__count {
  height: 100%;
  display: inline-flex;
  align-items: center;
  color: #909399;
  font-size: 12px;
}

.e-input .e-input__count .e-input__count-inner {
  background: #fff;
  line-height: initial;
  display: inline-block;
  padding: 0 5px;
}

.e-input__inner {
  background-color: #fff;
  border-radius: 4px;
  border: 1px solid #dcdfe6;
  box-sizing: border-box;
  color: #606266;
  display: inline-block;
  height: 40px;
  line-height: 40px;
  outline: 0;
  padding: 0 15px;
  transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  width: 100%;
}

.e-input__prefix,
.e-input__suffix {
  position: absolute;
  top: 0;
  transition: all 0.3s;
  text-align: center;
  height: 100%;
  color: #c0c4cc;
}

.e-input__inner::placeholder {
  color: #c0c4cc;
}

.e-input__inner:hover {
  border-color: #c0c4cc;
}

.e-input.is-active .e-input__inner,
.e-input__inner:focus {
  border-color: #409eff;
  outline: 0;
}

.e-input__suffix {
  right: 5px;
  transition: all 0.3s;
  pointer-events: none;
}

.e-input__suffix-inner {
  pointer-events: all;
}

.e-input__prefix {
  left: 5px;
  transition: all 0.3s;
}

.e-input__icon {
  height: 100%;
  width: 25px;
  text-align: center;
  transition: all 0.3s;
  line-height: 40px;
}

.e-input__icon:after {
  content: "";
  height: 100%;
  width: 0;
  display: inline-block;
  vertical-align: middle;
}

.e-input__validateIcon {
  pointer-events: none;
}

.e-input.is-disabled .e-input__inner {
  background-color: #f5f7fa;
  border-color: #e4e7ed;
  color: #c0c4cc;
  cursor: not-allowed;
}

.e-input.is-disabled .e-input__inner::placeholder {
  color: #c0c4cc;
}

.e-input.is-disabled .e-input__icon {
  cursor: not-allowed;
}

.e-input.is-exceed .e-input__inner {
  border-color: #f56c6c;
}

.e-input.is-exceed .e-input__suffix .e-input__count {
  color: #f56c6c;
}

.e-input--suffix .e-input__inner {
  padding-right: 30px;
}

.e-input--prefix .e-input__inner {
  padding-left: 30px;
}

.e-input--medium {
  font-size: 14px;
}

.e-input--medium .e-input__inner {
  height: 36px;
  line-height: 36px;
}

.e-input--medium .e-input__icon {
  line-height: 36px;
}

.e-input--small {
  font-size: 13px;
}

.e-input--small .e-input__inner {
  height: 32px;
  line-height: 32px;
}

.e-input--small .e-input__icon {
  line-height: 32px;
}

.e-input--mini {
  font-size: 12px;
}

.e-input--mini .e-input__inner {
  height: 28px;
  line-height: 28px;
}

.e-input--mini .e-input__icon {
  line-height: 28px;
}

.e-input-group {
  line-height: normal;
  display: inline-table;
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
}

.e-input-group > .e-input__inner {
  vertical-align: middle;
  display: table-cell;
}

.e-input-group__append,
.e-input-group__prepend {
  background-color: #f5f7fa;
  color: #909399;
  vertical-align: middle;
  display: table-cell;
  position: relative;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  padding: 0 20px;
  width: 1px;
  white-space: nowrap;
}

.e-input-group--prepend .e-input__inner,
.e-input-group__append {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}

.e-input-group--append .e-input__inner,
.e-input-group__prepend {
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}

.e-input-group__append:focus,
.e-input-group__prepend:focus {
  outline: 0;
}

.e-input-group__prepend {
  border-right: 0;
}

.e-input-group__append {
  border-left: 0;
}
</style>