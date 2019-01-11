<template>
  <!-- 详情模态框 -->
  <div class="user_data_dialog">
    <el-dialog :title="messageModel.title" :visible.sync="messageModel.visible" width="25%">
      <!-- <el-form :model="messageModel.form">
        <el-form-item :label-width="formLabelWidth" label="头像:">
          <img src="" alt="">
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="地址:">
          {{ users.user_address }}
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="备注:">
          <img src="" alt="">
        </el-form-item>
      </el-form> -->
      <span>头像:</span>&nbsp;&nbsp;&nbsp;<img :src="users.user_avatarpath" alt=""><br><br><br><br><br>
      <span>地址:</span>&nbsp;&nbsp;&nbsp;{{ users.user_address }}<br><br><br><br><br>
      <span>备注:</span>&nbsp;&nbsp;&nbsp;{{ users.user_note }}<br>
      <div slot="footer" class="dialog-footer">
        <el-button @click="messageModel.visible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
// import axios from '@/http/axios'
export default {
  data() {
    return {
      // 详情模态框
      messageModel: {
        title: '',
        visible: false
      },
      formLabelWidth: '120px',
      users: {}
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
    toOpenDialog(row) {
      // this.findAllUsers()
      this.messageModel.visible = true
      console.log('==========', row)
      this.users = row
    }
    // 加载表格内容
    // findAllUsers() {
    //   axios.get('/api_user/user_list/').then(({ data: result }) => {
    //     this.users = result.results
    //     console.log('=======================', this.users)
    //   }).catch(() => {

    //   })
    // }
  }
}
</script>
<style scoped>
  img{
    width: 20px;
    height: 20px;
  }
</style>
