<template>
  <div class="role">
    <!-- 按钮组开始 -->
    <div class="btns">
      <el-button type="primary" plain @click="toAddRole">新增</el-button>
      <el-button type="primary" plain @click="delRoles()">批量删除</el-button>
    </div>
    <!-- 按钮组结束 -->
    <!-- 表格开始 -->
    <div class="roleTable">
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
          label="角色名称"
          width="180" />
        <el-table-column
          prop="address"
          label="角色权限信息" />
        <el-table-column
          prop="address"
          label="用户名称" />
        <el-table-column
          prop="address"
          label="操作">
          <template slot-scope="{row}">
            <i class="el-icon-delete" title="删除" @click="delRole(row.id)" />
            <i class="el-icon-edit" title="修改" @click="toUpdateRoleDialog(row)" />
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 表格组件的使用 -->
    <!-- <role-data-table /> -->
    <!-- 表格结束 -->
    <!-- 新增模态框开始 -->
    <div class="toAddRoleDialog">
      <el-dialog :title="toAddRoleDialog.title" :visible.sync="toAddRoleDialog.visible" width="30%" center="">
        <el-form ref="ruleForm" :model="toAddRoleDialog.form" :rules="rules">
          <el-form-item label="角色:" label-width="14%" prop="name">
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
    <!-- 修改模态框开始 -->
    <div class="toUpdataRoleDialog">
      <el-dialog
        :title="toUpdataRoleDialog.title"
        :visible.sync="toUpdataRoleDialog.visible"
        width="30%"
        center
      >
        <div class="dialogCenter">
          <el-tree
            :props="props"
            :load="loadNode"
            lazy
            show-checkbox
            @check-change="handleCheckChange" />
        </div>
        <div slot="footer" class="dialog-footer" style="text-align:right">
          <el-button size="mini" @click="toUpdataRoleDialog.visible = false">取 消</el-button>
          <el-button type="primary" size="mini" class="btn-rig">确 定</el-button>
          <el-button type="primary" size="mini" class="btn-rig  btn-rig1">删除全部权限</el-button>
        </div>
      </el-dialog>
    </div>
    <!-- 修改模态框结束 -->
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
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄',
        id: 1
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄',
        id: 2
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄',
        id: 3
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄',
        id: 4
      }],
      // dialogVisible1:false,
      // dialogVisible3:false,
      // 模态框树形控件
      props: {
        label: 'name',
        children: 'zones'
      },
      count: 1,
      // 新增模态框
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
    // 模态框树形控件开始
    handleCheckChange(data, checked, indeterminate) {
      console.log(data, checked, indeterminate)
    },
    handleNodeClick(data) {
      console.log(data)
    },
    loadNode(node, resolve) {
      if (node.level === 0) {
        return resolve([{ name: 'region1' }, { name: 'region2' }])
      }
      if (node.level > 3) return resolve([])
      var hasChild
      if (node.data.name === 'region1') {
        hasChild = true
      } else if (node.data.name === 'region2') {
        hasChild = false
      } else {
        hasChild = Math.random() > 0.5
      }
      setTimeout(() => {
        var data
        if (hasChild) {
          data = [{
            name: 'zone' + this.count++
          }, {
            name: 'zone' + this.count++
          }]
        } else {
          data = []
        }
        resolve(data)
      }, 500)
    },
    // 模态框树形控件结束
    // 修改模态框弹出
    toUpdateRoleDialog() {
      this.toUpdataRoleDialog.visible = true
    },
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
    min-height: 400px;
    margin: 1em ;
    border-radius: 5px;
    padding: 1em
  }
  .btns *{
    margin-right: 2em;
    margin-bottom: 1em
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
