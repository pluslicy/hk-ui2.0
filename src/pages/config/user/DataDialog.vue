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
      <span>头像:</span>&nbsp;&nbsp;&nbsp;<img :src="users.user_avatarpath" alt="">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>更换头像:</span>
      <el-form :model="messageModel.form">
        <el-form-item :label-width="formLabelWidth">
          <!-- <el-upload
            :before-upload="beforeAvatarUpload"
            :on-success="handleAvatarSuccess"
            :show-file-list="false"
            :data="{user_id:users.id}"
            class="avatar-uploader"
            action="http://192.168.50.95:10000/#!/api_user/upload_user_avatar_create/api_user/upload_user_avatar/">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon" />
          </el-upload> -->
          <el-upload
            :data="{user_id:users.id}"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :on-error="handleAvatarError"
            :before-upload="beforeAvatarUpload"
            class="avatar-uploader"
            action="http://192.168.50.95:10000/api_user/upload_user_avatar/">
            <img v-if="imageUrl" :src="imageUrl" class="avatar2">
            <i v-else class="el-icon-plus avatar-uploader-icon2"/>
          </el-upload>
        </el-form-item>
      </el-form>
      <br><br><br><br><br>
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
      users: {},
      imageUrl: ''
    }
  },
  // computed:{
  //   headers(){
  //     return {
  //       'Authorization':conf.getCookie('Token')
  //     }
  //   }
  // },
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
    },
    // 上传图片
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
      this.$notify({
        title: '成功',
        message: '这是一条成功的提示消息',
        type: 'success'
      })
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    handleAvatarError() {
      this.$notify.error({
        title: '错误',
        message: '这是一条错误的提示消息'
      })
    }
    // 确定上传图片
    // dialogFormVisible() {}
  }
}
</script>
<style scoped>
  img{
    width: 50px;
    height: 50px;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
