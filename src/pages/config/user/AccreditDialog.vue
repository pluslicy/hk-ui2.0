<template>
  <!-- 授权模态框 -->
  <div class="user_accredit_dialog">
    <el-dialog :title="accreditDialog.title" :visible.sync="accreditDialog.visible">
      <el-form :model="accreditDialog.form">
        <el-checkbox v-model="checked1">机房管理员</el-checkbox>
        <el-checkbox v-model="checked2">普通管理员</el-checkbox>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="accreditDialog.visible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // 授权模态框开始
      accreditDialog: {
        title: '',
        form: {},
        visible: false
      },
      checked1: false,
      checked2: false
    }
  },
  methods: {
    toOpenDialog() {
      this.accreditDialog.visible = true
    }
  }
}
</script>

