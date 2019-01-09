<template>
  <!-- 详情模态框 -->
  <div class="user_data_dialog">
    <el-dialog :title="messageModel.title" :visible.sync="messageModel.visible">
      <el-form :model="messageModel.form">
        <el-form-item :label-width="formLabelWidth" label="头像:">
          <img src="" alt="">
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="地址:">
          <img src="" alt="">
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="备注:">
          <img src="" alt="">
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="messageModel.visible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // 详情模态框
      messageModel: {
        title: '',
        visible: false
      },
      formLabelWidth: '120px'
    }
  },
  methods: {
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    toOpenDialog() {
      this.messageModel.visible = true
    }
  }
}
</script>
