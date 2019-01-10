<template>
  <div class="role">
    <!-- 按钮组开始 -->
    <div class="btns">
      <el-button type="primary" size="mini" plain @click="toAddRole">新增</el-button>
      <el-button type="primary" size="mini" plain @click="delRoles()">批量删除</el-button>
    </div>
    <!-- 按钮组结束 -->
    <!-- 表格组件的使用 -->
    <role-data-table />
    <!-- 表格结束 -->
    <!-- 新增模态框开始 -->
    <div class="toAddRoleDialog">
      <el-dialog :title="toAddRoleDialog.title" :visible.sync="toAddRoleDialog.visible" width="30%" center="">
        <el-form ref="ruleForm" :model="toAddRoleDialog.form" :rules="rules" label-width="60px" label-position="left">
          <el-form-item label="角色:" prop="name">
            <el-input v-model="toAddRoleDialog.form.name" autocomplete="off" />
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="toAddRoleDialog.visible = false">取 消</el-button>
          <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
        </div>
      </el-dialog>
    </div>
    <!-- 新增模态框结束 -->
  </div>
</template>
<script>
import roleDataTable from './RoleTable.vue'

export default {
  components: {
    roleDataTable
  },
  data() {
    return {
      // dialogVisible1:false,
      // dialogVisible3:false,
      visible: false,
      form: {
        name: ''
      },
      toAddRoleDialog: {
        title: '',
        form: {},
        visible: false
      },
      ruleForm: {
        name: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ]
      },
      result: true,
      // 多选框
      multipleSelection: [],
      // 修改模态框
      toUpdataRoleDialog: {
        title: '',
        form: {},
        visible: false
      }
    }
  },
  methods: {
    // 新增
    toAddRole() {
      this.toAddRoleDialog.form = {}
      this.toAddRoleDialog.visible = true
    },
    // 关闭模态框
    toCloseDialog() {
      this.toAddRoleDialog.visible = false
      this.dialogVisible3 = false
    },
    // 多选框
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    // 批量删除
    delRoles() {
      const ids = this.multipleSelection.map((item) => {
        return item.id
      })
      alert(ids)
    },
    // 删除
    delRole(id) {
      alert(id)
    }
  }
}
</script>

<style scoped>
  .role{
    background-color: #fff;
    /* min-height: 850px; */
    margin: 1em ;
    border-radius: 5px;
    padding: 1em;
    overflow: hidden
  }
  .btns{
    /* margin-right: 2em; */
    margin-bottom: 1em;
    float: right
  }
  i{
    cursor: pointer;
    margin-right: .5em
  }
  .el-icon-delete{
    color: #F56C6C
  }
  .el-icon-edit{
    color: #E6A23C
  }
</style>
