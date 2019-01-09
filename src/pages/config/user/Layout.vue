<template>
  <div class="user">
    <!-- 下拉框按钮组合开始 -->
    <div class="top">
      <el-select v-model="value5" clearable placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value" />
      </el-select>
      <el-input placeholder="请输入帐号" style="width:200px" />
      <el-input placeholder="请输入用户姓名" style="width:200px" />
      <el-button type="primary" plain>查询</el-button>
      <el-button type="primary" plain @click="toAddUser()">新增</el-button>
      <el-button type="primary" plain @click="toAccredit()">授权</el-button>
      <el-button type="primary" plain @click="delUsers()">批量删除</el-button>
    </div>
    <!-- 下拉框按钮组合结束 -->
    <!-- 表格组件调用 -->
    <!-- <div>
      <user-data-table />
    </div> -->
    <div class="userTable">
      <el-table
        :data="tableData"
        style="width: 100%"
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="55" />
        <el-table-column
          prop="date"
          label="序号"
          width="180" />
        <el-table-column
          prop="name"
          label="姓名"
          width="180" />
        <el-table-column
          prop="number"
          label="账号" />
        <el-table-column
          prop="admin"
          label="管理员" />
        <el-table-column
          prop="tel"
          label="电话" />
        <el-table-column
          prop="status"
          label="状态" />
        <el-table-column
          label="操作">
          <template slot-scope="{row}">
            <i class="el-icon-delete" title="删除" @click="delUser(row.id)" />
            <i class="el-icon-edit" title="修改" @click="toUpdateUser(row)" />
            <i class="el-icon-tickets" title="查看详细信息" @click="toShowModel" />
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 表格组件调用结束 -->
    <!-- 分页开始 -->
    <div class="paging">
      <el-pagination
        :total="1000"
        :current-page.sync="currentPage1"
        :page-size="100"
        layout="total, prev, pager, next"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange" />
    </div>
    <!-- 分页结束 -->
    <!-- 新增模态框开始 -->
    <div class="addUserModel">
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
            <el-input v-model="addUserModel.form.description" type="textarea" />>
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
    <!-- 新增模态框结束 -->
    <!-- 详情模态框开始 -->
    <div class="messageModel">
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
    <!-- 详情模态框结束 -->
    <!-- 授权模态框开始 -->
    <div class="accreditDialog">
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
    <!-- 授权模态框结束 -->
    <!-- 修改模态框开始 -->
    <div class="updateModel">
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
    <!-- 修改模态框结束 -->
  </div>
</template>
<script>
import userDataTable from './DataTable.vue'
export default {
  components: {
    userDataTable
  },
  data() {
    return {
      // 下拉框开始
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      value5: '',
      // 下拉框结束
      // input输入框
      input: '',
      // input输入框结束
      // 表格
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄',
        id: 1,
        tel: 111,
        admin: '李浩',
        status: '启用',
        description: '111111111111',
        number: 1232534
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄',
        id: 2,
        tel: 222,
        admin: '李浩',
        status: '启用',
        description: '000000000000',
        number: 1232534
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄',
        id: 3,
        tel: 333,
        admin: '李浩',
        status: '启用',
        description: '3333333333',
        number: 1232534
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄',
        id: 4,
        tel: 444,
        admin: '李浩',
        status: '禁用',
        description: '55555555555',
        number: 1232534
      }],
      // 详情模态框
      messageModel: {
        title: '',
        visible: false
      },
      // 新增的switch开关
      value1: true,
      value2: true,
      // 新增模态框
      addUserModel: {
        title: '',
        visible: false,
        form: {}
      },
      formLabelWidth: '120px',
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
      },
      // 授权模态框开始
      accreditDialog: {
        title: '',
        form: {},
        visible: false
      },
      checked1: false,
      checked2: false,
      // 多选框
      multipleSelection: [],
      //  修改模态框
      updateModel: {
        title: '',
        form: {},
        visible: false
      },
      // 修改模态框的switch开关
      value3: true,
      value4: false,
      // 分页
      currentPage1: 5,
      currentPage2: 5,
      currentPage3: 5,
      currentPage4: 4
    }
  },
  methods: {
    // 弹出详情页的模态框
    toShowModel() {
      this.messageModel.title = '详细信息'
      this.messageModel.visible = true
    },
    // 关闭详情页的模态框
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    // 新增用户
    toAddUser() {
      this.addUserModel.title = '新增'
      this.addUserModel.form = {}
      this.addUserModel.visible = true
    },
    // 打开授权模态框
    toAccredit() {
      this.accreditDialog.title = '用户授权'
      this.accreditDialog.visible = true
    },
    // 批量删除
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    delUsers() {
      const ids = this.multipleSelection.map((item) => {
        return item.id
      })
      alert(ids)
    },
    // 删除
    delUser(id) {
      alert(id)
    },
    // 修改
    toUpdateUser(row) {
      console.log(row)
      this.updateModel.form.number = row.number
      this.updateModel.form.name = row.name
      this.updateModel.form.tel = row.tel
      this.updateModel.form.address = row.address
      this.updateModel.form.description = row.description
      this.updateModel.visible = true
    },
    // 分页
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
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
<style scoped>
  .user {
    margin: 1em;
    background: #ffffff;
    border-radius: 3px;
    min-height: 400px;
    padding: 1em;
  }

  .top * {
    margin-right: 2em;
    margin-bottom: 1em
  }
  i {
    cursor: pointer;
    margin-right: .5em
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
  .el-icon-delete {
    color: #F56C6C
  }
  .el-icon-edit {
    color: #E6A23C
  }
  .el-icon-tickets {
    color: #67C23A
  }
  .paging {
    float: right
  }
</style>
