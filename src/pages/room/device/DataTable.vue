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
          <!-- {{row}} -->
          <!-- <i class="fa fa-food"></i> -->
          <i class="el-icon-view" title="详细信息" @click="toView(row)" />
          <i class="el-icon-edit" title="修改" @click="toUpdateDevice(row)" />
          <i class="el-icon-delete" title="删除" @click="deleteDevice(row.device_id)" />
        </template>
      </el-table-column>
    </el-table>
    <!-- 模态框 -->
    <device-dialog ref="deviceDialog" :devices="devices" :find_all_device="findAllDevice" />
  </div>
</template>

<script>
import axios from '@/http/axios'
import _ from 'lodash'
import $ from 'jquery'
import deviceDialog from './Dialog.vue'
export default {
  components: {
    deviceDialog
  },
  // props: ['params', 'devicetypes', 'rooms'],
  props: {
    params: {
      type: Object,
      default: function() {
        return {}
      }
    },
    devicetypes: {
      type: Array,
      default: function() {
        return []
      }
    },
    rooms: {
      type: Array,
      default: function() {
        return []
      }
    }
  },
  data() {
    return {
      // 加载
      loading: false,
      // 所有设备
      devices: [],
      // 每个设备的信息
      multipleSelection: []
    }
  },
  created() {
    this.he = $(window).height() - 230
    this.findAllDevice()
  },
  methods: {
    // 删除设备
    deleteDevice(id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          axios.post('/api_device/delete_device/', {
            device_ids: [id]
          })
            .then(() => {
              this.$notify({
                title: '成功',
                message: '删除成功',
                type: 'success'
              })
              this.findAllDevice()
            })
            .catch((error) => {
              console.log(error)
            })
        })
    },
    // 查看设备详细信息
    toView(row) {
      this.$refs.deviceDialog.showViewDialog()
      this.$refs.deviceDialog.deviceViewDialog.devices = row
      this.$refs.deviceDialog.deviceViewDialog.title = row.device_name
    },
    // 修改设备信息
    toUpdateDevice(row) {
      this.$refs.deviceDialog.showDialog()
      this.$refs.deviceDialog.deviceDialog.title = '修改设备信息'
      const device = _.clone(row)

      // this.$refs.deviceDialog.deviceDialog.form = row

      // 过滤设备类型id
      const devicetypeArr = this.devicetypes.filter((item) => {
        return item.devicetype_name === row.devicetype.devicetype_name
      })
      console.log(devicetypeArr)
      if (devicetypeArr.length > 0) {
        device.devicetype = devicetypeArr[0].devicetype_id
      }
      this.$refs.deviceDialog.deviceDialog.disabled = true
      // 过滤设备类型id
      const roomArr = this.rooms.filter((item) => {
        return item.room_name === row.room.room_name
      })
      if (roomArr.length > 0) {
        device.room = roomArr[0].room_id
      }
      this.$refs.deviceDialog.deviceDialog.form.device_id = device.device_id
      this.$refs.deviceDialog.deviceDialog.form.device_name = device.device_name
      this.$refs.deviceDialog.deviceDialog.form.device_code = device.device_code
      this.$refs.deviceDialog.deviceDialog.form.device_desc = device.device_desc
      this.$refs.deviceDialog.deviceDialog.form.room = device.room
      this.$refs.deviceDialog.deviceDialog.form.devicetype = device.devicetype
    },
    // 多选
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    // 获取所有的设备
    findAllDevice() {
      this.loading = true
      axios.get('/api_device/list_device/', {
        params: this.params
      })
        .then(({ data }) => {
          // console.log(data)
          this.devices = data.results
          // this.count = data.count
          this.$parent.total = data.count
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
