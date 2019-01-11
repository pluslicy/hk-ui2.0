<template>
  <!-- 设备管理 -->
  <div class="device">
    <!-- 表单 -->
    <div class="device_form">
      <el-form :inline="true" class="demo-form-inline" size="mini">
        <el-form-item label="">
          <el-select v-model="value4" clearable placeholder="请选择机房">
            <el-option
              v-for="room in rooms"
              :key="room.room_id"
              :label="room.room_name"
              :value="room.room_name" />
              <!-- </el-option> -->
          </el-select>
        </el-form-item>
        <el-form-item label="">
          <el-select v-model="value3" clearable placeholder="请选择类型">
            <el-option
              v-for="deviceType in deviceTypes"
              :key="deviceType.devicetype_id"
              :label="deviceType.devicetype_name"
              :value="deviceType.devicetype_id" />
              <!-- </el-option> -->
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-input
            v-model="deviceNames.device_"
            placeholder="请输入名称"
            clearable />
            <!-- </el-input> -->
        </el-form-item>
      </el-form>
    </div>
    <!-- 按钮 -->
    <div class="device_btns">
      <el-button type="primary" plain size="mini" @click="toAddDevice">新增</el-button>
      <el-button type="primary" plain size="mini" @click="batchDeleteDevice">批量删除</el-button>
    </div>
    <!-- 数据表格 -->
    <device-data-table />
    <!-- 分页 -->
    <device-pagination />
    <!-- 模态框 -->
    <device-dialog ref="deviceDialog" />
  </div>
</template>

<script>
import axios from '@/http/axios'
import deviceDataTable from './DataTable.vue'
import devicePagination from './Pagination.vue'
import deviceDialog from './Dialog.vue'
export default {
  components: {
    deviceDataTable,
    devicePagination,
    deviceDialog
  },
  data() {
    return {
      // 所有机房
      rooms: [],
      // 所有设备类型
      deviceTypes: [],
      deviceNames: []
    }
  },
  // 侦听器
  watch: {
    // rooms: {
    //   handler: function() {
    //     alert(1)
    //   },
    //   deep: true
    // }
  },
  // 生命周期钩子
  created() {
    this.findAllroom()
    this.findAllDeviceType()
  },
  // 方法
  methods: {
    // 新增
    toAddDevice() {
      // this.deviceDialog.visible = true
      this.$refs.deviceDialog.showDialog()
      this.$refs.deviceDialog.deviceDialog.title = '添加设备信息'
      this.$refs.deviceDialog.deviceDialog.form = {}
    },
    // 批量删除
    batchDeleteDevice() {

    },
    // 获取所有机房
    findAllroom() {
      axios.get('/api_room/list_all_room/')
        .then(({ data }) => {
          console.log(data)
          this.rooms = data
        })
        .catch((error) => {
          console.log(error)
        })
    },
    // 获取所有设备类型
    findAllDeviceType() {
      axios.get('/api_devicetype/list_all_devicetypes/')
        .then(({ data }) => {
          console.log(data)
          this.deviceTypes = data
        })
        .catch((error) => {
          console.log(error)
        })
    },
    // 获取设备列表名称
    findAllDeviceName() {
      axios.get('/api_device/list_device_name/')
        .then(({ data }) => {
          console.log(data)
          this.deviceNames = data
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }
}
</script>

<style scoped>
  /* 设备管理 */
  .device {
    background-color: #ffffff;
    margin: 1em;
    padding: 1em;
    border-radius: 3px;
    /* min-height: 500px; */
  }
  /* 表单 */
  .device_form {
    float: left;
  }
  /* 按钮 */
  .device_btns {
    text-align: right;
  }
</style>

