<template>
  <div class="deviceTypeTable">
    <!-- 设备类型表格 -->
    <el-table :data="deviceTypes" style="width: 100%">
      <el-table-column prop="row_no" label="序号" width="400" align="center" />
      <el-table-column prop="devicetype_name" label="类型名称" width="400" align="center" />
      <el-table-column prop="devicetype_desc" label="类型描述" width="600" align="center" />
      <el-table-column label="操作" align="center">
        <template slot-scope="{row}">
          <el-dropdown :hide-on-click="false" trigger="click" @command="handleCommand">
            <span class="el-dropdown-link" @click="load(row)">查&nbsp;&nbsp;&nbsp;&nbsp;看<i class="el-icon-arrow-down el-icon--right" /></span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="a">数据项</el-dropdown-item>
              <el-dropdown-item command="b">操作项</el-dropdown-item>
              <el-dropdown-item command="c">配置项</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
      </el-table-column>
    </el-table>
    <Dmodal ref="Dmodal" />
    <Omodal ref="Omodal" />
    <Cmodal ref="Cmodal" />
  </div>
</template>
<script type="text/javascript">
import axios from '@/http/axios'
import Dmodal from '@/pages/room/deviceType/Dmodal.vue'
import Cmodal from '@/pages/room/deviceType/Cmodal.vue'
import Omodal from '@/pages/room/deviceType/Omodal.vue'
export default {
  components: {
    Dmodal,
    Cmodal,
    Omodal
  },
  data() {
    return {
      deviceTypes: []
    }
  },
  created() {
    this.loadDeviceTypes()
  },
  methods: {
    handleCommand(command) {
      if (command === 'a') {
        this.$refs.Dmodal.dialogVisible1 = true
      } else if (command === 'b') {
        this.$refs.Omodal.dialogVisible2 = true
      } else if (command === 'c') {
        this.$refs.Cmodal.dialogVisible3 = true
      }
    },
    // 加载所有设备类型
    loadDeviceTypes() {
      axios.get('/api_devicetype/list_detail_devicetypes/')
        .then(({ data }) => {
          this.deviceTypes = data.results
        }).catch(() => {
          this.$notify.error({
            title: '网络超时',
            message: '这是一条错误的提示消息'
          })
        })
    },
    load(row) {
      this.$refs.Dmodal.dataType = row.dataitems
      this.$refs.Omodal.operationType = row.operitems
      this.$refs.Cmodal.configurationType = row.configitems
    }
  }
}
</script>
