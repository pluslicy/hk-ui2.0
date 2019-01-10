<template>
  <div class="user">
    <!-- 下拉框按钮组合开始 -->
    <div class="top">
      <el-select v-model="value5" clearable placeholder="请选择" size="mini">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value" />
      </el-select>
      <el-input placeholder="请输入帐号" style="width:200px" size="mini" />
      <el-input placeholder="请输入用户姓名" style="width:200px" size="mini" />
      <el-button type="primary" plain size="mini">查询</el-button>
      <div class="btns">
        <el-button size="mini" type="primary" plain @click="toAddUser()">新增</el-button>
        <el-button size="mini" type="primary" plain @click="toAccredit()">授权</el-button>
        <el-button size="mini" type="primary" plain @click="delUsers">批量删除</el-button>
      </div>
      <!-- <i @headCallBack="showChildMessage" /> -->
    </div>
    <!-- 下拉框按钮组合结束 -->
    <!-- 表格组件调用 -->
    <div>
      <user-data-table ref="userDataTable" />
    </div>
    <!-- 表格组件调用结束 -->
    <!-- 分页开始 -->
    <div class="paging">
      <el-pagination
        :total="1000"
        :current-page.sync="currentPage1"
        :page-size="100"
        layout="total, prev, pager, next"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange" />
    </div>
    <!-- 新增模态框开始 -->
    <user-add-dialog ref="userAddDialog" />
    <!-- 新增模态框结束 -->
    <!-- 授权模态框开始 -->
    <user-accredit-dialog ref="userAccreditDialog" />
    <!-- 授权模态框结束 -->
    <!-- 监听子组件事件 -->
    <!-- <child  /> -->
  </div>
</template>
<script>
import userDataTable from './DataTable.vue'
import userAddDialog from './AddDialog.vue'
import userAccreditDialog from './AccreditDialog.vue'
export default {
  components: {
    userDataTable,
    userAddDialog,
    userAccreditDialog
  },
  data() {
    return {
      // 下拉框开始
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      ids: [],
      value5: '',
      // 下拉框结束
      // input输入框
      input: '',
      // input输入框结束
      // 多选框
      multipleSelection: [],
      // 分页
      currentPage1: 5,
      currentPage2: 5,
      currentPage3: 5,
      currentPage4: 4
    }
  },
  methods: {
    // 新增用户
    toAddUser() {
      this.$refs.userAddDialog.toOpenDialog()
    },
    // 打开授权模态框
    toAccredit() {
      this.$refs.userAccreditDialog.toOpenDialog()
    },
    // 分页
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
    },
    // 获取批量删除所有的的id
    delUsers() {
      this.ids = this.$refs.userDataTable.ids
      console.log(this.ids)
    }
  }
}
</script>
<style scoped>
  .user {
    margin: 1em;
    background: #ffffff;
    border-radius: 3px;
    /* min-height: 850px; */
    padding: 1em;
    overflow: hidden;
  }
  .btns{
    float: right;
  }
  .top * {
    /* margin-right: 2em; */
    margin-bottom: 1em
  }
  i {
    cursor: pointer;
    margin-right: .5em
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
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
  .paging {
    float: right
  }
</style>
