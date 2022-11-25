<template>
  <transition name="e-notification-fade">
    <div
      :class="['e-notification', horizontalClass]"
      v-show="visible"
      :style="positionStyle"
      @mouseenter="clearTimer"
      @mouseleave="startTimer"
    >
      <i
        class="e-notification__icon"
        :class="[typeClass, iconClass]"
        v-if="type || iconClass"
      ></i>
      <div
        class="e-notification__group"
        :class="{ 'is-with-icon': typeClass || iconClass }"
      >
        <h2 class="e-notification__title" v-text="title"></h2>
        <div class="e-notification__content" v-show="message">
          <p>{{ message }}</p>
        </div>
        <div
          class="e-notification__closeBtn el-icon-close"
          v-if="showClose"
          @click.stop="close"
        ></div>
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
      visible: false,
      title: "",
      message: "",
      duration: 4500,
      type: "",
      showClose: true,
      iconClass: "",
      onClose: null,
      closed: false,
      verticalOffset: 0,
      timer: null,
      position: "top-right",
    };
  },
  computed: {
    typeClass() {
      return this.type && typeMap[this.type]
        ? `el-icon-${typeMap[this.type]}`
        : "";
    },
    verticalProperty() {
      return /^top-/.test(this.position) ? "top" : "bottom";
    },
    positionStyle() {
      return {
        [this.verticalProperty]: `${this.verticalOffset}px`,
      };
    },
    horizontalClass() {
      return this.position.indexOf("right") > -1 ? "right" : "left";
    },
  },
  watch: {
    closed(newVal) {
      if (newVal) {
        this.visible = false;
        this.$destroy(true);
        this.$el.parentNode.removeChild(this.$el);
      }
    },
  },
  mounted() {
    if (this.duration > 0) {
      this.timer = setTimeout(() => {
        if (!this.closed) {
          this.close();
        }
      }, this.duration);
    }
  },
  methods: {
    close() {
      this.closed = true;
      if (typeof this.onClose === "function") {
        this.onClose();
      }
    },
    clearTimer() {
      clearTimeout(this.timer);
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
  },
};
</script>

<style>
.e-notification {
  display: flex;
  width: 330px;
  padding: 14px 26px 14px 13px;
  border-radius: 8px;
  box-sizing: border-box;
  border: 1px solid #ebeef5;
  position: fixed;
  background-color: #fff;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  transition: opacity 0.3s, left 0.3s, right 0.3s, top 0.4s, bottom 0.3s,
    -webkit-transform 0.3s;
  transition: opacity 0.3s, transform 0.3s, left 0.3s, right 0.3s, top 0.4s,
    bottom 0.3s;
  transition: opacity 0.3s, transform 0.3s, left 0.3s, right 0.3s, top 0.4s,
    bottom 0.3s, -webkit-transform 0.3s;
  overflow: hidden;
}

.e-notification.right {
  right: 16px;
}

.e-notification.left {
  left: 16px;
}

.e-notification__group {
  margin-left: 13px;
  margin-right: 8px;
}

.e-notification__title {
  font-weight: 700;
  font-size: 16px;
  color: #303133;
  margin: 0;
}

.e-notification__content {
  font-size: 14px;
  line-height: 21px;
  margin: 6px 0 0;
  color: #606266;
  text-align: justify;
}

.e-notification__content p {
  margin: 0;
}

.e-notification__icon {
  height: 24px;
  width: 24px;
  font-size: 24px;
}

.e-notification__closeBtn {
  position: absolute;
  top: 18px;
  right: 15px;
  cursor: pointer;
  color: #909399;
  font-size: 16px;
}

.e-notification__closeBtn:hover {
  color: #606266;
}

.e-notification .el-icon-success {
  color: #67c23a;
}

.e-notification .el-icon-error {
  color: #f56c6c;
}

.e-notification .el-icon-info {
  color: #909399;
}

.e-notification .el-icon-warning {
  color: #e6a23c;
}

.e-notification-fade-enter.right {
  right: 0;
  -webkit-transform: translateX(100%);
  transform: translateX(100%);
}

.e-notification-fade-enter.left {
  left: 0;
  -webkit-transform: translateX(-100%);
  transform: translateX(-100%);
}

.e-notification-fade-leave-active {
  opacity: 0;
}
</style>