<template>
  <div class="OaddModal">
    <!-- 操作项新增模态框 -->
    <el-dialog :visible.sync="dialogFormVisible2" title="新增操作项类型">
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="120px" class="demo-ruleForm">
        <el-form-item label="操作项名称" prop="name">
          <el-input v-model="ruleForm.name" />
        </el-form-item>
        <el-form-item label="操作项码" prop="name">
          <el-input v-model="ruleForm.name" />
        </el-form-item>
        <el-form-item label="操作项类型" prop="resource">
          <el-radio-group v-model="ruleForm.resource">
            <el-radio label="开关类型" />
            <el-radio label="输入类型" />
            <el-radio label="三路开关类型" />
          </el-radio-group>
        </el-form-item>
        <el-form-item label="操作项优先级" prop="name">
          <el-input v-model="ruleForm.name" />
        </el-form-item>
        <el-form-item label="操作项描述" prop="name">
          <el-input v-model="ruleForm.name" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible2 = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script type="text/javascript">
// import axios from '@/http/axios'
export default {
  data() {
    return {
      dialogFormVisible2: false,
      ruleForm: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        region: [
          { required: true, message: '请选择活动区域', trigger: 'change' }
        ],
        date1: [
          { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
        ],
        date2: [
          { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
        ],
        type: [
          { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
        ],
        resource: [
          { required: true, message: '请选择活动资源', trigger: 'change' }
        ],
        desc: [
          { required: true, message: '请填写活动形式', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
  }
}
</script>
