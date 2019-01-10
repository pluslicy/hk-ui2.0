<template>
  <div class="role_data_table">
    <el-table
      :data="tableData"
      :height="he"
      size="mini"
      style="width: 100%"
      @selection-change="handleSelectionChange">
      <el-table-column
        type="selection"
        width="55" />
      <el-table-column
        prop="date"
        label="序号"
        width="180" />
      <el-table-column
        prop="name"
        label="角色名称"
        width="180" />
      <el-table-column
        prop="address"
        label="角色权限信息" />
      <el-table-column
        prop="name"
        label="用户名称" />
      <el-table-column
        prop="address"
        width="100"
        align="center"
        label="操作">
        <template slot-scope="{row}">
          <i class="el-icon-delete" title="删除" @click="delRole(row.id)" />
          <i class="el-icon-edit" title="修改" @click="toUpdateRoleDialog(row)" />
        </template>
      </el-table-column>
    </el-table>
    <!-- 修改模态框开始 -->
    <role-update-dialog ref="roleUpdateDialog" />
    <!-- 修改模态框结束 -->
  </div>
</template>
<script>
import roleUpdateDialog from './updateRoleDialog.vue'
import $ from 'jquery'
export default {
  components: {
    roleUpdateDialog
  },
  data() {
    return {
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄',
        id: 1
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄',
        id: 2
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄',
        id: 3
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄',
        id: 4
      }]
    }
  },
  created() {
    // 表格高度
    this.he = $(window).height() - 194
  },
  methods: {
    // 多选框
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    toUpdateRoleDialog(row) {
      this.$refs.roleUpdateDialog.toOpenDialog(row)
    }
  }
}
</script>
<style scoped>
  i {
    cursor: pointer;
    margin-right: .5em
  }
  .el-icon-delete {
    color: #F56C6C
  }
  .el-icon-edit {
    color: #E6A23C
  }
  .el-icon-tickets {
    color: #67C23A
  }
</style>
