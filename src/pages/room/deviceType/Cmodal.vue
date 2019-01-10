<template>
  <div class="Cmodal">
    <!-- 配置项模态框 -->
    <el-dialog :visible.sync="dialogVisible3" :title="title" width="100%" fullscreen>
      <span class="deviceType_title">配置项:</span>
      <el-row>
        <el-button type="primary" plain size="mini" style="float:right;margin:1em;" @click="showAddModal()">新增</el-button>
      </el-row>
      <el-table :data="configurationType" border style="width: 100%" size="mini">
        <el-table-column align="center" prop="configitem_name" label="名称" />
        <el-table-column align="center" prop="configitem_code" label="配置项码" />
        <el-table-column align="center" prop="configitem_value" label="配置项值" />
        <el-table-column align="center" prop="configitem_desc" label="描述" />
        <el-table-column align="center" label="操作">
          <template slot-scope="{row}">
            <i class="fa fa-edit" style="color:#448db8" title="编辑" />
            <i class="fa fa-trash-o" style="color:#f56c6c" title="删除" @click="deleteConfigurationType(row.configitem_id)" />
          </template>
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer"><el-button @click="dialogVisible3 = false">取 消</el-button></span>
    </el-dialog>
    <CaddModal ref="CaddModal" />
  </div>
</template>
<script type="text/javascript">
import CaddModal from '@/pages/room/deviceType/CaddModal.vue'
import axios from '@/http/axios'
export default {
  components: {
    CaddModal
  },
  data() {
    return {
      dialogVisible3: false,
      configurationType: [],
      title: ''
    }
  },
  methods: {
    showAddModal() {
      this.$refs.CaddModal.dialogFormVisible3 = true
    },
    deleteConfigurationType(oId) {
      const obj = { configitem_ids: [oId + ''] }
      // console.log('222222222222222222', obj)
      axios.post('/api_devicetype/delete_configitems/', obj)
        .then(() => {
          this.$notify({
            title: '删除成功',
            message: '这是一条成功的提示消息',
            type: 'success'
          })
        }).catch(() => {
          // console.log('1111111111111111111111111111',oId)
          this.$notify.error({
            title: '删除失败',
            message: '这是一条错误的提示消息'
          })
        })
    }
  }
}
</script>
