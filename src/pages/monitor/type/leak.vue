<template>
  <div class="leak">
    <!-- 漏水 -->
    <!-- 漏水图片 -->
    <div class="leak_img">
      <img :src="room.room_plane_imgpath" alt="图片加载中..." style="height:100%;width:100%">
      <canvas id="leakCanvas" :width="canvasWidth" height="250px" />
    </div>
    <!-- 漏水数据 -->
    <div class="leak_data">
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
      // 加载
      loading: false,
      // 漏水数据
      leak: [],
      // 设备名称
      deviceNames: [],
      // 查询参数
      query: {
        device_id: undefined,
        start_time: undefined,
        end_time: undefined
      },
      // 选择时间
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
      // 当前设备数据
      currentDeviceData: [],
      // 机房
      room: {},
      // 画布宽度
      canvasWidth: 590
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
    // 图表高度
    this.he = 'width: 92%;height: ' + ($(window).height() - 560) + 'px;'
    // 加载所有设备名称
    this.findAllDeviceName()
    // 加载所有漏水历史数据
    this.findAllLeakData()
    // 查询时间改变
    this.queryChange()
    // this.leak = this.$parent.device
    // 加载所有的设备
    this.findAllDeviceByIds()
    this.findAllRoom()
  },
  methods: {
    // 温湿度位置
    drawCanvas() {
      const vm = this
      const canvas = document.getElementById('leakCanvas')
      const context = canvas.getContext('2d')
      context.fillStyle = 'block'
      context.lineWidth = 4
      // let devicePosition = this.th.map((item) => {
      //   return item
      // })
      // console.log(devicePosition)
      this.leak.forEach((item) => {
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
          // context.arc(item.x,item.y,10,0,2*Math.PI);
          context.arc(item.pos.pos_x / 100 * vm.canvasWidth, item.pos.pos_y / 100 * 216, 10, 0, 2 * Math.PI)
          context.fill()
          // context.fillText(item.text,item.x-15,item.y-15,100);
          context.fillText(item.device_name, item.pos.pos_x / 100 * vm.canvasWidth - 15, item.pos.pos_y / 100 * 216 - 15, 100)
        }
      })
    },
    // 日期时间选择器确定时触发
    queryChange() {
      this.query.start_time = this.time[0]
      this.query.end_time = this.time[1]
    },
    // 绘制漏水曲线图
    drawLeak(data) {
      // console.log(data)
      // 得到温湿度时间
      var leakTime = data.times.map((item) => {
        return item.split(' ')[1]
      })
      // console.log(leakTime)
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById('leak'))
      // 指定图表的配置项和数据
      var option = {
        tooltip: {
          trigger: 'axis'
        },
        color: ['#8dbfef'],
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
            step: 'leak',
            data: data.datas[0].data
          }
        ]
      }
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option)
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
        .catch(() => {
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
          console.log(error, '设备名称')
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
          // console.log(data)
          this.leak = data
          var idsArr = data.map((item) => {
            return item.device_id
          })
          var ids = idsArr.toString()
          this.findCurrentDeviceData(ids)
          setTimeout(() => {
            this.drawCanvas()
          }, 100)
        })
        .catch((error) => {
          console.log(error, '获取所有设备')
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
  /* background: #ccc; */
  width: 37%;
  height: 250px;
  float: left;
  position: relative;
}
.leak_img #leakCanvas {
  position: absolute;
  top: 0;
  left: 0;
}
.leak_data {
  /* background: #223356; */
  margin-left: 38%;
  margin-bottom: 1em;
}
</style>
