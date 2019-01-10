<template>
  <div class="CaddModal">
    <!-- 配置项新增模态框 -->
    <el-dialog :visible.sync="dialogFormVisible3" title="新增设备类型">
      <el-form ref="configitemForm" :model="configitemForm" :rules="configitemRules" label-width="120px" class="demo-ruleForm">
        <el-form-item label="配置项名称" prop="configitem_name">
          <el-input v-model="configitemForm.configitem_name" />
          {{ configitemForm }}
        </el-form-item>
        <el-form-item label="配置项码" prop="configitem_code">
          <el-input v-model="configitemForm.configitem_code" />
        </el-form-item>
        <el-form-item label="配置项值" prop="configitem_value">
          <el-input v-model="configitemForm.configitem_value" />
        </el-form-item>
        <el-form-item label="配置项优先级" prop="priority">
          <el-input v-model="configitemForm.priority" />
        </el-form-item>
        <el-form-item label="配置项描述" prop="configitem_desc">
          <el-input v-model="configitemForm.configitem_desc" type="textarea" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="close">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible3 = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script type="text/javascript">
// import axios from '@/http/axios'
export default {
  data() {
    return {
      dialogFormVisible3: false,
      configitemForm: {
      },
      configitemRules: {
        configitem_name: [
          { required: true, message: '请输入配置项名称', trigger: 'blur' }
        ],
        configitem_code: [
          { required: true, message: '请输入配置项码', trigger: 'blur' }
        ],
        configitem_value: [
          { required: true, message: '请输入配置项默认值', trigger: 'blur' }
        ],
        priority: [
          { required: true, message: '优先级不能为空', trigger: 'blur' },
          { type: 'number', message: '优先级必须为数字值', trigger: 'blur' }
        ],
        configitem_desc: [
          { required: true, message: '请输入配置项描述', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    close() {
      this.dialogFormVisible3 = false
      this.configitemForm = {}
    }
  }
}
</script>
