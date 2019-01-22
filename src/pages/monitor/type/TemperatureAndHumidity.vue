<template>
  <div class="TemperatureAndHumidity">
    <!-- 温湿度 -->
    <!-- 温湿度图片 -->
    <div class="th_img">
      <img :src="room.room_plane_imgpath" alt="图片加载中..." style="height:100%;width:100%">
      <canvas id="thCanvas" :width="canvasWidth" height="250px" />
    </div>
    <!-- 温湿度数据 -->
    <div class="th_data">
      <el-table
        v-loading="loading"
        :data="currentDeviceData"
        border
        size="mini"
        height="250"
        style="width: 84%">
        <el-table-column
          prop="device_name"
          label="设备名称"
          align="center" />
        <el-table-column
          prop="data[0].value"
          label="湿度"
          align="center" />
        <el-table-column
          prop="data[1].value"
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
      },
      // device_ids:[],
      // 当前设备数据
      currentDeviceData: [],
      // 机房
      room: {},
      // 画布宽度
      canvasWidth: 590
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
    this.findAllRoom()
    // this.findCurrentDeviceData()
    // this.drawCanvas()
  },
  methods: {
    // 温湿度位置
    drawCanvas() {
      const vm = this
      const canvas = document.getElementById('thCanvas')
      const context = canvas.getContext('2d')
      context.fillStyle = 'block'
      context.lineWidth = 4
      const devicePosition = this.th.map((item) => {
        return item
      })
      console.log(devicePosition)
      this.th.forEach((item) => {
        const slicePath = item.device_imgpath.split('/images/devices/')[1]
        if (slicePath !== 'default.png') {
          const image = new Image()
          image.src = item.device_imgpath
          image.onload = function() {
            // 绘制图像的函数
            // context.drawImage(image,item.x,item.y,20,20);
            context.drawImage(image, item.pos.pos_x / 100 * vm.canvasWidth, item.pos.pos_y / 100 * 216, 20, 20)
          }
          context.fillText(item.device_name, item.pos.pos_x / 100 * vm.canvasWidth - 10, item.pos.pos_y / 100 * 216 - 10, 100)
        } else {
          context.beginPath()
          // context.arc(item.x,item.y,10,0,2*Math.PI)
          context.arc(item.pos.pos_x / 100 * vm.canvasWidth, item.pos.pos_y / 100 * 216, 10, 0, 2 * Math.PI)
          context.fill()
          // context.fillText(item.text,item.x-15,item.y-15,100)
          context.fillText(item.device_name, item.pos.pos_x / 100 * vm.canvasWidth - 15, item.pos.pos_y / 100 * 216 - 15, 100)
        }
      })
    },
    // 日期时间选择器确定时触发
    thQueryChange() {
      this.thQuery.start_time = this.time[0]
      this.thQuery.end_time = this.time[1]
    },
    // 获取所有机房信息
    findAllRoom() {
      axios.get('/api_room/list_all_room/', {
        params: { room_id: this.$parent.roomId }
      })
        .then(({ data }) => {
          this.room = data[0]
          // console.log(data[0])
        })
    },
    // 获取设备当前数据
    findCurrentDeviceData(ids) {
      this.loading = true
      axios.get('/api_room_monitor/get_current_data/', {
        params: { device_ids: ids }
      })
        .then(({ data }) => {
          // console.log(data)
          this.currentDeviceData = data
        })
        .catch(() => {

        })
        .finally(() => {
          this.loading = false
        })
    },
    // 获取所有的温湿度数据
    findAllTHData() {
      this.loading = true
      axios.get('/api_room_monitor/get_devices/', {
        params: {
          room_id: this.$parent.room_id,
          devicetype_id: this.$parent.devicetype_id
        }
      })
        .then(({ data }) => {
          // console.log(JSON.stringify(data))
          this.th = data
          var idsArr = data.map((item) => {
            return item.device_id
          })
          var ids = idsArr.toString()
          this.findCurrentDeviceData(ids)
          setTimeout(() => {
            this.drawCanvas()
          }, 100)
          // console.log(this.device_ids)
        })
        .catch((error) => {
          console.log(error, '温湿度数据')
        })
        .finally(() => {
          this.loading = false
        })
    },
    // 获取详细温湿度历史数据
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
        .catch(() => {
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
        .catch(() => {
          // 错误信息
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
      console.log(timeData)
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
          data: timeData
          // data: data.times
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
  /* background: #ccc; */
  width: 37%;
  height: 250px;
  float: left;
  position: relative;
}
.th_img #thCanvas {
  position: absolute;
  top: 0;
  left: 0;
}
.th_data {
  /* background: #223356; */
  margin-left: 38%;
  margin-bottom: 1em;
}
</style>
