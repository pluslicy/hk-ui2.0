<template>
  <div class="alarm">
    <div class="top">
      <el-row>
        <el-col :span="4">
          <el-input v-model="device_name" size="mini" placeholder="请输入设备名" clearable />
        </el-col>
        <el-col :span="4" :offset="1">
          <el-select v-model="alarm_level" clearable placeholder="报警级别" size="mini">
            <el-option v-for="item in alarm_levels" :key="item.level_id" :label="item.level_text" :value="item.level_id" />
          </el-select>
        </el-col>
        <el-col :span="10" :offset="1">
          <el-date-picker v-model="time" width="100%" value-format="timestamp" format="yyyy-MM-dd" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" size="mini" />
        </el-col>
        <el-col :span="2" :offset="2">
          <iframe v-show="false" frameborder="0" width="100px" height="100px" />
          <el-button size="mini" type="primary" plain>导出</el-button>
        </el-col>
      </el-row>
      <el-row style="margin-top:12px;">
        <el-col :span="4">
          <el-input v-model="alarm_content" size="mini" placeholder="请输入报警内容" clearable />
        </el-col>
        <el-col :span="4" :offset="1">
          <el-select v-model="alarm_status" clearable placeholder="报警状态" size="mini">
            <el-option v-for="item in alarm_statuss" :key="item.status_id" :label="item.status_text" :value="item.status_id" />
          </el-select>
        </el-col>
        <el-col :span="4" :offset="1">
          <el-input v-model="room_name" size="mini" clearable placeholder="请输入机房名称" />
        </el-col>
        <el-col :span="2" :offset="1">
          <el-button size="mini" type="primary" plain>查询</el-button>
        </el-col>
        <el-col :span="2" :offset="3">
          <el-button size="mini" type="primary" plain>批量处理</el-button>
        </el-col>
        <el-col :span="2">
          <el-button size="mini" type="primary" plain>查看统计</el-button>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<style scoped>
  .alarm {
  margin: 1em;
  background: #ffffff;
  border-radius: 3px;
  padding: 1em;
}

</style>
<script type="text/javascript">
export default {
  data() {
    return {
      // 设备名称
      device_name: '',
      // 报警级别
      alarm_level: '',
      alarm_levels: [],
      // 时间
      time: '',
      // 报警内容
      alarm_content: '',
      // 报警状态
      alarm_status: '',
      alarm_statuss: '',
      // 机房名称
      room_name: ''

    }
  }
}

</script>
