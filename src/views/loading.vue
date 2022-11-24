<template>
  <div class="page-component__content">
    <h3>区域加载</h3>
    <div class="demo-block">
      <el-table v-loading="loading" :data="tableData" style="width: 100%">
      <el-table-column prop="date" label="日期" width="180"> </el-table-column>
      <el-table-column prop="name" label="姓名" width="180"> </el-table-column>
      <el-table-column prop="address" label="地址"> </el-table-column>
    </el-table>
    </div>
    
    <h3>自定义</h3>
    <div class="demo-block">
      <el-table
        v-loading="loading"
        e-loading-text="拼命加载中"
        e-loading-spinner="el-icon-loading"
        :data="tableData"
        style="width: 100%"
      >
        <el-table-column prop="date" label="日期" width="180">
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="180">
        </el-table-column>
        <el-table-column prop="address" label="地址"> </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tableData: [
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
      ],
      loading: true,
    };
  },
};
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