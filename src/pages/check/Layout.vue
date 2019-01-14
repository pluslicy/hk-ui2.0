<template>
  <div class="check">
    <el-row>
      <el-form :inline="true" :model="form" class="demo-form-inline" size="mini">
        <el-col :span="3">
          <el-form-item>
            <el-input v-model="form.check_name" placeholder="申请人" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-form-item>
            <el-select v-model="form.check_id" placeholder="审批类型" clearable>
              <el-option v-for="item in check_types" :key="item.type_id" :label="item.type_text" :value="item.type_id" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-form-item>
            <el-select v-model="form.status_id" placeholder="审批状态" clearable>
              <el-option v-for="item in check_states" :key="item.status_id" :label="item.status_text" :value="item.status_id" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item>
            <div>
              <el-date-picker v-model="form.time" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" />
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="2" :offset="1">
          <el-form-item>
            <el-button type="primary" size="mini">查询</el-button>
          </el-form-item>
        </el-col>
        <el-col :span="2" :offset="2">
          <el-row type="flex" justify="end">
            <el-form-item>
              <el-button type="primary" size="mini" style="float: right;width: 6em;" @click="addRequst()">添加申请</el-button>
            </el-form-item>
          </el-row>
        </el-col>
      </el-form>
    </el-row>
    <!-- 表格 -->
    <el-table :data="check_list" :height="he" style="width: 100%" size="mini">
      <el-table-column prop="row_no" label="序号" align="center" width="50" />
      <el-table-column prop="approval_type" label="审批类型" align="center" />
      <el-table-column prop="approval_user" label="申请人" align="center" />
      <el-table-column prop="approval_text" label="申请内容" align="center" />
      <el-table-column prop="approval_time" label="申请时间" align="center" />
      <el-table-column prop="approval_history" label="审批记录" align="center" />
      <el-table-column prop="approval_status" label="审批状态" align="center" />
      <el-table-column prop="approval_id" label="操作" align="center" width="80">
        <template slot-scope="{row}">
          <i class="fa fa-edit" style="color:#448db8" title="审批" @click="checkRequst(row)" />
          <i class="el-icon-delete" style="color:#f56c6c" title="删除" />
        </template>
      </el-table-column>
    </el-table>
    <!-- 添加申请模态框 -->
    <addRequstModal ref="addRequstModal" />
    <checkModal ref="checkModal" />
  </div>
</template>
<style scoped>
.check {
  margin: 1em;
  background: #ffffff;
  border-radius: 3px;
  padding: 1em;
}
.check i {
  cursor:pointer
}
</style>
<script>
import addRequstModal from '@/pages/check/addRequstModal.vue'
import checkModal from '@/pages/check/checkModal.vue'
import $ from 'jquery'
import axios from '@/http/axios'
export default {
  components: {
    addRequstModal,
    checkModal
  },
  data() {
    return {
      check_types: [],
      check_states: [],
      form: {
        check_name: '',
        check_id: '',
        status_id: '',
        time: null
      },
      check_list: []
    }
  },
  created() {
    this.loadCheck_types()
    this.loadCheck_states()
    this.loadCheck_list()
    this.he = $(window).height() - 200
  },
  methods: {
    // 加载审批类型
    loadCheck_types() {
      axios.get('/api_approval/get_approval_type/')
        .then(({ data }) => {
          this.check_types = data.result
        }).catch(() => {
          this.$notify.error({
            title: '网络超时',
            message: '这是一条错误的提示消息'
          })
        })
    },
    // 加载审批状态
    loadCheck_states() {
      axios.get('/api_approval/get_approval_status/')
        .then(({ data }) => {
          this.check_states = data.result
        }).catch(() => {
          this.$notify.error({
            title: '网络超时',
            message: '这是一条错误的提示消息'
          })
        })
    },
    // 加载申请列表
    loadCheck_list() {
      axios.get('/api_approval/get_approval_list/')
        .then(({ data }) => {
          this.check_list = data.result
        }).catch(() => {
          this.$notify.error({
            title: '网络超时',
            message: '这是一条错误的提示消息'
          })
        })
    },
    // 添加申请
    addRequst() {
      this.$refs.addRequstModal.dialogFormVisible = true
      this.$refs.addRequstModal.check_type = this.check_types
    },
    checkRequst(data) {
      this.$refs.checkModal.visible1 = true
      this.$refs.checkModal.user_check = [data]
    }
  }
}

</script>
