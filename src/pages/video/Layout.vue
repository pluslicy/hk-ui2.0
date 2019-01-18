<template>
  <div class="video">
    <div class="top">
      <div class="left">
        <img src="@/assets/logo2.3e0946d.png" alt="">
        <span>涉密IDC动力环境监控系统</span>
      </div>
      <div class="rooms">
        <ul>
          <li v-for="item in allRooms" :key="item.room_id" :value="item.room_id" @click="findRoomAllMessage(item.room_id)">{{ item.room_name }}</li>
        </ul>
      </div>
      <div class="right">
        <div class="badgeDiv">
          <span>报警</span>
          <router-link to="/"><span style="background-color:red;padding:.3em">{{ alarmCount }}</span></router-link>
          &nbsp;&nbsp;|
        </div>
        <div class="badgeDiv">
          <span>待审批</span>
          <router-link to="/"><span style="background-color:red;padding:.3em">{{ examineCount1 }}</span></router-link>
          &nbsp;&nbsp;|
        </div>
        <div class="badgeDiv">
          <span>{{ currentTime }}</span>
        </div>
        <div class="badgeDiv">
          <router-link to="/"><el-button type="primary" plain size="mini">返回</el-button></router-link>
        </div>
      </div>
    </div>
    <div class="middle">
      <div class="middle_top">
        <div class="one"><span>漏水检测</span></div>
        <!-- <div class="two"><span>进入系统&nbsp;&nbsp;>>&nbsp;&nbsp;>>&nbsp;&nbsp;>></span></div> -->
        <div class="two"><router-link to="/"><span>进入系统&nbsp;&nbsp;>>&nbsp;&nbsp;>>&nbsp;&nbsp;>></span></router-link></div>
      </div>
    </div>
    <div class="bottom">
      <div id="container" style="max-width:100%;height:80%"/>
    </div>
  </div>
</template>

<script>
import axios from '@/http/axios'
import $ from 'jquery'
import echarts from 'echarts'
export default {
  data() {
    return {
      // 所有的机房
      allRooms: [],
      // 报警数量
      alarmCount: 0,
      // 所有的审批
      examineCount: 2,
      // 未审批数量
      examineCount1: 0,
      // 当前时间
      currentTime: '',
      // 当前机房id
      currentRoomId: 0,
      // 温湿度id
      id1: 0,
      // 温度
      temperature: [],
      temperature1: [],
      // 湿度
      humidity: [],
      humidity1: [],
      // 获取温湿度时间
      temperatureTimes: [],
      temperatureTimes1: [],
      temperatureTimes2: []
    }
  },
  created() {
    this.findAllrooms()
    this.getAllAlarms()
    this.timeSetInterval()
    this.getAllExamine()
    this.timeToRefresh()
  },
  mounted() {
    // 高度
    $('.video').height($(window).height() - 16)
  },
  methods: {
    // 每隔1分钟重新刷新所有的数据
    timeToRefresh() {
      setInterval(() => {
        // this.findAllrooms()
        this.getAllAlarms()
        this.timeSetInterval()
        this.getAllExamine()
        // this.findRoomAllMessage(this.currentRoomId)
      }, 600000)
    },
    // 获取所有的机房
    findAllrooms() {
      axios.get('/api_room/list_all_room/').then(({ data }) => {
        this.currentRoomId = data[0].room_id
        // 通过id查找机房的设备信息
        // this.findAllMessages(this.currentRoomId)
        this.findRoomAllMessage(this.currentRoomId)
        // alert(this.currentRoomId)
        this.allRooms = data
      })
    },
    // 通过id查找机房的设备信息
    // findAllMessages(id) {
    //   // alert(id)
    //   axios.get('/api_room_monitor/get_types_in_room?room_id='+id).then(({data})=>{
    //     console.log(data)
    //     data.map((item)=>{
    //       if(item.devicetype_name === '温湿度') {
    //         this.id1 = item.devicetype_id
    //         console.log('要查找的机房的温湿度的id为',this.id1)
    //         // this.findRoomAllMessage(this.id1)
    //         // 通过获得到的温湿度的id找到温湿度的数据
    //         if(this.id1 !== 0){
    //           this.findHumitureMessage(this.id1)
    //         } else {
    //           this.$notify.error({
    //             title: '错误',
    //             message: '无温湿度信息'
    //           })
    //         }
    //       }
    //     })
    //   }).catch(()=>{

    //   })
    // },
    // 获取所有的报警信息
    getAllAlarms() {
      axios.get('/api_alarm/get_current_alarm/').then(({ data }) => {
        // console.log('data',data)
        this.alarmCount = data.alarm_total
        // console.log(this.alarmCount)
      }).catch(() => {

      })
    },
    // 获取所有的未审批
    getAllExamine() {
      axios.get('/api_approval/get_approval_list/').then(({ data }) => {
        data.result.map((item) => {
          // alert(1)
          if (item.approval_status === '未审批') {
            this.examineCount.push(item.approval_status)
          }
        })
        this.examineCount1 = this.examineCount.length
      }).catch(() => {

      })
    },
    // 获取当前时间
    getCurrentTime() {
      const date = new Date()
      // console.log(date)
      // alert(1)
      const year = date.getFullYear()
      let month = date.getMonth() + 1
      month = this.addZero(month)
      let day = date.getDate()
      day = this.addZero(day)
      let hours = date.getHours()
      hours = this.addZero(hours)
      let minutes = date.getMinutes()
      minutes = this.addZero(minutes)
      let seconds = date.getSeconds()
      seconds = this.addZero(seconds)
      this.currentTime = year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds
      // console.log(this.currentTime)
    },
    addZero(num) {
      return num < 10 ? '0' + num : num
    },
    // 设置时间的定时器
    timeSetInterval() {
      setInterval(() => {
        this.getCurrentTime()
      }, 1000)
    },
    // 获取首页信息,获取温湿度信息
    findRoomAllMessage(id) {
      // this.currentRoomId = id
      // alert(id)
      axios.get('api_room_monitor/getSimpleIndexData/?room_id=' + id).then(({ data }) => {
        this.simpleBaseData = data
        this.humitureArray = data.thData
        // console.log('humitureArray',this.humitureArray)
        if ((this.humitureArray[0].data.length !== 0) || (this.humitureArray[1].data.length !== 0)) {
          this.temperature = this.humitureArray[0].data
          this.temperature.map((item) => {
            //  console.log('====',item[1])
            this.temperature1.push(item[1])
          })
          // console.log('温度',this.temperature)
          this.humidity = this.humitureArray[1].data
          this.humidity.map((item) => {
            this.humidity1.push(item[1])
          })
          // console.log('湿度',this.humidity)
          //  alert(this.humidity1)
          this.humidity.map((item) => {
            this.temperatureTimes.push(item[0])
          })
          this.temperatureTimes.map((item) => {
            this.temperatureTimes1.push(item.split('T'))
          })
          this.temperatureTimes1.map((item) => {
            this.temperatureTimes2.push(item[1])
          })
        } else {
          this.temperature1 = []
          this.humidity1 = []
        }
        this.drawVis1()
      }).catch(() => {

      })
    },
    drawVis1() {
      var myChart = echarts.init(document.getElementById('container'))
      myChart.setOption({
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['温度', '湿度']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        // toolbox: {
        //   feature: {
        //     saveAsImage: {}
        //   }
        // },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: this.temperatureTimes2
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: '温度',
            type: 'line',
            stack: '总量',
            data: this.temperature1
          },
          {
            name: '湿度',
            type: 'line',
            stack: '总量',
            data: this.humidity1
          }
        ]
      })
    }
  }
}
</script>

