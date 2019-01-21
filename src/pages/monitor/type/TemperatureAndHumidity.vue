<template>
  <div class="TemperatureAndHumidity">
    <!-- 温湿度 -->
    <!-- 温湿度图片 -->
    <div class="th_img">
      <img src="" alt="图片找不到了">
    </div>
    <!-- 温湿度数据 -->
    <div class="th_data">
      <el-table
        v-loading="loading"
        :data="th"
        border
        size="mini"
        height="300"
        style="width: 83%">
        <el-table-column
          prop="device_name"
          label="设备名称"
          align="center" />
        <el-table-column
          prop="device_name"
          label="湿度"
          align="center" />
        <el-table-column
          prop="address"
          label="温度"
          align="center" />
      </el-table>
    </div>
    <!-- 查询历史数据 -->
    <div class="th_history">
      <div class="th_history_form">
        <el-select v-model="thQuery.device_id" clearable placeholder="请选择设备" size="mini">
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
          @change="thQueryChange" />
      </div>
      <div class="th_history_data">
        <div id="th" :style="he" />
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
      th: [],
      deviceNames: [],
      thQuery: {
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
    thQuery: {
      handler: function() {
        this.findAllHumitureData()
      },
      deep: true
    }
  },
  created() {
    this.he = 'width: 92%;height: ' + ($(window).height() - 560) + 'px;'
    // this.th = this.$parent.device
    // console.log(this.th)
    this.findAllTHData()
    this.findAllDeviceName()
    this.findAllHumitureData()
    this.thQueryChange()
  },
  methods: {
    // 日期时间选择器确定时触发
    thQueryChange() {
      this.thQuery.start_time = this.time[0]
      this.thQuery.end_time = this.time[1]
    },
    findAllTHData() {
      this.loading = true
      axios.get('/api_room_monitor/get_devices/', {
        params: {
          room_id: this.$parent.room_id,
          devicetype_id: this.$parent.devicetype_id
        }
      })
        .then(({ data }) => {
          console.log(data)
          this.th = data
        })
        .catch((error) => {
          console.log(error)
        })
        .finally(() => {
          this.loading = false
        })
    },
    // 获取详细温湿度数据
    findAllHumitureData() {
      // this.loading = true
      axios.get('/api_room_monitor/get_device_data/', {
        params: this.thQuery
      })
        .then(({ data }) => {
          // console.log(JSON.stringify(data))
          setTimeout(() => {
            this.drawHumiture(data)
          }, 100)
        })
        .catch((error) => {
          console.log(error)
          // console.log(JSON.stringify(this.thQuery))
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
            this.thQuery.device_id = data[0].device_id
          } else {
            this.thQuery.device_id = ''
          }
        })
        .catch((error) => {
          console.log(error)
        })
    },
    // 绘制温湿度图表
    drawHumiture(data) {
      // 得到温湿度数据
      // console.log(data)
      // 获取温湿度时间，并将时间转化为时分秒格式
      const timeData = data.times.map((item) => {
        return item.split(' ')[1]
      })
      // console.log(timeData)
      // 温度数据
      // var temperatureData = data.datas.map((item) => {
      //   return item[1]
      // })
      // console.log(temperatureData)
      // 湿度数据
      // var humidityData = data[1].data.map((item) => {
      //   return item[1]
      // })
      // console.log(humidityData)
      var myChart = echarts.init(document.getElementById('th'))
      var option = {
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          right: 40,
          top: 20,
          data: [data.datas[0].name, data.datas[1].name]
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: timeData.reverse()
        },
        yAxis: [{
          name: '℃ / %',
          type: 'value'
        }],
        series: [
          {
            name: data.datas[0].name,
            type: 'line',
            smooth: true,
            data: data.datas[0].data
          },
          {
            name: data.datas[1].name,
            type: 'line',
            smooth: true,
            data: data.datas[1].data
          }
        ]
      }
      myChart.setOption(option)
    }
  }
}
</script>

<style scoped>
.th_img {
  background: #ccc;
  width: 40%;
  height: 300px;
  float: left;
}
.th_data {
  /* background: #223356; */
  margin-left: 41%;
  margin-bottom: 1em;
}
</style>
