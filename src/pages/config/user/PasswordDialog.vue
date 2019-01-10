<template>
  <!-- 修改密码模态框 -->
  <div class="user_password_dialog">
    <el-dialog :visible.sync="passwordDialog.visible" title="修改密码" width="25%" center="">
      <el-form :model="passwordDialog.form" label-position="left">
        <el-form-item :label-width="formLabelWidth" label="新密码:">
          <el-input v-model="passwordDialog.form.name" autocomplete="off" />
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="确认密码:">
          <el-input v-model="passwordDialog.form.name" autocomplete="off" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      formLabelWidth: '80px',
      passwordDialog: {
        visible: false,
        form: {}
      }
    }
  },
  methods: {
    toOpenDialog() {
      this.passwordDialog.visible = true
    }
  }
}
</script>
