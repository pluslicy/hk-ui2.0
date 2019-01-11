<template>
  <!-- 设备管理数据 -->
  <div class="device_data_table">
    <el-table
      v-loading="loading"
      ref="multipleTable"
      :data="devices"
      :height="he"
      tooltip-effect="dark"
      style="width: 100%"
      size="mini"
      @selection-change="handleSelectionChange">
      <el-table-column
        prop="device_id"
        fixed="left"
        type="selection"
        align="center"
        width="55" />
      <!-- </el-table-column> -->
      <el-table-column
        prop="device_name"
        label="名称"
        align="center" />
      <!-- </el-table-column> -->
      <el-table-column
        prop="device_code"
        label="设备码"
        align="center" />
      <!-- </el-table-column> -->
      <el-table-column
        prop="devicetype.devicetype_name"
        label="类型"
        align="center" />
      <!-- </el-table-column> -->
      <el-table-column
        prop="room.room_name"
        label="所属机房"
        align="center" />
      <!-- </el-table-column> -->
      <el-table-column
        width="100"
        label="操作"
        align="center">
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
import axios from '@/http/axios'
import $ from 'jquery'
import deviceDialog from './Dialog.vue'
export default {
  components: {
    deviceDialog
  },
  data() {
    return {
      // 加载
      loading: false,
      // 所有设备
      devices: [],
      multipleSelection: []
    }
  },
  created() {
    this.he = $(window).height() - 230
    this.findAllDevice()
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
    },
    // 获取所有的设备
    findAllDevice() {
      this.loading = true
      axios.get('/api_device/list_device/')
        .then(({ data }) => {
          console.log(data)
          this.devices = data.results
        })
        .catch((error) => {
          console.log(error)
        })
        .finally(() => {
          this.loading = false
        })
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
