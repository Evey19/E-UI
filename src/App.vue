<template>
  <div id="app" class="page-component__scroll">
    <div class="left">
      <el-menu
        :default-active="$route.path"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        router
      >
        <el-menu-item
          v-for="(item, index) in routeArr"
          :key="index"
          :index="item.path"
        >
          <span slot="title">{{ item.path.slice(1) }}</span>
        </el-menu-item>
      </el-menu>
    </div>
    <div class="right">
      <div class="rightTop">
        <h5>E UI(参考Element UI)</h5>
      </div>
      <div class="rightBottom">
        <div class="rightBottomContent">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import routeArr from "./router/routeArr";
export default {
  name: "App",
  data() {
    return {
      routeArr,
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
  },
};
</script>

<style lang="scss" scoped>
#app {
  width: 100%;
  height: 100vh;
  box-sizing: border-box;
  display: flex;
  .left {
    width: 180px;
    height: 100%;
    background-color: #bfa;
    overflow-y: auto;
    -ms-overflow-style: none;
    overflow: -moz-scrollbars-none;
    .el-menu-vertical-demo {
      width: 100%;
      height: 100%;
    }
  }
  .left::-webkit-scrollbar {
    width: 0 !important;
  }
  .right {
    height: 100%;
    width: calc(100% - 180px);
    .rightTop {
      width: 100%;
      height: 48px;
      background-color: #cde;
      display: flex;
      align-items: center;
      box-sizing: border-box;
      padding: 0 12px;
    }
    .rightBottom {
      width: 100%;
      height: calc(100% - 48px);
      box-sizing: border-box;
      padding: 12px;
      background-color: #f7f7f7;
      .rightBottomContent {
        width: 100%;
        height: 100%;
        background-color: #fff;
        overflow-y: auto;
        box-sizing: border-box;
        padding: 12px;
      }
    }
  }
}

</style>
