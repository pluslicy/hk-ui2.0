<template>
  <el-dialog
    :title="toUpdataRoleDialog.title"
    :visible.sync="toUpdataRoleDialog.visible"
    width="30%"
    center
  >
    <div class="dialogCenter">
      <el-form :model="toUpdataRoleDialog.form">
        <el-form-item label-width="120" label="活动名称"><br> {{ toUpdataRoleDialog.form }}
          <el-checkbox-group v-model="toUpdataRoleDialog.form.checkList">
            <el-checkbox label="查看日志" />
            <el-checkbox label="提交申请" />
            <el-checkbox label="一级审批" />
            <el-checkbox label="二级审批" />
            <el-checkbox label="查看报警" />
            <el-checkbox label="处理报警" />
            <el-checkbox label="查看报警" />
            <el-checkbox label="审核报警" /><br>
            <el-checkbox label="权限:我的机房" />
          </el-checkbox-group>
          <!-- <span>权限:</span> -->
          <el-checkbox-group v-model="toUpdataRoleDialog.form.checkList1">
            <!-- <el-checkbox label="我的机房" /> -->
            <el-checkbox label="查看我的机房" />
            <el-checkbox label="管理我的机房" />
            <el-checkbox label="删除我的机房" />
          </el-checkbox-group>
        </el-form-item>
      </el-form>
    </div>
    <div slot="footer" class="dialog-footer" style="text-align:right">
      <el-button size="mini" @click="toUpdataRoleDialog.visible = false">取 消</el-button>
      <el-button type="primary" size="mini" class="btn-rig">确 定</el-button>
      <el-button type="primary" size="mini" class="btn-rig  btn-rig1">删除全部权限</el-button>
    </div>
  </el-dialog>
</template>
<script>
export default {
  data() {
    return {
      // 模态框树形控件
      // props: {
      //   label: 'name',
      //   children: 'zones'
      // },
      // count: 1,
      toUpdataRoleDialog: {
        title: '',
        form: {
          checkList: [],
          checkList1: []
        },
        visible: false
      },
      arr1: [],
      arr2: [],
      arr3: [],
      arr4: []
      // obj: {},
      // checked: true,
      // check1: false,
      // check2: false,
      // check3: false,
      // check4: false,
      // check5: false,
      // check6: false,
      // check7: false
    }
  },
  methods: {
    // 模态框树形控件开始
    // handleCheckChange(data, checked, indeterminate) {
    //   console.log(data, checked, indeterminate)
    // },
    // handleNodeClick(data) {
    //   console.log(data)
    // },
    // loadNode(node, resolve) {
    //   if (node.level === 0) {
    //     return resolve([{ name: 'region1' }, { name: 'region2' }])
    //   }
    //   if (node.level > 3) return resolve([])
    //   var hasChild
    //   if (node.data.name === 'region1') {
    //     hasChild = true
    //   } else if (node.data.name === 'region2') {
    //     hasChild = false
    //   } else {
    //     hasChild = Math.random() > 0.5
    //   }
    //   setTimeout(() => {
    //     var data
    //     if (hasChild) {
    //       data = [{
    //         name: 'zone' + this.count++
    //       }, {
    //         name: 'zone' + this.count++
    //       }]
    //     } else {
    //       data = []
    //     }
    //     resolve(data)
    //   }, 500)
    // },
    toOpenDialog(row) {
      console.log('row', row)
      this.arr2 = row.permission_names.split('：')
      console.log('arr2', this.arr2)
      this.arr3 = this.arr2[0].split(',')
      console.log('arr3', this.arr3)
      // this.checkList = this.arr3
      this.arr4 = this.arr2[1].split(',')
      console.log('arr4', this.arr4)
      // this.checkList1 = this.arr4
      // this.arr2.forEach(() => {
      //   if ('查看日志') {
      //     this.check1 = true
      //   } else {
      //     this.check1 = false
      //   }
      //   if ('提交申请') {
      //     this.check2 = true
      //   } else {
      //     this.check2 = false
      //   }
      // })
      this.toUpdataRoleDialog.title = '更改角色权限'
      this.toUpdataRoleDialog.visible = true
    }
  }
}
</script>

