<template>
  <!-- 新增权限模态框 -->
  <div class="user_data_dialog1">
    <el-dialog :title="addUserModel.title" :visible.sync="addUserModel.visible" center="" width="35%">
      <el-form ref="addUserModel.form" :model="addUserModel.form" :rules="rules" label-position="left" label-width="80px"> {{ addUserModel.form }}
        <el-form-item :label-width="formLabelWidth" label="账号:" prop="username">
          <el-input v-model="addUserModel.form.username" autocomplete="off" />
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="密码:" prop="password">
          <el-input v-model="addUserModel.form.password" autocomplete="off" />
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="确认密码:" prop="password2">
          <el-input v-model="addUserModel.form.password2" autocomplete="off" />
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="用户姓名:" prop="last_name">
          <el-input v-model="addUserModel.form.last_name" autocomplete="off" />
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="联系电话:" prop="user_tel">
          <el-input v-model="addUserModel.form.user_tel" autocomplete="off" />
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="地址:" prop="user_address">
          <el-input v-model="addUserModel.form.user_address" autocomplete="off" />
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="用户描述:" prop="user_note">
          <el-input v-model="addUserModel.form.user_note" type="textarea" />
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="管理员:">
          <el-switch
            v-model="addUserModel.form.is_superuser"
            active-color="#13ce66"
            inactive-color="#ff4949" />
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="启用:">
          <el-switch
            v-model="addUserModel.form.is_active"
            active-color="#13ce66"
            inactive-color="#ff4949" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addUserModel.visible = false">取 消</el-button>
        <el-button type="primary" @click="saveAddUser()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import axios from '@/http/axios'
export default {
  data() {
    return {
      addUserModel: {
        title: '',
        visible: false,
        form: {}
      },
      formLabelWidth: '120px',
      // 新增的switch开关
      value1: true,
      value2: true,
      // 新增模态框表单验证
      ruleForm: {
        username: '',
        password: '',
        password2: '',
        last_name: '',
        user_tel: '',
        user_address: '',
        user_note: ''
      },
      rules: {
        username: [
          { required: true, message: '账号仅限数字字母下划线', trigger: 'blur' }
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'change' }
        ],
        password2: [
          { required: true, message: '请确认密码', trigger: 'change' }
        ],
        last_name: [
          { required: true, message: '请输入用户名', trigger: 'change' }
        ],
        user_tel: [
          { required: true, message: '请输入电话', trigger: 'change' }
        ],
        user_address: [
          { required: true, message: '请输入地址', trigger: 'change' }
        ],
        user_note: [
          { required: true, message: '请输入描述', trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    // 弹出修改模态框
    toOpenDialog() {
      this.addUserModel.title = '添加用户'
      this.addUserModel.form = {
        is_superuser: false,
        is_active: false
      }
      this.addUserModel.visible = true
    },
    // 新增用户确定
    saveAddUser() {
      console.log(this.addUserModel.form)
      // if ((this.addUserModel.form.username !== '') && (this.addUserModel.form.password !== '') && (this.addUserModel.form.password2 !== '') && (this.addUserModel.form.last_name !== '') && (this.addUserModel.form.user_tel !== '') && (this.addUserModel.form.user_address !== '') && (this.addUserModel.form.user_note !== '')) {
      //   axios.post('api_user/create_user/', this.addUserModel.form).then(() => {
      //     this.$notify({
      //       title: '成功',
      //       message: '新增成功',
      //       type: 'success'
      //     })
      //     this.addUserModel.visible = false
      //   }).catch(() => {
      //     this.$notify.error({
      //       title: '错误',
      //       message: '请填写所有的信息'
      //     })
      //   })
      // } else {
      //   // this.$notify.error({
      //   //   title: '错误',
      //   //   message: '请填写全部的信息111'
      //   // })
      // }
      axios.post('api_user/create_user/', this.addUserModel.form).then(() => {
        this.$notify({
          title: '成功',
          message: '新增成功',
          type: 'success'
        })
        this.addUserModel.visible = false
      }).catch(() => {
        this.$notify.error({
          title: '错误',
          message: '请填写所有的信息'
        })
      })
    }
  }
}
</script>
