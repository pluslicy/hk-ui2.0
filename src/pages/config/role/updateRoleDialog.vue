<template>
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
</template>
<script>
export default {
  data() {
    return {
      // 模态框树形控件
      props: {
        label: 'name',
        children: 'zones'
      },
      count: 1,
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
    toOpenDialog(row) {
      this.toUpdataRoleDialog.visible = true
    }
  }
}
</script>

