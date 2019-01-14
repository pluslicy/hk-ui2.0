<template>
  <div class="checkModal">
    <el-dialog :visible.sync="visible1" title="审批申请" center>
      <el-form size="mini">
        <el-table :data="user_check" style="width: 100%">
          <el-table-column prop="approval_type" label="审批类型" />
          <el-table-column prop="approval_user" label="申请人" />
          <el-table-column prop="approval_text" label="申请内容" />
          <el-table-column prop="approval_time" label="申请时间" />
          <el-table-column prop="approval_history" label="审批记录" />
          <el-table-column prop="approval_status" label="审批状态" />
        </el-table>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click="visible1 = false">取 消</el-button>
        <el-button size="mini" type="primary">通过</el-button>
        <el-button size="mini">拒绝</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script type="text/javascript">
export default {
  data() {
    return {
      visible1: false,
      user_check: []
    }
  }
}

</script>
