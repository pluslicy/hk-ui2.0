<template>
  <div class="leak">
    <!-- 漏水 -->
    <!-- 漏水图片 -->
    <div class="leak_img">
      <img src="" alt="图片找不到了">
    </div>
    <!-- 漏水数据 -->
    <div class="leak_data">
      <el-table
        v-loading="loading"
        :data="leak"
        border
        size="mini"
        height="300"
        style="width: 83%">
        <el-table-column
          prop="device_name"
          label="设备名称"
          align="center" />
        <el-table-column
          prop="address"
          label="浸水"
          align="center" />
      </el-table>
    </div>
    <!-- 查询历史数据 -->
    <div class="leak_history">
      <div class="leak_history_form">
        <el-select v-model="query.device_id" clearable placeholder="请选择设备" size="mini">
          <el-option
            v-for="name in deviceNames"
            :key="name.device_id"
            :label="name.device_name"
            :value="name.device_id" />
        </el-select>
        <el-date-picker
          v-model="time"
          :picker-options="pickerTime"
          value-format="yyyy-MM-dd HH:mm:ss"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          align="right"
          size="mini"
          clearable
          @change="queryChange" />
      </div>
      <div class="leak_history_data">
        <div id="leak" :style="he" />
      </div>
    </div>
  </div>
</template>
<script>
import axios from '@/http/axios'
import echarts from 'echarts'
import $ from 'jquery'
export default {
  data() {
    return {
      loading: false,
      // 漏水数据
      leak: [],
      leakdata: [],
      // 设备名称
      deviceNames: [],
      // 查询参数
      query: {
        device_id: undefined,
        start_time: undefined,
        end_time: undefined
      },
      time: [new Date(new Date() - 24 * 60 * 60 * 1000), new Date()],
      // 快捷选择时间
      pickerTime: {
        shortcuts: [{
          text: '最近一天',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 1)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一周',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      }
    }
  },
  watch: {
    query: {
      handler: function() {
        this.findAllLeakData()
      },
      deep: true
    }
  },
  created() {
    this.he = 'width: 92%;height: ' + ($(window).height() - 560) + 'px;'
    this.findAllDeviceName()
    this.findAllLeakData()
    this.queryChange()
    // this.leak = this.$parent.device
    this.findAllDeviceByIds()
  },
  methods: {
    // 日期时间选择器确定时触发
    queryChange() {
      this.query.start_time = this.time[0]
      this.query.end_time = this.time[1]
    },
    // 绘制漏水曲线图
    drawLeak(data) {
      // console.log(data)
      var leakTime = data.times.map((item) => {
        return item.split(' ')[1]
      })
      // console.log(leakTime)
      var leakData = data.datas.map((item) => {
        return item.data
      })
      // console.log(leakData)
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById('leak'))
      // 指定图表的配置项和数据
      var option = {
        tooltip: {
          trigger: 'axis'
        },
        grid: {
          top: '10%',
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: leakTime
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: '浸水',
            type: 'line',
            step: 'start',
            data: leakData
          }
        ]
      }
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option)
    },
    // 获取所有漏水历史数据
    findAllLeakData() {
      // this.loading = true
      axios.get('/api_room_monitor/get_device_data/', {
        params: this.query
      })
        .then(({ data }) => {
          // console.log(JSON.stringify(data))
          setTimeout(() => {
            this.drawLeak(data)
          }, 100)
        })
        .catch((error) => {
          console.log(error)
          // this.$notify({
          //   title: '失败',
          //   message: '网络异常',
          //   type: 'error'
          // })
        })
        .finally(() => {
          // this.loading = false
        })
    },
    // 获取所有的设备名称
    findAllDeviceName() {
      axios.get('/api_device/list_device_name/', {
        params: {
          devicetype_id: this.$parent.devicetype_id
        }
      })
        .then(({ data }) => {
          // console.log(data)
          this.deviceNames = data
          if (data.length) {
            this.query.device_id = data[0].device_id
          } else {
            this.query.device_id = ''
          }
        })
        .catch((error) => {
          console.log(error)
        })
    },
    // 通过机房ID和设备类型ID获取所有设备
    findAllDeviceByIds() {
      axios.get('/api_room_monitor/get_devices/', {
        params: {
          room_id: this.$parent.room_id,
          devicetype_id: this.$parent.devicetype_id
        }
      })
        .then(({ data }) => {
          console.log(data)
          this.leak = data
        })
        .catch((error) => {
          console.log(error)
        })
        .finally(() => {
          this.loading = false
        })
    }
  }
}
</script>
<style scoped>
.leak_img {
  background: #ccc;
  width: 40%;
  height: 300px;
  float: left;
}
.leak_data {
  /* background: #223356; */
  margin-left: 41%;
  margin-bottom: 1em;
}
</style>
