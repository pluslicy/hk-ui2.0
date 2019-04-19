<template>
  <div class="security">
    <!-- 安防 红外 -->
    <!-- 安防图片 -->
    <div class="security_img">
      <img :src="room.room_plane_imgpath" alt="图片加载中..." style="height:100%;width:100%;">
      <canvas id="securityCanvas" :height="canvas.height" :width="canvas.width"></canvas>
    </div>
    <!-- 安防实时数据 -->
    <div class="security_data">
      <el-table
        v-loading="loading"
        :data="currentSecurity"
        border
        size="mini"
        height="250"
        style="width: 85%">
        <el-table-column
          prop="device_name"
          label="设备名称"
          align="center" />
        <el-table-column
          prop="data[0].value"
          label="红外探头"
          align="center" />
      </el-table>
    </div>
    <!-- <el-row :gutter="20">
      <el-col :span="10"><div class="security_img">
        <img :src="room.room_plane_imgpath" alt="图片加载中..." style="height:100%;width:100%;">
        <canvas id="securityCanvas" height="100%"></canvas>
      </div></el-col>
      <el-col :span="14"><div class="">
        <el-table
          v-loading="loading"
          :data="currentSecurity"
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
            label="红外探头"
            align="center" />
        </el-table>
      </div></el-col>
    </el-row> -->
    <!-- 历史数据 -->
    <div class="security_history">
      <!-- 查询 -->
      <div class="security_query">
        <el-date-picker
          v-model="time"
          type="datetimerange"
          align="right"
          size="mini"
          @change="change"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :default-time="['00:00:00', '23:59:59']">
        </el-date-picker>
        <span class="dataOptions optionDay">本天</span>
        <span class="dataOptions optionWeek">本周</span>
        <span class="dataOptions optionMonth">本月</span>
        <span class="dataOptions optionQuarter">本季度</span>
      </div>
      <!-- 图表 -->
      <div class="security_chart">
        <div id="securityChart" :style="he"></div>
      </div>
    </div>
  </div>
</template>
<script>
import service from '@/utils/request'
import echarts from 'echarts'
import $ from 'jquery'
export default {
  data(){
    return {
      // 加载
      loading: false,
      // 机房信息
      room:{},
      // 设备信息
      securityDevice:[],
      // 当前安防信息
      currentSecurity: [],
      // 定时器
      timer:'',
      // 画布
      canvas: {
        width: 500,
        height: 250
      },
      // 日期时间选择器
      time:'',
      // 图表高度
      he:'',
      // 查询数据
      query: {
        device_id:'',
        start_time:'',
        end_time:''
      }
    }
  },
  created(){
    // 图表高度
    this.he = "width: 90%;height: " + ($(window).height() - 560) + 'px;'
    // this.change()
    this.findAllRoom()
    this.findAllDevice()
  },
  destroyed(){
    clearInterval(this.timer)
  },
  watch:{
    query: {
      handler: function() {
        this.findAllHistoryData()
      },
      deep: true
    }
  },
  methods: {
    // 时间选择器触发
    change(){
      this.query.device_id = this.$parent.device_id
      this.query.start_time = this.time[0]
      this.query.end_time = this.time[1]
    },
    // 绘制安防图表
    drawSecurityChart(data){
      // console.log(data)
      let seriesData = data.datas.map((item)=>{
        return {
          name:item.name,
          type:'line',
          stack: '总量',
          data: item.data
        }
      })
      // console.log(seriesData)
      let deviceName = data.datas.map((item)=>{
        return item.name
      })
      // console.log(deviceName)
      let timeData = data.times
      // console.log(timeData)
      var myChart = echarts.init(document.getElementById('securityChart'))
      var option = {
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data:['邮件营销','联盟广告','视频广告','直接访问','搜索引擎']
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
        },
        yAxis: {
          type: 'value'
        },
        series: seriesData
      }
      myChart.setOption(option)
    },
    // 绘制安防位置
    drawSecurityCanvas(){
      const vm = this
      // 获取canvas元素
      const canvas = document.getElementById('securityCanvas')
      // 获取上下文对象
      const context = canvas.getContext('2d')
      // 设置样式
      context.fillStyle = '#000'
      // 设置线宽
      context.lineWidth = 4
      // 绘制
      this.securityDevice.forEach((item)=>{
        const slicePath = item.device_imgpath.split('/images/devices/')[1]
        // console.log(slicePath)
        if(slicePath !== 'default.png'){
          // 绘制图像
          const img = new Image()
          img.src = item.device_imgpath
          img.onload = function(){
            context.drawImage(img, item.pos.pos_x / 100 * vm.canvas.width, item.pos.pos_y / 100 * vm.canvas.height, 20, 20)
          }
          context.fillText(item.device_name, item.pos.pos_x / 100 * vm.canvas.width + 15, item.pos.pos_y / 100 * vm.canvas.height + 5,100)
        } else {
          // 绘制圆
          context.beginPath()
          context.arc(item.pos.pos_x / 100 * vm.canvas.width, item.pos.pos_y / 100 * vm.canvas.height, 10, 0, 2 * Math.PI)
          context.closePath()
          context.fill()
          context.fillText(item.device_name, item.pos.pos_x / 100 * vm.canvas.width + 15, item.pos.pos_y / 100 * vm.canvas.height + 5,100)
        }
      })
    },
    // 获取所有的历史数据
    findAllHistoryData(){
      service.get('/api_room_monitor/get_device_data/', {
        params: this.query
      })
        .then(({ data }) => {
          // console.log(JSON.stringify(this.query))
          // console.log(JSON.stringify(data))
          setTimeout(() => {
            this.drawSecurityChart(data)
          }, 100)
        })
        .catch(()=>{

        })
    },
    // 获取所有设备
    findAllDevice(){
      service.get('/api_room_monitor/get_devices/',{
        params: {
          room_id: this.$parent.roomId,
          devicetype_id: this.$parent.devicetype_id
        }
      })
      .then(({data})=>{
        // console.log(data)
        this.securityDevice = data
        let idsArr = data.map((item)=>{
          return item.device_id
        })
        // console.log(idsArr)
        let ids = idsArr.toString()
        // console.log(ids)
        this.findCurrentDeviceData(ids)
        this.timer = setInterval(()=>{
          this.findCurrentDeviceData(ids)
        },10000)
        setTimeout(()=>{
          this.drawSecurityCanvas()
        },100)
      })
    },
    // 获取设备当前数据
    findCurrentDeviceData(ids) {
      // this.loading = true
      service.get('/api_room_monitor/get_current_data/', {
        params: { device_ids: ids }
      })
        .then(({ data }) => {
          // console.log(data)
          this.currentSecurity = data
        })
        .catch(() => {

        })
        .finally(() => {
          this.loading = false
        })
    },
    // 获取所有机房信息
    findAllRoom() {
      service.get('/api_room/list_all_room/?room_id=' + this.$parent.roomId)
        .then(({ data }) => {
          // console.log(data)
          this.room = data[0]
        })
        .catch(() => {

        })
    }
  }
}
</script>
<style scoped>
.security_img {
  height: 250px;
  width: 500px;
  position: relative;
  float: left;
}
.security_img #securityCanvas {
  position: absolute;
  top: 0;
  left: 0;
}
.security_data {
  margin-left: 520px;
  margin-bottom: 1em;
}
.security_history .security_query {
  margin-bottom: 2em;
}
.security_history .security_query .dataOptions {
  padding: 5px;
  background: #edd;
  font-size: 12px;
  border-radius: 5px;
  cursor: pointer;
  margin-left: 5px;
}
</style>

