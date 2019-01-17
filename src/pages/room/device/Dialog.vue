<template>
  <!-- 设备管理模态框 -->
  <div class="device_dialog">
    <!-- 修改设备数据信息 -->
    <el-dialog :visible.sync="deviceDialog.visible" :title="deviceDialog.title" :before-close="closeDialog">
      <!-- {{ devicetypes }} -->
      <!-- 体 -->
      <el-form ref="ruleForm" :rules="rules" :model="deviceDialog.form" size="mini">
        <el-form-item :label-width="formLabelWidth" label="设备名称" prop="device_name">
          <el-input v-model="deviceDialog.form.device_name" autocomplete="off" clearable />
          <!-- </el-input> -->
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="设备码" prop="device_code">
          <el-input v-model="deviceDialog.form.device_code" autocomplete="off" clearable />
          <!-- </el-input> -->
        </el-form-item>
        <el-row>
          <el-col :span="10">
            <el-form-item :label-width="formLabelWidth" label="设备类型" prop="devicetype">
              <el-select v-model="deviceDialog.form.devicetype" :disabled="deviceDialog.disabled" placeholder="请选择类型" clearable>
                <el-option v-for="devicetype in devicetypes" :key="devicetype.devicetype_id" :label="devicetype.devicetype_name" :value="devicetype.devicetype_id" />
                <!-- <el-option label="区域二" value="beijing"></el-option> -->
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item :label-width="formLabelWidth" label="所属机房" prop="room">
              <el-select v-model="deviceDialog.form.room" placeholder="请选择机房" clearable>
                <el-option v-for="r in rooms" :key="r.room_id" :label="r.room_name" :value="r.room_id" />
                <!-- <el-option label="区域二" value="beijing"></el-option> -->
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item :label-width="formLabelWidth" label="设备描述" prop="device_desc">
          <el-input :rows="2" v-model="deviceDialog.form.device_desc" type="textarea" placeholder="" />
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
      :model="deviceViewDialog.devices"
      :title="deviceViewDialog.title"
      :visible.sync="deviceViewDialog.visible"
      :before-close="closeViewDialog"
      width="30%">
      <!-- {{ deviceViewDialog.devices }} -->
      <el-row :gutter="20">
        <el-col :span="14">
          <ul>
            <li>
              设备码：<span>{{ deviceViewDialog.devices.device_code }}</span>
            </li>
            <li>
              设备类型：<span>{{ deviceViewDialog.devices.devicetype.devicetype_name }}</span>
            </li>
            <li>
              所属机房：<span>{{ deviceViewDialog.devices.room.room_name }}</span>
            </li>
          </ul>
        </el-col>
        <el-col :span="10" style="text-align:center;">
          <img src="deviceViewDialog.devices.device_imgpath" alt="" height="110" >
        </el-col>
      </el-row>
      <ul>
        <li>
          描述：<span>{{ deviceViewDialog.devices.device_desc }}</span>
        </li>
      </ul>
    </el-dialog>
  </div>
</template>

<script>
import axios from '@/http/axios'
export default {
  props: {
    // rooms: Array,
    // devices: Array
    // rooms: {
    //   type: Array,
    //   default: []
    // },
    devices: {
      type: Array,
      default: function() {
        return []
      }
    },
    find_all_device: {
      type: Function,
      default: null
    }
  },
  data() {
    return {
      devicetypes: [],
      rooms: [],
      // 修改模态框
      deviceDialog: {
        title: '',
        visible: false,
        disabled: false,
        form: {}
      },
      // 显示模态框
      deviceViewDialog: {
        title: '查看图片',
        visible: false,
        devices: {
          devicetype: {},
          room: {}
        }
      },
      formLabelWidth: '100px',
      // 验证规则
      rules: {
        device_name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 20, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        device_code: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 20, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        devicetype: [
          { required: true, message: '请选择活动区域', trigger: 'change' }
        ],
        room: [
          { required: true, message: '请选择活动区域', trigger: 'change' }
        ],
        device_desc: [
          { required: true, message: '请填写活动形式', trigger: 'blur' }
        ]
      }
    }
  },
  mounted() {
    this.find_all_deviceType()
    this.findAllroom()
  },
  methods: {
    // 保存或修改
    saveOrUpdateDevice() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          if (this.deviceDialog.form.device_id) {
            // 修改
            axios.post('/api_device/update_device/', this.deviceDialog.form)
              .then(() => {
                console.log(this.deviceDialog.form)
                this.$notify({
                  title: '成功',
                  message: '保存成功',
                  type: 'success'
                })
                this.closeDialog()
                this.findAllDevice()
              })
          } else {
            // 新增
            axios.post('/api_device/create_device/', this.deviceDialog.form)
              .then(() => {
                this.$notify({
                  title: '成功',
                  message: '保存成功',
                  type: 'success'
                })
                this.closeDialog()
                this.find_all_device()
                // this.$emit('find_all_device')
                // this.$parent.findAllroom()
                // this.$parent.find_all_deviceType()
                // this.$parent.find_all_deviceName()
              })
          }
        }
      })
    },
    // 获取所有设备类型
    find_all_deviceType() {
      axios.get('/api_devicetype/list_all_devicetypes/')
        .then(({ data }) => {
          this.devicetypes = data
          console.log(this.devicetypes)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    // 获取所有机房
    findAllroom() {
      axios.get('/api_room/list_all_room/')
        .then(({ data }) => {
          // console.log(data)
          this.rooms = data
        })
        .catch((error) => {
          console.log(error)
        })
    },
    // 关闭查看信息模态框
    closeViewDialog() {
      this.deviceViewDialog.visible = false
    },
    // 显示查看信息模态框
    showViewDialog() {
      this.deviceViewDialog.visible = true
    },
    // 关闭模态框
    closeDialog() {
      this.deviceDialog.visible = false
    },
    // 显示模态框
    showDialog() {
      this.deviceDialog.visible = true
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
