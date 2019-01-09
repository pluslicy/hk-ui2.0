<template>
  <!-- 新增权限模态框 -->
  <div class="user_data_dialog1">
    <el-dialog :title="addUserModel.title" :visible.sync="addUserModel.visible" center="" width="35%">
      <el-form ref="addUserModel.form" :model="addUserModel.form" :rules="rules">
        <el-form-item :label-width="formLabelWidth" label="账号:" prop="number">
          <el-input v-model="addUserModel.form.number" autocomplete="off" />
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="密码:" prop="password1">
          <el-input v-model="addUserModel.form.password1" autocomplete="off" />
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="确认密码:" prop="password2">
          <el-input v-model="addUserModel.form.password2" autocomplete="off" />
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="用户姓名:" prop="name">
          <el-input v-model="addUserModel.form.name" autocomplete="off" />
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="联系电话:" prop="tel">
          <el-input v-model="addUserModel.form.tel" autocomplete="off" />
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="地址:" prop="address">
          <el-input v-model="addUserModel.form.address" autocomplete="off" />
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="用户描述:" prop="description">
          <el-input v-model="addUserModel.form.description" type="textarea" />
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="管理员:">
          <el-switch
            v-model="value1"
            active-color="#13ce66"
            inactive-color="#ff4949" />
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="启用:">
          <el-switch
            v-model="value2"
            active-color="#13ce66"
            inactive-color="#ff4949" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addUserModel.visible = false">取 消</el-button>
        <el-button type="primary" @click="addUserModel.visible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
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
        number: '',
        password1: '',
        password2: '',
        name: '',
        tel: '',
        address: '',
        description: ''
      },
      rules: {
        number: [
          { required: true, message: '账号仅限数字字母下划线', trigger: 'blur' }
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        password1: [
          { required: true, message: '请输入密码', trigger: 'change' }
        ],
        password2: [
          { required: true, message: '请确认密码', trigger: 'change' }
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
    toOpenDialog() {
      this.addUserModel.visible = true
    }
  }
}
</script>
