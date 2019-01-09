<template>
  <!-- 设备管理 -->
  <div class="device">
    <!-- 表单 -->
    <div class="device_form">
      <el-form :inline="true" :model="formInline" class="demo-form-inline" size="mini">
        <el-form-item label="">
          <el-select v-model="value4" clearable placeholder="请选择机房">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value" />
              <!-- </el-option> -->
          </el-select>
        </el-form-item>
        <el-form-item label="">
          <el-select v-model="value4" clearable placeholder="请选择类型">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value" />
              <!-- </el-option> -->
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-input
            v-model="input10"
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
      input10: ''
    }
  },
  // 侦听器
  watch: {
    options: {
      handler: function() {
        alert(1)
      },
      deep: true
    }
  },
  // 生命周期钩子
  created() {

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

