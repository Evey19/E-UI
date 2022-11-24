<template>
  <transition name="msgbox-fade">
    <div class="e-message-box__wrapper" v-show="visible">
      <div class="e-message-box" :class="[center && 'e-message-box--center']">
        <div class="e-message-box__header" v-if="title !== null">
          <div class="e-message-box__title">
            <div
              :class="['e-message-box__status', icon]"
              v-if="icon && center"
            ></div>
            <span>{{ title }}</span>
          </div>
          <button
            type="button"
            class="e-message-box__headerbtn"
            v-if="showClose"
            @click="handleAction('close')"
          >
            <i class="e-message-box__close el-icon-close"></i>
          </button>
        </div>
        <div class="e-message-box__content">
          <div class="e-message-box__container">
            <div
              :class="['e-message-box__status', icon]"
              v-if="icon && !center && message !== ''"
            ></div>
            <div class="e-message-box__message" v-if="message !== ''">
              <p>{{ message }}</p>
            </div>
          </div>
        </div>
        <div class="e-message-box__btns">
          <el-button
            v-if="showCancelButton"
            size="small"
            @click.native="handleAction('cancel')"
          >
            {{ cancelButtonText }}
          </el-button>
          <el-button
            ref="confirm"
            v-show="showConfirmButton"
            size="small"
            @click.native="handleAction('confirm')"
          >
            {{ confirmButtonText }}
          </el-button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
let typeMap = {
  success: "success",
  info: "info",
  warning: "warning",
  error: "error",
};
export default {
  data() {
    return {
      title: undefined,
      message: "",
      type: "",
      iconClass: "",
      uid: 1,
      showConfirmButton: true,
      showCancelButton: false,
      confirmButtonText: "",
      cancelButtonText: "",
      visible: false,
      showClose: true,
      center: false,
    };
  },
  computed: {
    icon() {
      const { type, iconClass } = this;
      return (
        iconClass || (type && typeMap[type] ? `el-icon-${typeMap[type]}` : "")
      );
    },
  },
  methods: {
    handleAction(action) {
      if (this.$type === "prompt" && action === "confirm") return;
      this.action = action;
      this.doClose();
    },
    doClose() {
      if (!this.visible) return;
      this.visible = false;
      setTimeout(() => {
        if (this.action) this.callback(this.action, this);
      });
    },
  },
};
</script>

<style>
.e-message-box,
.e-popup-parent--hidden {
  overflow: hidden;
}

.v-modal-enter {
  -webkit-animation: v-modal-in 0.2s ease;
  animation: v-modal-in 0.2s ease;
}

.v-modal-leave {
  -webkit-animation: v-modal-out 0.2s ease forwards;
  animation: v-modal-out 0.2s ease forwards;
}

@-webkit-keyframes v-modal-in {
  0% {
    opacity: 0;
  }
}

@keyframes v-modal-in {
  0% {
    opacity: 0;
  }
}

@-webkit-keyframes v-modal-out {
  100% {
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

.e-message-box {
  display: inline-block;
  width: 420px;
  padding-bottom: 10px;
  vertical-align: middle;
  background-color: #fff;
  border-radius: 4px;
  border: 1px solid #ebeef5;
  font-size: 18px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  text-align: left;
  backface-visibility: hidden;
}

.e-message-box__wrapper {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  text-align: center;
}

.e-message-box__wrapper::after {
  content: "";
  display: inline-block;
  height: 100%;
  width: 0;
  vertical-align: middle;
}

.e-message-box__header {
  position: relative;
  padding: 15px 15px 10px;
}

.e-message-box__title {
  padding-left: 0;
  margin-bottom: 0;
  font-size: 18px;
  line-height: 1;
  color: #303133;
}

.e-message-box__headerbtn {
  position: absolute;
  top: 15px;
  right: 15px;
  padding: 0;
  border: none;
  outline: 0;
  background: 0 0;
  font-size: 16px;
  cursor: pointer;
}

.e-message-box__headerbtn .e-message-box__close {
  color: #909399;
}

.e-message-box__headerbtn:focus .e-message-box__close,
.e-message-box__headerbtn:hover .e-message-box__close {
  color: #409eff;
}

.e-message-box__content {
  padding: 10px 15px;
  color: #606266;
  font-size: 14px;
}

.e-message-box__container {
  position: relative;
}

.e-message-box__status {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  font-size: 24px !important;
}

.e-message-box__status::before {
  padding-left: 1px;
}

.e-message-box__status + .e-message-box__message {
  padding-left: 36px;
  padding-right: 12px;
}

.e-message-box__status.el-icon-success {
  color: #67c23a;
}

.e-message-box__status.el-icon-info {
  color: #909399;
}

.e-message-box__status.el-icon-warning {
  color: #e6a23c;
}

.e-message-box__status.el-icon-error {
  color: #f56c6c;
}

.e-message-box__message {
  margin: 0;
}

.e-message-box__message p {
  margin: 0;
  line-height: 24px;
}

.e-message-box__errormsg {
  color: #f56c6c;
  font-size: 12px;
  min-height: 18px;
  margin-top: 2px;
}

.e-message-box__btns {
  padding: 5px 15px 0;
  text-align: right;
}

.e-message-box__btns button:nth-child(2) {
  margin-left: 10px;
}

.e-message-box--center {
  padding-bottom: 30px;
}

.e-message-box--center .el-message-box__header {
  padding-top: 30px;
}

.e-message-box--center .e-message-box__title {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.e-message-box--center .e-message-box__status {
  position: relative;
  top: auto;
  padding-right: 5px;
  text-align: center;
  transform: translateY(-1px);
}

.e-message-box--center .e-message-box__message {
  margin-left: 0;
}

.e-message-box--center .e-message-box__btns,
.e-message-box--center .e-message-box__content {
  text-align: center;
}

.e-message-box--center .e-message-box__content {
  padding-left: 27px;
  padding-right: 27px;
}

.msgbox-fade-enter-active {
  animation: msgbox-fade-in 0.3s;
}

.msgbox-fade-leave-active {
  animation: msgbox-fade-out 0.3s;
}

@keyframes msgbox-fade-in {
  0% {
    transform: translate3d(0, -20px, 0);
    opacity: 0;
  }

  100% {
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }
}

@keyframes msgbox-fade-out {
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