<template>
  <!-- 设备管理数据 -->
  <div class="device_data_table">
    <el-table
      ref="multipleTable"
      :data="devices"
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
          <!-- {{row.id}} -->
          <!-- <i class="fa fa-food"></i> -->
          <i class="el-icon-view" title="详细信息" @click="toView" />
          <i class="el-icon-edit" title="修改" @click="toUpdateManager(row)" />
          <i class="el-icon-delete" title="删除" @click="deleteManager(row.id)" />
        </template>
      </el-table-column>
    </el-table>
    <!-- 模态框 -->
    <device-dialog ref="deviceDialog" />
  </div>
</template>

<script>
import $ from 'jquery'
import deviceDialog from './Dialog.vue'
export default {
  components: {
    deviceDialog
  },
  data() {
    return {
      devices: [{
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
      multipleSelection: []
    }
  },
  created() {
    this.he = $(window).height() - 230
  },
  methods: {
    // 查看设备详细信息
    toView() {
      this.$refs.deviceDialog.showViewDialog()
    },
    // 修改设备信息
    toUpdateManager(row) {
      this.$refs.deviceDialog.showDialog()
      this.$refs.deviceDialog.deviceDialog.title = '修改设备信息'
      this.$refs.deviceDialog.deviceDialog.form = row
    },
    // 多选
    handleSelectionChange(val) {
      this.multipleSelection = val
    }
  }
}
</script>

<style scoped>
  /* 设备管理表格中查看图标 */
  .device_data_table i.el-icon-view {
    color: #909399;
  }
  /* 设备管理表格中修改图标 */
  .device_data_table i.el-icon-edit {
    color: #409EFF;
    padding: .5em;
  }
  /* 设备管理表格中删除图标 */
  .device_data_table i.el-icon-delete {
    color: #F56C6C;
  }
</style>
