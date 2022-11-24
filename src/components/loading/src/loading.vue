<template>
  <transition name="e-loading-fade" @after-leave="handleAfterLeave">
    <div v-show="visible" class="e-loading-mask">
      <div class="e-loading-spinner">
        <svg v-if="!spinner" class="circular" viewBox="25 25 50 50">
          <circle class="path" cx="50" cy="50" r="20" fill="none" />
        </svg>
        <i v-else :class="spinner"></i>
        <p v-if="text" class="e-loading-text">{{ text }}</p>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  data() {
    return {
      text: null,
      spinner: null,
      visible: false,
    };
  },
  methods: {
    handleAfterLeave() {
      this.$emit("after-leave");
    },
    setText(text){
      this.text = text
    }
  },
};
</script>

<style>

.e-loading-mask {
  position: absolute;
  z-index: 2000;
  background-color: rgba(255, 255, 255, .9);
  margin: 0;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  transition: opacity .3s
}

.e-loading-spinner {
  top: 50%;
  margin-top: -21px;
  width: 100%;
  text-align: center;
  position: absolute
}

.e-loading-spinner .e-loading-text {
  color: #409EFF;
  margin: 3px 0;
  font-size: 14px
}

.e-loading-spinner .circular {
  height: 42px;
  width: 42px;
  animation: loading-rotate 2s linear infinite
}

.e-loading-spinner .path {
  animation: loading-dash 1.5s ease-in-out infinite;
  stroke-dasharray: 90, 150;
  stroke-dashoffset: 0;
  stroke-width: 2;
  stroke: #409EFF;
  stroke-linecap: round
}

.e-loading-spinner i {
  color: #409EFF
}

.e-loading-fade-enter,
.e-loading-fade-leave-active {
  opacity: 0
}

@-webkit-keyframes loading-rotate {
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg)
  }
}

@keyframes loading-rotate {
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg)
  }
}

@-webkit-keyframes loading-dash {
  0% {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0
  }

  50% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -40px
  }

  100% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -120px
  }
}

@keyframes loading-dash {
  0% {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0
  }

  50% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -40px
  }

  100% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -120px
  }
}
</style>