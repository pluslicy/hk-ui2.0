<template>
  <!-- 设备管理模态框 -->
  <div class="device_dialog">
    <el-dialog :visible.sync="deviceDialog.visible" :title="deviceDialog.title" :before-close="closeDialog">
      <el-form :model="deviceDialog.form" size="mini">
        <el-form-item :label-width="formLabelWidth" label="设备名称">
          <el-input v-model="deviceDialog.form.name" autocomplete="off" clearable />
          <!-- </el-input> -->
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="设备码">
          <el-input v-model="deviceDialog.form.name" autocomplete="off" clearable />
          <!-- </el-input> -->
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="设备类型">
          <el-select v-model="deviceDialog.form.region" placeholder="请选择类型" clearable>
            <el-option label="区域一" value="shanghai" />
            <!-- <el-option label="区域二" value="beijing"></el-option> -->
          </el-select>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="所属机房">
          <el-select v-model="deviceDialog.form.region" placeholder="请选择机房" clearable>
            <el-option label="区域一" value="shanghai" />
            <!-- <el-option label="区域二" value="beijing"></el-option> -->
          </el-select>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="设备描述">
          <el-input :rows="2" v-model="textarea" type="textarea" placeholder="" />
          <!-- </el-input> -->
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click="closeDialog">取 消</el-button>
        <el-button type="primary" size="mini" @click="saveOrUpdateDevice">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      deviceDialog: {
        title: '',
        visible: true,
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        }
      },
      textarea: '',
      formLabelWidth: '120px'
    }
  },
  // props: ["deviceDialog"],
  methods: {
    // 关闭模态框
    closeDialog() {
      this.deviceDialog.visible = false
    },
    // 保存或修改
    saveOrUpdateDevice() {
      this.closeDialog()
    }
  }
}
</script>

