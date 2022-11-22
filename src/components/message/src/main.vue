<template>
  <transition name="e-message-fade" @after-leave="handleAfterLeave">
    <div
      :class="[
        'e-message',
        type && !iconClass ? `e-message--${type}` : '',
        center ? 'is-center' : '',
      ]"
      :style="positionStyle"
      v-show="visible"
      @mouseenter="clearTimer"
      @mouseleave="startTimer"
    >
      <i :class="iconClass" v-if="iconClass"></i>
      <i :class="typeClass" v-else></i>
      <p class="e-message__content">{{ message }}</p>
    </div>
  </transition>
</template>

<script>
const typeMap = {
  success: "success",
  info: "info",
  warning: "warning",
  error: "error",
};
export default {
  data() {
    return {
      visible: false,
      type: "info",
      verticalOffset: 20,
      duration: 3000,
      timer: null,
      closed: false,
      center: false,
      iconClass: "",
      message: "",
      onClose: null,
    };
  },
  computed: {
    typeClass() {
      return this.type && !this.iconClass
        ? `e-message__icon el-icon-${typeMap[this.type]}`
        : "";
    },
    positionStyle() {
      return {
        top: `${this.verticalOffset}px`,
      };
    },
  },
  watch: {
    closed(newVal) {
      if (newVal) {
        this.visible = false;
      }
    },
  },
  methods: {
    handleAfterLeave() {
      this.$destroy(true);
      this.$el.parentNode.removeChild(this.$el);
    },
    startTimer() {
      if (this.duration > 0) {
        this.timer = setTimeout(() => {
          if (!this.closed) {
            this.close();
          }
        }, this.duration);
      }
    },
    clearTimer() {
      clearTimeout(this.timer);
    },
    close() {
      this.closed = true;
      if(typeof this.onClose === 'function'){
        this.onClose(this)
      }
    },
  },
  mounted() {
    this.startTimer();
  },
};
</script>

<style>
.e-message {
  min-width: 380px;
  box-sizing: border-box;
  border-radius: 4px;
  border-width: 1px;
  border-style: solid;
  border-color: #ebeef5;
  position: fixed;
  left: 50%;
  top: 20px;
  transform: translateX(-50%);
  background-color: #edf2fc;
  transition: opacity 0.3s, top 0.4s, -webkit-transform 0.4s;
  transition: opacity 0.3s, transform 0.4s, top 0.4s;
  transition: opacity 0.3s, transform 0.4s, top 0.4s, -webkit-transform 0.4s;
  overflow: hidden;
  padding: 15px 15px 15px 20px;
  display: flex;
  align-items: center;
}

.e-message.is-center {
  justify-content: center;
}

.e-message--info .e-message__content {
  color: #909399;
}

.e-message--success {
  background-color: #f0f9eb;
  border-color: #e1f3d8;
}

.e-message--success .e-message__content {
  color: #67c23a;
}

.e-message--warning {
  background-color: #fdf6ec;
  border-color: #faecd8;
}

.e-message--error {
  background-color: #fef0f0;
  border-color: #fde2e2;
}

.e-message--error .e-message__content {
  color: #f56c6c;
}

.e-message__icon {
  margin-right: 10px;
}

.e-message__content {
  padding: 0;
  font-size: 14px;
  line-height: 1;
}

.e-message__content:focus {
  outline-width: 0;
}

.e-message .el-icon-success {
  color: #67c23a;
}

.e-message .el-icon-error {
  color: #f56c6c;
}

.e-message .el-icon-info {
  color: #909399;
}

.e-message .el-icon-warning {
  color: #e6a23c;
}

.e-message-fade-enter,
.e-message-fade-leave-active {
  opacity: 0;
  transform: translate(-50%, -100%);
}
</style>