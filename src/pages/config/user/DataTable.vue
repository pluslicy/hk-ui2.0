<template>
  <div>
    <div class="user_data_table">
      <!-- 表格开始 -->
      <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column
          type="selection"
          width="55" />
        <el-table-column
          prop="date"
          label="序号"
          width="180" />
        <el-table-column
          prop="name"
          label="姓名"
          width="180" />
        <el-table-column
          prop="address"
          label="账号" />
        <el-table-column
          prop="address"
          label="管理员" />
        <el-table-column
          prop="address"
          label="电话" />
        <el-table-column
          prop="address"
          label="状态" />
        <el-table-column
          prop="address"
          label="操作" />
        <template slot-scope="{}">
          <i class="fa fa-trash" title="删除">1</i>
          <i class="fa fa-pencil" title="修改">2</i>
          <i class="fa fa-info" title="查看详细信息" @click="toShowModel">3</i>
        </template>
      </el-table>
    </div>
    <!-- 表格结束 -->
    <!-- 详细信息模态框开始 -->
    <div>
      <user-data-dialog />
    </div>
  <!-- 详细信息模态框结束 -->
  </div>
</template>
<script>
import userDataDialog from './DataDialog.vue'
export default {
  components: {
    userDataDialog
  },
  data() {
    return {
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }]
      // dialogVisible:'',
      // // 父组件向子组件传值
      // props:{
      //   dialogVisible=true
      // }
    }
  },
  methods: {
    // 展开详细信息的模态框
    toShowModel() {
      this.dialogVisible = true
    }
  }
}
</script>

<style scoped>
  i{
    cursor: pointer;
  }
</style>
