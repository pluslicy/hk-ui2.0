<template>
  <!-- 设备管理模态框 -->
  <div class="device_dialog">
    <!-- 修改设备数据信息 -->
    <el-dialog :visible.sync="deviceDialog.visible" :title="deviceDialog.title" :before-close="closeDialog">
      <!-- 体 -->
      <el-form :model="deviceDialog.form" size="mini">
        <el-form-item :label-width="formLabelWidth" label="设备名称">
          <el-input v-model="deviceDialog.form.name" autocomplete="off" clearable />
          <!-- </el-input> -->
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="设备码">
          <el-input v-model="deviceDialog.form.name" autocomplete="off" clearable />
          <!-- </el-input> -->
        </el-form-item>
        <el-row>
          <el-col :span="10">
            <el-form-item :label-width="formLabelWidth" label="设备类型">
              <el-select v-model="deviceDialog.form.region" placeholder="请选择类型" clearable>
                <el-option label="区域一" value="shanghai" />
                <!-- <el-option label="区域二" value="beijing"></el-option> -->
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item :label-width="formLabelWidth" label="所属机房">
              <el-select v-model="deviceDialog.form.region" placeholder="请选择机房" clearable>
                <el-option label="区域一" value="shanghai" />
                <!-- <el-option label="区域二" value="beijing"></el-option> -->
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item :label-width="formLabelWidth" label="设备描述">
          <el-input :rows="2" v-model="textarea" type="textarea" placeholder="" />
          <!-- </el-input> -->
        </el-form-item>
        {{ deviceDialog.form }}
      </el-form>
      <!-- 尾 -->
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click="closeDialog">取 消</el-button>
        <el-button type="primary" size="mini" @click="saveOrUpdateDevice">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 查看数据详细信息 -->
    <el-dialog
      :title="deviceViewDialog.title"
      :visible.sync="deviceViewDialog.visible"
      :before-close="closeViewDialog"
      width="30%">
      <el-row :gutter="20">
        <el-col :span="14">
          <ul>
            <li>
              设备码：<span>124324</span>
            </li>
            <li>
              设备类型：<span>124324</span>
            </li>
            <li>
              所属机房：<span>124324</span>
            </li>
          </ul>
        </el-col>
        <el-col :span="10" style="text-align:center;">
          <img src="@/assets/401_images/401.gif" alt="图片找不到了" height="110" >
        </el-col>
      </el-row>
      <ul>
        <li>
          描述：<span>124324shiahsiavhd ahsdaiwdhhjdddddddhjs dfchs dbcfh ssdvcsADASD fcsdfcdsafasdfaSDfaSDfcawfsddbhkfchhbdsh</span>
        </li>
      </ul>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      deviceDialog: {
        title: '',
        visible: false,
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
      deviceViewDialog: {
        title: '查看图片',
        visible: false,
        form: {}
      },
      textarea: '',
      formLabelWidth: '100px'
    }
  },
  // props: ["deviceDialog"],
  methods: {
    // 关闭模态框
    closeDialog() {
      this.deviceDialog.visible = false
    },
    // 关闭查看信息模态框
    closeViewDialog() {
      this.deviceViewDialog.visible = false
    },
    // 显示查看信息模态框
    showViewDialog() {
      this.deviceViewDialog.visible = true
    },
    // 显示模态框
    showDialog() {
      this.deviceDialog.visible = true
    },
    // 保存或修改
    saveOrUpdateDevice() {
      this.closeDialog()
      console.log(this.deviceDialog.form)
    }
  }
}
</script>
<style scoped>
  .device_dialog ul {
    margin: 0 10px;
    padding: 0;
  }
  .device_dialog ul li {
    list-style: none;
    line-height: 2.5em;
    padding: 0 10px;
    border-bottom: 1px dashed #ccc;
  }
  .device_dialog img {
    border: 1px dashed #ccc;
  }
</style>

