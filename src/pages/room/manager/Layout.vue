<template>
  <!-- 机房管理 -->
  <div class="manager">
    <!-- 表单 -->
    <div class="manager_form">
      <el-form :inline="true" :model="formInline" class="demo-form-inline" size="mini">
        <el-form-item label="">
          <el-select v-model="value4" clearable placeholder="选择机房">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value" />
              <!-- </el-option> -->
          </el-select>
        </el-form-item>
      </el-form>
    </div>
    <!-- 按钮 -->
    <div class="manager_btns">
      <el-button type="primary" plain size="mini" @click="toAddManager">新增</el-button>
      <el-button type="primary" plain size="mini" @click="batchDeleteManager">批量删除</el-button>
    </div>
    <!-- 数据表格 -->
    <!-- <manager-data-table /> -->
    <div class="manager_table">
      <el-table
        ref="multipleTable"
        :data="managers"
        :height="he"
        tooltip-effect="dark"
        style="width: 100%"
        size="mini"
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="55" />
        <!-- </el-table-column> -->
        <el-table-column
          prop="date"
          label="日期" />
        <!-- </el-table-column> -->
        <el-table-column
          prop="name"
          label="姓名" />
        <!-- </el-table-column> -->
        <el-table-column
          prop="address"
          label="地址" />
        <!-- </el-table-column> -->
        <el-table-column
          width="80"
          label="操作">
          <template slot-scope="{row}">
            <!-- <i class="fa fa-food"></i> -->
            <i class="el-icon-edit" @click="toUpdateManager(row)" />
            <!-- </i> -->
            <i class="el-icon-delete" @click="deleteManager(row.id)" />
            <!-- </i> -->
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 分页 -->
    <!-- <manager-pagination /> -->
    <div class="manager_pagination">
      <el-pagination
        :page-size="100"
        :total="1000"
        layout="total, prev, pager, next"
        @current-change="handleCurrentChange" />
        <!-- </el-pagination> -->
    </div>
    <!-- 模态框 -->
    <!-- <manager-dialog /> -->
    <div class="manager_dialog">
      <el-dialog :visible.sync="managerDialog.visible" :title="managerDialog.title" :before-close="closeDialog" width="30%">
        <el-form :model="managerDialog.form" size="mini">
          <el-form-item :label-width="formLabelWidth" label="机房名称">
            <el-input v-model="managerDialog.form.name" autocomplete="off" clearable />
            <!-- </el-input> -->
          </el-form-item>
          <el-form-item :label-width="formLabelWidth" label="机房描述">
            <el-input :rows="2" v-model="textarea" type="textarea" placeholder="" />
            <!-- </el-input> -->
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button size="mini" @click="closeDialog">取 消</el-button>
          <el-button type="primary" size="mini" @click="saveOrUpdateManager">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import $ from 'jquery'
export default {
  data() {
    return {
      formInline: {
        user: '',
        region: ''
      },
      options: [{
        value: '1',
        label: '我的机房'
      }, {
        value: '2',
        label: '我的机房2'
      }, {
        value: '3',
        label: '我的机房3'
      }, {
        value: '4',
        label: '我的机房4'
      }, {
        value: '5',
        label: '我的机房5'
      }],
      value4: '',
      managers: [{
        id: 1,
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        id: 2,
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }],
      multipleSelection: [],
      currentPage1: 5,
      managerDialog: {
        title: '',
        visible: false,
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        }
      },
      textarea: '',
      formLabelWidth: '100px'
    }
  },
  created() {
    // 表格高度
    this.he = $(window).height() - 230
  },
  methods: {
    // 多选框获取信息
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    // 当前页的改变
    handleCurrentChange(val) {
      console.log(1)
    },
    // 关闭模态框
    closeDialog() {
      this.managerDialog.visible = false
    },
    // 保存或修改机房信息
    saveOrUpdateManager() {
      this.closeDialog()
    },
    // 新增机房信息
    toAddManager() {
      this.managerDialog.visible = true
      this.managerDialog.title = '新增机房信息'
      this.managerDialog.form = {}
    },
    // 修改机房信息
    toUpdateManager(row) {
      this.managerDialog.visible = true
      this.managerDialog.title = '修改机房信息'
      this.managerDialog.form = row
    },
    // 删除机房
    deleteManager(id) {

    },
    // 批量删除机房
    batchDeleteManager() {

    }
  }
}
</script>

<style scoped>
  /* 机房管理 */
  .manager {
    background-color: #ffffff;
    margin: 1em;
    padding: 1em;
    border-radius: 3px;
    /* min-height: 500px; */
  }
  /* 表单 */
  .manager_form {
    float: left;
  }
  /* 按钮 */
  .manager_btns {
    text-align: right;
  }
  /* 分页 */
  .manager_pagination {
    text-align: right;
  }
  /* 表格中修改图标 */
  .manager_table i.el-icon-edit {
    color: #409EFF;
  }
  /* 表格中删除图标 */
  .manager_table i.el-icon-delete {
    color: #F56C6C;
    padding-left: .5em;
  }
</style>
