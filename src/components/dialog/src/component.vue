<template>
  <transition name="dialog-fade">
    <div
      v-show="visible"
      class="e-dialog__wrapper"
      @click.self="handleWrapperClick"
    >
      <div :class="['e-dialog']" ref="dialog" :style="style">
        <div class="e-dialog__header">
          <slot name="title">
            <span class="e-dialog__title">{{ title }}</span>
          </slot>
          <button
            type="button"
            class="e-dialog__headerbtn"
            v-if="showClose"
            @click="handleClose"
          >
            <i class="e-dialog__close el-icon el-icon-close"></i>
          </button>
        </div>
        <div class="e-dialog__body" v-if="rendered"><slot></slot></div>
        <div class="e-dialog__footer" v-if="$slots.footer">
          <slot name="footer"></slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import Popup from "@/utils/popup";
export default {
  name: "EDialog",
  mixins: [Popup],
  props: {
    title: {
      type: String,
      default: "",
    },
    modal: {
      type: Boolean,
      default: true,
    },
    modalAppendToBody: {
      type: Boolean,
      default: true,
    },
    appendToBody: {
      type: Boolean,
      default: false,
    },
    closeOnClickModal: {
      type: Boolean,
      default: true,
    },
    showClose: {
      type: Boolean,
      default: true,
    },
    fullscreen: Boolean,
    top: {
      type: String,
      default: "15vh",
    },
    width: String,
    beforeClose: Function,
  },
  data() {
    return {
      closed: false,
    };
  },
  computed: {
    style() {
      let style = {};
      if (!this.fullscreen) {
        style.marginTop = this.top;
        if (this.width) {
          style.width = this.width;
        }
      }
      return style;
    },
  },
  methods: {
    handleWrapperClick() {
      if (!this.closeOnClickModal) return;
      this.handleClose();
    },
    handleClose() {
      if (typeof this.beforeClose === "function") {
        this.beforeClose(this.hide);
      } else {
        this.hide();
      }
    },
    hide(cancel) {
      if (cancel !== false) {
        this.$emit("update:visible", false);
        this.$emit("close");
        this.closed = true;
      }
    },
  },
  mounted() {
    if (this.visible) {
      this.rendered = true;
      this.open();
      if (this.appendToBody) {
        document.body.appendChild(this.$el);
      }
    }
  },
  destroyed() {
    if (this.appendToBody && this.$el && this.$el.parentNode) {
      this.$el.parentNode.removeChild(this.$el);
    }
  },
};
</script>

<style>
.v-modal-enter {
  animation: v-modal-in 0.2s ease;
}

.v-modal-leave {
  animation: v-modal-out 0.2s ease forwards;
}

@keyframes v-modal-in {
  0% {
    opacity: 0;
  }
}

@keyframes v-modal-out {
  100% {
    opacity: 0;
  }
}

.v-modal {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  opacity: 0.5;
  background: #000;
}

.e-popup-parent--hidden {
  overflow: hidden;
}

.e-dialog {
  position: relative;
  margin: 0 auto 50px;
  background: #fff;
  border-radius: 2px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
  box-sizing: border-box;
  width: 50%;
}

.e-dialog.is-fullscreen {
  width: 100%;
  margin-top: 0;
  margin-bottom: 0;
  height: 100%;
  overflow: auto;
}

.e-dialog__wrapper {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: auto;
  margin: 0;
}

.e-dialog__header {
  padding: 20px 20px 10px;
}

.e-dialog__headerbtn {
  position: absolute;
  top: 20px;
  right: 20px;
  padding: 0;
  background: 0 0;
  border: none;
  outline: 0;
  cursor: pointer;
  font-size: 16px;
}

.e-dialog__headerbtn .e-dialog__close {
  color: #909399;
}

.e-dialog__headerbtn:focus .e-dialog__close,
.e-dialog__headerbtn:hover .e-dialog__close {
  color: #409eff;
}

.e-dialog__title {
  line-height: 24px;
  font-size: 18px;
  color: #303133;
}

.e-dialog__body {
  padding: 30px 20px;
  color: #606266;
  font-size: 14px;
  word-break: break-all;
}

.e-dialog__footer {
  padding: 10px 20px 20px;
  text-align: right;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}

.e-dialog--center {
  text-align: center;
}

.e-dialog--center .e-dialog__body {
  text-align: initial;
  padding: 25px 25px 30px;
}

.e-dialog--center .e-dialog__footer {
  text-align: inherit;
}

.dialog-fade-enter-active {
  animation: dialog-fade-in 0.3s;
}

.dialog-fade-leave-active {
  animation: dialog-fade-out 0.3s;
}

@keyframes dialog-fade-in {
  0% {
    transform: translate3d(0, -20px, 0);
    opacity: 0;
  }

  100% {
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }
}

@keyframes dialog-fade-out {
  0% {
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }

  100% {
    transform: translate3d(0, -20px, 0);
    opacity: 0;
  }
}
</style>