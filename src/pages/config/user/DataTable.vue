<template>
  <div>
    <div class="user_data_table">
      <!-- 表格开始 -->
      <el-table
        :data="tableData"
        :height="he"
        size="mini"
        style="width: 100%"
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="55"
          fixed />
        <el-table-column
          prop="date"
          label="序号"
          width="180" />
        <el-table-column
          prop="name"
          label="姓名"
          width="180" />
        <el-table-column
          prop="number"
          label="账号" />
        <el-table-column
          prop="admin"
          label="管理员" />
        <el-table-column
          prop="tel"
          label="电话" />
        <el-table-column
          prop="status"
          label="状态" />
        <el-table-column
          label="操作"
          fixed="right"
          width="120"
          align="center">
          <template slot-scope="{row}">
            <i class="el-icon-delete" title="删除" @click="delUser(row.id)" />
            <i class="el-icon-edit" title="修改" @click="toUpdateUser(row)" />
            <i class="el-icon-tickets" title="查看详细信息" @click="toShowModel" />
            <i class="el-icon-setting" title="修改密码" @click="toShowPasswordModel" />
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 表格结束 -->
    <!-- 详细信息模态框开始 -->
    <div>
      <user-data-dialog ref="userDataDialog" />
    </div>
    <!-- 详细信息模态框结束 -->
    <!-- 修改模态框组件开始 -->
    <div>
      <user-update-dialog ref="userUpdateDialog" />
    </div>
    <!-- 修改模态框组件结束 -->
    <!-- 修改密码模态框开始 -->
    <div>
      <user-password-dialog ref="userPasswordDialog" />
    </div>
    <!-- 修改密码模态框结束 -->
  </div>
</template>
<script>
import $ from 'jquery'
import userDataDialog from './DataDialog.vue'
import userUpdateDialog from './UpdateDialog.vue'
import userPasswordDialog from './PasswordDialog.vue'
export default {
  components: {
    userDataDialog,
    userUpdateDialog,
    userPasswordDialog
  },
  data() {
    return {
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄',
        id: 1,
        tel: 111,
        admin: '李浩',
        status: '启用',
        description: '111111111111',
        number: 1232534
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄',
        id: 2,
        tel: 222,
        admin: '李浩',
        status: '启用',
        description: '000000000000',
        number: 1232534
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄',
        id: 3,
        tel: 333,
        admin: '李浩',
        status: '启用',
        description: '3333333333',
        number: 1232534
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄',
        id: 4,
        tel: 444,
        admin: '李浩',
        status: '禁用',
        description: '55555555555',
        number: 1232534
      }],
      multipleSelection: [],
      ids: []
    }
  },
  watch: {
    multipleSelection: function(now, old) {
      this.foo()
    }
  },
  created() {
    this.he = $(window).height() - 237
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val
      // this.ids = this.multipleSelection.map((item) => {
      //   return item.id
      // })
    },
    // 详情模态框
    toShowModel() {
      this.$refs.userDataDialog.toOpenDialog()
    },
    // 修改模态框
    toUpdateUser(row) {
      this.$refs.userUpdateDialog.toOpenDialog(row)
    },
    // 修改密码模态框
    toShowPasswordModel() {
      this.$refs.userPasswordDialog.toOpenDialog()
    },
    // 删除
    delUser(id) {
      alert(id)
    },
    // 拿到批量删除的ids
    // 向父组件发送批量删除的ids
    foo() {
      // alert(1)
      // this.$emit('headCallBack', this.ids)
      this.ids = this.multipleSelection.map((item) => {
        return item.id
      })
      alert(this.ids)
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

