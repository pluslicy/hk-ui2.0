<template>
  <div class="deviceType">
    <!-- 表格 -->
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="date" label="序号" width="400" align="center" />
      <el-table-column prop="name" label="类型名称" width="400" align="center" />
      <el-table-column prop="address" label="类型描述" width="600" align="center" />
      <el-table-column label="操作" align="center">
        <template slot-scope="{row}">
          <el-dropdown :hide-on-click="false" @command="handleCommand">
            <span class="el-dropdown-link">查&nbsp;&nbsp;&nbsp;&nbsp;看<i class="el-icon-arrow-down el-icon--right" /></span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="a">数据项</el-dropdown-item>
              <el-dropdown-item command="b">操作项</el-dropdown-item>
              <el-dropdown-item command="c">配置项</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
      </el-table-column>
    </el-table>
    <!-- 数据项新增模态框 -->
    <el-dialog :visible.sync="dialogFormVisible1" title="新增数据项类型">
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="120px" class="demo-ruleForm">
        <el-form-item label="数据项名称" prop="name">
          <el-input v-model="ruleForm.name" />
        </el-form-item>
        <el-form-item label="数据项码" prop="name">
          <el-input v-model="ruleForm.name" />
        </el-form-item>
        <el-form-item label="数据项单位" prop="name">
          <el-input v-model="ruleForm.name" />
        </el-form-item>
        <el-form-item label="数据项分组名" prop="name">
          <el-input v-model="ruleForm.name" />
        </el-form-item>
        <el-form-item label="数据项优先级" prop="name">
          <el-input v-model="ruleForm.name" />
        </el-form-item>
        <el-form-item label="数据项描述" prop="desc">
          <el-input v-model="ruleForm.desc" type="textarea" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible1 = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible1 = false">确 定</el-button>
      </div>
    </el-dialog>
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
    <!-- 配置项新增模态框 -->
    <el-dialog :visible.sync="dialogFormVisible3" title="新增设备类型">
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="120px" class="demo-ruleForm">
        <el-form-item label="配置项名称" prop="name">
          <el-input v-model="ruleForm.name" />
        </el-form-item>
        <el-form-item label="配置项码" prop="name">
          <el-input v-model="ruleForm.name" />
        </el-form-item>
        <el-form-item label="配置项值" prop="name">
          <el-input v-model="ruleForm.name" />
        </el-form-item>
        <el-form-item label="配置项优先级" prop="name">
          <el-input v-model="ruleForm.name" />
        </el-form-item>
        <el-form-item label="配置项描述" prop="desc">
          <el-input v-model="ruleForm.desc" type="textarea" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible3 = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible3 = false">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 数据项模态框 -->
    <el-dialog :visible.sync="dialogVisible1" :title="title" width="100%" fullscreen>
      <span class="deviceType_title">数据项:</span>
      <el-row>
        <el-button type="primary" plain size="mini" style="float:right;margin:1em;" @click="dialogFormVisible1 = true">新增</el-button>
      </el-row>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column align="center" prop="name" label="名称" />
        <el-table-column align="center" prop="name" label="数据项码" />
        <el-table-column align="center" prop="name" label="分组名" />
        <el-table-column align="center" prop="name" label="描述" />
        <el-table-column align="center" prop="name" label="单位" />
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <svg-icon style="font-size:16px;" icon-class="edit" />
            <svg-icon style="font-size:16px;margin-left:5px;" icon-class="delete" />
            <!--  <i class="fa fa-edit" style="color:#448db8" title="编辑"></i>
                      <i class="fa fa-trash-o" style="color:#f56c6c" title="删除"></i> -->
          </template>
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer"><el-button @click="dialogVisible1 = false">取 消</el-button></span>
    </el-dialog>
    <!-- 操作项模态框 -->
    <el-dialog :visible.sync="dialogVisible2" :title="title" width="100%" fullscreen>
      <span class="deviceType_title">操作项:</span>
      <el-row>
        <el-button type="primary" plain size="mini" style="float:right;margin:1em;" @click="dialogFormVisible2 = true">新增</el-button>
      </el-row>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column align="center" prop="name" label="名称" />
        <el-table-column align="center" prop="name" label="操作项码" />
        <el-table-column align="center" prop="name" label="类型" />
        <el-table-column align="center" prop="name" label="描述" />
        <el-table-column align="center" prop="name" label="操作">
          <template slot-scope="scope">
            <svg-icon style="font-size:16px;" icon-class="edit" />
            <svg-icon style="font-size:16px;margin-left:5px;" icon-class="delete" />
          </template>
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer"><el-button @click="dialogVisible2 = false">取 消</el-button></span>
    </el-dialog>
    <!-- 配置项模态框 -->
    <el-dialog :visible.sync="dialogVisible3" :title="title" width="100%" fullscreen>
      <span class="deviceType_title">配置项:</span>
      <el-row>
        <el-button type="primary" plain size="mini" style="float:right;margin:1em;" @click="dialogFormVisible3 = true">新增</el-button>
      </el-row>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column align="center" prop="name" label="名称" />
        <el-table-column align="center" prop="name" label="配置项码" />
        <el-table-column align="center" prop="name" label="配置项值" />
        <el-table-column align="center" prop="name" label="描述" />
        <el-table-column align="center" prop="name" label="操作">
          <template slot-scope="scope">
            <svg-icon style="font-size:16px;" icon-class="edit" />
            <svg-icon style="font-size:16px;margin-left:5px;" icon-class="delete" />
          </template>
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer"><el-button @click="dialogVisible3 = false">取 消</el-button></span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }],
      title: '',
      // 新增,模态框的显示隐藏
      dialogFormVisible: false,
      dialogFormVisible1: false,
      dialogFormVisible2: false,
      dialogFormVisible3: false,
      formLabelWidth: '120px',
      // 查看,模态框的显示隐藏
      dialogVisible1: false,
      dialogVisible2: false,
      dialogVisible3: false,
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
    handleCommand(command) {
      if (command === 'a') {
        this.dialogVisible1 = true
      } else if (command === 'b') {
        this.dialogVisible2 = true
      } else if (command === 'c') {
        this.dialogVisible3 = true
      }
    }
  }
}
</script>
<style type="text/css">
.deviceType {
  margin: 1em;
  background: #ffffff;
  border-radius: 3px;
  min-height: 840px;
  padding: 1em;
  overflow: auto;
}
.deviceType .deviceType_title {
  font-size: 18px;
  margin-bottom: 10px;
}
.el-dropdown-link {
  cursor: pointer;
  color: #409EFF;
}
.el-icon-arrow-down {
  font-size: 12px;
}

</style>
