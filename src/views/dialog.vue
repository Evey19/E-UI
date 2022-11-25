<template>
  <div class="page-component__content">
    <h3>基本用法</h3>
    <div class="demo-block">
      <el-button type="text" @click="dialogVisible = true"
        >点击打开 Dialog</el-button
      >

      <e-dialog
        title="提示"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose"
      >
        <span>这是一段信息</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false"
            >确 定</el-button
          >
        </span>
      </e-dialog>
    </div>
    <h3>自定义内容</h3>
    <div class="demo-block">
      <el-button type="text" @click="dialogTableVisible = true"
        >打开嵌套表格的 Dialog</el-button
      >
      <e-dialog title="收货地址" :visible.sync="dialogTableVisible">
        <el-table :data="gridData">
          <el-table-column
            property="date"
            label="日期"
            width="150"
          ></el-table-column>
          <el-table-column
            property="name"
            label="姓名"
            width="200"
          ></el-table-column>
          <el-table-column property="address" label="地址"></el-table-column>
        </el-table>
      </e-dialog>
    </div>
    <h3>嵌套的Dialog</h3>
    <div class="demo-block">
      <el-button type="text" @click="outerVisible = true"
        >点击打开外层 Dialog</el-button
      >

      <e-dialog title="外层 Dialog" :visible.sync="outerVisible">
        <e-dialog
          width="30%"
          title="内层 Dialog"
          :visible.sync="innerVisible"
          append-to-body
        >
        </e-dialog>
        <div slot="footer" class="dialog-footer">
          <el-button @click="outerVisible = false">取 消</el-button>
          <el-button type="primary" @click="innerVisible = true"
            >打开内层 Dialog</el-button
          >
        </div>
      </e-dialog>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogVisible: false,
      dialogTableVisible: false,
      gridData: [
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
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
      ],
      outerVisible: false,
      innerVisible: false,
    };
  },
  methods: {
    handleClose(done) {
      this.$confirm("确认关闭？", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      })
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
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