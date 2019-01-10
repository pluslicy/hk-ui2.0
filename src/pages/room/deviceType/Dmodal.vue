<template>
  <div class="Dmodal">
    <!-- 数据项模态框 -->
    <el-dialog :visible.sync="dialogVisible1" :title="title" width="100%" fullscreen>
      <span class="deviceType_title">数据项:</span>
      <el-row>
        <el-button type="primary" plain size="mini" style="float:right;margin:1em;" @click="showAddModal()">新增</el-button>
      </el-row>
      <el-table :data="dataType" border style="width: 100%" size="mini">
        <el-table-column align="center" prop="dataitem_name" label="名称" />
        <el-table-column align="center" prop="dataitem_code" label="数据项码" />
        <el-table-column align="center" prop="dataitem_groupname" label="分组名" />
        <el-table-column align="center" prop="dataitem_desc" label="描述" />
        <el-table-column align="center" prop="dataitem_unit" label="单位" />
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <i class="fa fa-edit" style="color:#448db8" title="编辑" @click="showAddModal()" />
            <i class="fa fa-trash-o" style="color:#f56c6c" title="删除" />
          </template>
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer"><el-button @click="dialogVisible1 = false">取 消</el-button></span>
    </el-dialog>
    <DaddModal ref="DaddModal" />
  </div>
</template>
<script type="text/javascript">
// import axios from '@/http/axios'
import DaddModal from '@/pages/room/deviceType/DaddModal.vue'
export default {
  components: {
    DaddModal
  },
  data() {
    return {
      dialogVisible1: false,
      dataType: [],
      title: ''
    }
  },
  methods: {
    showAddModal() {
      this.$refs.DaddModal.dialogFormVisible1 = true
    }
  }
}
</script>
