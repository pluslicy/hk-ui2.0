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
          <i class="el-icon-edit" @click="toUpdateManager(row)" />
          <i class="el-icon-delete" @click="deleteManager(row.id)" />
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import $ from 'jquery'
export default {
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
    handleSelectionChange(val) {
      this.multipleSelection = val
    }
  }
}
</script>

<style scoped>
  .device_data_table i.el-icon-edit {
    color: #409EFF;
  }
  .device_data_table i.el-icon-delete {
    color: #F56C6C;
    padding-left: .5em;
  }
</style>