<style scoped>
  .video {
    padding: .5em;
    overflow-y:auto;
    background-color: #304156
  }
  .video .top {
    width: 100%;
    height: 57px;
    background-color: aqua;
    overflow: hidden;
  }
  .video .top .left {
    width: 22%;
    height: 100%;
    /* background-color: beige; */
    box-sizing: border-box;
    float: left;
  }
  .video .top .left img {
    width: 12%;
    margin-left: 4%;
    margin-top: 1.5%;
    float: left;
  }
  .video .top .left span {
    display: inline-block;
    margin-top: .8em;
    margin-left: 1em;
    font-size: 18px;
    float: left;
  }
  .video .top .rooms {
    width: 54%;
    height: 100%;
    box-sizing: border-box;
    float: left;
  }
  ul,li{
    list-style: none;
    padding: 0;
    margin: 0
  }
  .video .top .rooms ul {
    /* width: 20px; */
    height: 100%;
    width: 100%;
    /* margin: 0 auto; */
    /* overflow: hidden; */
    text-align: center;
  }
  .video .top .rooms ul li {
    /* float: left; */
    display: inline;
    cursor: pointer;
    /* margin-top: 1em; */
    line-height: 59px;
  }
  .video .top .rooms ul li:not(:last-child){
    margin-right: 1em
  }
  .video .top .right {
    width: 23%;
    height: 100%;
    /* background-color: blueviolet; */
    box-sizing: border-box;
    float: right;
  }
  .video .top .right .badgeDiv{
    /* float: right;
    margin-top: .8em;
    margin-right: .5em */
    display: inline-block;
    line-height: 59px
  }
  .video .top .right .badgeDiv:not(:first-child){
    margin-right: 1em
  }
  .video .middle {
    height: 617px;
    width: 100%;
    margin-bottom: .5em;
    margin-top: .5em;
    background-color: blueviolet
  }
  .video .middle .middle_top {
    height: 54px;
    width: 100%;
    overflow: hidden;
    /* background-color: darkkhaki */
  }
  .video .middle .middle_top div {
    float: left;
    height: 100%
  }
  .video .middle .middle_top .one {
    width: 80%;
    float: left;
    background-color: #254598;
    border-radius: 10px;
    margin-left: 0.3%;
  }
  .video .middle .middle_top .one span {
    font-size: 22px;
    color: #fff;
    font-weight: lighter;
    margin-left: 5%;
    line-height: 54px;
    /* margin-top: 2%; */
    /* display: inline-block */
  }
  .video .middle .middle_top .two {
    width: 19%;
    height: 100%;
    float: right;
    background-color: #1e6f09;
    border-radius: 10px;
    margin-right: 0.3%
  }
  .video .middle .middle_top .two span {
    font-size: 22px;
    color: #fff;
    font-weight: lighter;
    margin-left: 25%;
    line-height: 54px
  }
  .video .bottom {
    height: 257px;
    width: 100%;
    background-color: cornflowerblue
  }
</style>
