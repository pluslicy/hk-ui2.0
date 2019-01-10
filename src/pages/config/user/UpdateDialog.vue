<template>
  <!-- 修改权限模态框 -->
  <div class="user_data_dialog2">
    <el-dialog :title="updateModel.title" :visible.sync="updateModel.visible" width="35%">
      <el-form ref="ruleForm" :model="updateModel.form" :rules="rules">
        <el-form-item :label-width="formLabelWidth" label="账号:" prop="number">
          <el-input v-model="updateModel.form.number" autocomplete="off" readonly />
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="用户姓名:" prop="name">
          <el-input v-model="updateModel.form.name" autocomplete="off" />
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="联系电话:" prop="tel">
          <el-input v-model="updateModel.form.tel" autocomplete="off" />
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="地址:" prop="address">
          <el-input v-model="updateModel.form.address" autocomplete="off" />
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="用户描述:" prop="description">
          <el-input v-model="updateModel.form.description" type="textarea" />
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="管理员:" prop="description">
          <el-input v-model="updateModel.form.description" type="textarea" />
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="启用:" prop="description">
          <el-switch
            v-model="value3"
            active-color="#13ce66"
            inactive-color="#ff4949" />
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="用户描述:" prop="description">
          <el-switch
            v-model="value4"
            active-color="#13ce66"
            inactive-color="#ff4949" />
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="更换头像:" prop="description">
          <el-upload
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/">
            <!-- <img v-if=" " :src="imageUrl" class="avatar"> -->
            <!-- <i v-else class="el-icon-plus avatar-uploader-icon"></i> -->
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="updateModel.visible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      updateModel: {
        title: '',
        form: {},
        visible: false
      },
      // 修改模态框的switch开关
      value3: true,
      value4: false,
      formLabelWidth: '120px',
      ruleForm: {
        number: '',
        name: '',
        tel: '',
        address: '',
        description: ''
      },
      rules: {
        number: [
          { required: true, message: '账号仅限数字字母下划线', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入用户名', trigger: 'change' }
        ],
        tel: [
          { required: true, message: '请输入电话', trigger: 'change' }
        ],
        address: [
          { required: true, message: '请输入地址', trigger: 'change' }
        ],
        description: [
          { required: true, message: '请输入描述', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 弹出修改模态框
    toOpenDialog(row) {
      console.log(row)
      this.updateModel.form = row
      this.updateModel.visible = true
    },
    // 上传头像
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
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
    }
  }
}
</script>
