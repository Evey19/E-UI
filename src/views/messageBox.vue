<template>
  <div class="page-component__content">
    <h3>消息提示</h3>
    <div class="demo-block">
      <el-button type="text" @click="open">点击打开 Message Box</el-button>
    </div>
    <h3>确认消息</h3>
    <div class="demo-block">
      <el-button type="text" @click="open2">点击打开 Message Box</el-button>
    </div>
  </div>
</template>


<script>
  export default {
    methods: {
      open() {
        this.$alert('这是一段内容', '标题名称', {
          confirmButtonText: '确定',
          callback: action => {
            this.$message({
              type: 'info',
              message: `action: ${ action }`
            });
          }
        })
      },
      open2() {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      }
    }
  }
</script>

<style>
.page-component__content {
  width: 868px;
  padding-bottom: 100px;
  box-sizing: border-box;
}
.demo-block {
  border: 1px solid #ebebeb;
  border-radius: 3px;
  margin-bottom: 24px;
  padding: 24px;
}
</style>