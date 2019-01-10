<template>
  <div class="Omodal">
    <!-- 操作项模态框 -->
    <el-dialog :visible.sync="dialogVisible2" :title="title" width="100%" fullscreen>
      <span class="deviceType_title">操作项:</span>
      <el-row>
        <el-button type="primary" plain size="mini" style="float:right;margin:1em;" @click="showAddModal()">新增</el-button>
      </el-row>
      <el-table :data="operationType" border style="width: 100%" size="mini">
        <el-table-column align="center" prop="operitem_name" label="名称" />
        <el-table-column align="center" prop="operitem_code" label="操作项码" />
        <el-table-column align="center" prop="operitem_type" label="类型" />
        <el-table-column align="center" prop="operitem_desc" label="描述" />
        <el-table-column align="center" prop="name" label="操作">
          <template slot-scope="scope">
            <i class="fa fa-edit" style="color:#448db8" title="编辑" />
            <i class="fa fa-trash-o" style="color:#f56c6c" title="删除" />
          </template>
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer"><el-button @click="dialogVisible2 = false">取 消</el-button></span>
    </el-dialog>
    <OaddModal ref="OaddModal" />
  </div>
</template>
<script type="text/javascript">
import OaddModal from '@/pages/room/deviceType/OaddModal.vue'
// import axios from '@/http/axios'
export default {
  components: {
    OaddModal
  },
  data() {
    return {
      dialogVisible2: false,
      operationType: [],
      title: ''
    }
  },
  methods: {
    showAddModal() {
      this.$refs.OaddModal.dialogFormVisible2 = true
    }
  }
}
</script>
