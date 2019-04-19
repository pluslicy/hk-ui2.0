<!-- 声光报警器页面  by liuyr-->
<template>
  <div class="voiceAlarmCheck">
    <div class="top">
        <!-- <div class="imgDiv">
          <img height='216px' width="500px" :src='imgUrl' alt="图片正在加载中,请稍等...">
        </div>
        <div class="canvasDiv">
            <canvas id="voiceAlarmCanvas" :width="canvasWidth" height="216px"></canvas>
        </div>       -->
        <div class="voliceAlarm_img">
          <img height='216px' width="500px" :src='imgUrl' alt="图片正在加载中,请稍等...">
          <canvas id="voiceAlarmCanvas" :width="canvasWidth" height="250px" />
        </div>
        <div class="table">
          <el-table @row-click="changeVoiceDeviceId" height='216px' size='mini' border stripe ref="table" :data="voiceAllDeviceValueOfOne" style="width: 100%;cursor:pointer">
            <el-table-column align="center" prop="device_name" label="设备名称"></el-table-column>
            <el-table-column align="center" v-for='item in voiceTempForArr' :key='item.labelName' :prop="item.columnValue" :label="item.labelName"></el-table-column>
            <el-table-column align="center" prop="operation" label="操作" width="180px">
              <template slot-scope="scope">
                <el-button @click='voiceSetting(1,scope.row)' round size="mini">打开</el-button>
                <el-button @click='voiceSetting(0,scope.row)' round size="mini">关闭</el-button>
              </template>        
            </el-table-column>
          </el-table>    
        </div>
    </div>
    <div>
      <!-- 查询历史数据 -->
    <div class="voiceAlarm_history">
      <div class="voiceAlarm_historyform">
        <!-- <el-select v-model="query.device_id" clearable placeholder="请选择设备" size="mini">
          <el-option
            v-for="name in deviceNames"
            :key="name.device_id"
            :label="name.device_name"
            :value="name.device_id" />
        </el-select> -->
        <el-date-picker
          v-model="pickTime"
          value-format="yyyy-MM-dd HH:mm:ss"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          align="right"
          size="mini"
          clearable
          @change="queryChange" />
        <span @click="changeTimeByOption(1)" class="dataOptions optionDay">本天</span>
        <span @click="changeTimeByOption(2)" class="dataOptions optionWeek">本周</span>
        <span @click="changeTimeByOption(3)" class="dataOptions optionMonth">本月</span>
        <span @click="changeTimeByOption(4)" class="dataOptions optionQuarter">本季度</span>
      </div>
      <div class="voiceAlarm_history_data">
        <div id="waterBox" :style="he" />
      </div>
    </div>
    </div>
  </div>
</template>
<script>
import service from '@/utils/request'
import echarts from 'echarts'
import $ from 'jquery'
// let bp = conf.bp;
export default {
  data(){
    return {
      // 设备类型的数据项信息
      voiceDataItemsOfOneData:[],
      // 设备最新值的数据
      voiceAllDeviceValueOfOne:[],
      // 设备信息
      voiceAllDeviceOfOne:[],
      // 某一设备所有数据项历史数据信息
      voiceAllHistoryValueOfOne:[],
      // 设备详细信息
      voiceDeviceDetailsData:[],
      // 显示与隐藏
      showOperitems:false,
      // 本天、本周、本月、本季度的快捷选项
      pickerOptions: {
        shortcuts: [{
          text: '本天',
          onClick(picker) {
            picker.$emit('pick', this.time());
          }
        },{
          text: '本周',
          onClick(picker) {
            picker.$emit('pick', this.week());
          }
        },{
          text: '本月',
          onClick(picker) {
            picker.$emit('pick', this.month());
          }
        },{
          text: '本季度',
          onClick(picker) {
            picker.$emit('pick', this.quarter());
          }
        }]
      },
      searchTime:this.time(),
      voideDeviceId:'',
      allLineData:[],
      voiceInterval:null,
      canvasWidth:520,
      intervalTime:60000,
      imgUrl:'',
      // 查询参数
      query: {
        device_id: undefined,
        start_time: undefined,
        end_time: undefined
      },
      // 选择时间
      pickTime: [],
      he:''
    }
  },
  watch: {
    query: {
      handler: function() {
        this.findVoiceAllHistoryValueOfOne()
      },
      deep: true
    }
  },
  computed:{
    deviceImageUrl(){
      if(this.voiceAllDeviceOfOne&&this.voiceAllDeviceOfOne.length>0&&this.voideDeviceId){
        let currentDevice = this.voiceAllDeviceOfOne.filter((item)=>{
          return item.device_id == this.voideDeviceId;
        })
        return currentDevice[0].device_imgpath;
      }else{
        return '';
      }
    },
    // 折线图x轴
    lineXDateData(){
      if(this.voiceAllHistoryValueOfOne&&this.voiceAllHistoryValueOfOne.times){
        let tempArr = this.voiceAllHistoryValueOfOne.times;
        let arr = [];
        tempArr.forEach((item)=>{
          // 非IE
          if(new Date(item).getTime()){
            item = item;
          }else{
            // IE
            item = item.replace(/-/g,'/')
          }
          arr.push(new Date(item).getTime());
        });
        return arr;
      }else{
        return [];
      }
    },
    allData(){
      if(this.voiceAllHistoryValueOfOne&&this.voiceAllHistoryValueOfOne.datas){
        return this.voiceAllHistoryValueOfOne.datas;
      }else{
        return [];
      }
    },
    // 当前类型的设备id数组
    voiceDeviceIds(){
      if(this.voiceAllDeviceOfOne.length>0){
        // 获取id数组
        let tempIds = this.voiceAllDeviceOfOne.map((item)=>{
          return item.device_id;
        });
        return tempIds;
      }else{
        return [];
      }
    },
    // 设备的位置信息
    devicePosition(){
      let tempArr = [];
      if(this.voiceAllDeviceOfOne){
        this.voiceAllDeviceOfOne.forEach((item)=>{
          let obj = {
            x:item.pos.pos_x,
            y:item.pos.pos_y,
            text:item.device_name,
            device_imgpath:item.device_imgpath,
          };
          tempArr.push(obj);
        });
      }
      return tempArr;
    },
    // 动态的列名和数据
    voiceTempForArr(){
      let tempArr = [];
      if(this.voiceDataItemsOfOneData){
        for(let key in this.voiceDataItemsOfOneData){
          let obj = {
            labelName:this.voiceDataItemsOfOneData[key].dataitem_name,
            columnValue:'data['+key+'].value'
          };
          tempArr.push(obj);
        }
      }
      return tempArr;
    },
    voiceTableData(){
      let deviceValue = this.voiceAllDeviceValueOfOne;
      deviceValue.forEach((item)=>{
        if(item.data){
          item.data.forEach((temp)=>{
            // 0-停止  1-运转 
            if(temp.value=='1'){
              temp.value="运转";
            }else if(temp.value==0){
              temp.value="停止";
            }else{
              temp.value="-";
            }
          });
        }
      });
      if(this.voiceDataItemsOfOneData&&deviceValue){
        //  如果后台给的数据项的值为空，那么处理为值为0
        let tempArr = deviceValue;
        let tempObj = [];
        tempArr.forEach((item)=>{
          if(item.data.length>0){
            item.data.forEach((item)=>{
              let obj = {};
              for(let key in item){
                if(key=='value'){
                  obj[key] = '--';
                }else{
                  obj[key] = item[key];
                }
              }
              tempObj.push(obj);
            })
          }
        });
        tempArr.forEach((item)=>{
          if(item.data.length==0){
            item.data = tempObj;
          }
        });
        return tempArr;
      }
    },
  },  
  created(){
    this.th = 'height:'+($(window).height()-450).toString()+'px;';
    let vm = this;
    if (this.voiceInterval) {
      clearInterval(this.voiceInterval);
    }
    this.voiceInterval = setInterval(()=>{
      vm.findVoiceAllDeviceValueOfOne({params:{device_ids:'['+vm.voiceDeviceIds.join(',')+']'}}).then((time)=>{
        this.alterNewTime(time);
      });
    },this.intervalTime);
    setTimeout(()=>{
      if(this.roomId&&this.activeNavId){
        this.findVoiceAllDeviceOfOne().then(()=>{
          setTimeout(()=>{
            vm.toDraw();
          },500);
          if(this.voiceAllDeviceOfOne.length>0){
            this.voideDeviceId = this.voiceAllDeviceOfOne[0].device_id;
            this.findVoiceDeviceDetails({params:{device_id:this.voideDeviceId}}).then(()=>{
              this.showOperitems = true;
            });
          }
          this.findVoiceAllDeviceValueOfOne({params:{device_ids:'['+this.voiceDeviceIds.join(',')+']'}}).then((time)=>{
            // 通过设备id数组获取当前值成功
            this.alterNewTime(time);
          });
          if(this.activeNavId){
            this.findVoiceDataItemsOfOneData({params:{devicetype_id:this.activeNavId}}).then(()=>{
              // 通过设备类型查找数据项成功
              if(this.voiceDataItemsOfOneData.length>0&&this.voideDeviceId){
                this.searchChange();
              }
            });
          }
        });
      }
    },1000);
    this.findAllRoomsMessage()
    this.queryChange()
    this.pickTime = this.time()
  },
  // 销毁
  beforeDestroy(){
    clearInterval(this.voiceInterval);
  },
  mounted(){
    this.canvasWidth = $('.imgDiv img').width();
  },
  methods:{
    // 日期时间选择器确定时触发
    queryChange() {
      // this.query.device_id = this.$parent.device_id
      this.query.start_time = this.pickTime[0]
      // console.log(this.query.start_time)
      this.query.end_time = this.pickTime[1]
    },
    time(){
      let time = new Date();
      let now = time.getTime();
      let todayStart = time.getFullYear()+'-'+(time.getMonth()+1)+'-'+time.getDate()+'T'+'0:0:0'+'Z';
      let todayEnd = time.getFullYear()+'-'+(time.getMonth()+1)+'-'+time.getDate()+'T'+'23:59:59'+'Z';
      return([todayStart,todayEnd])
    },
    month(){
      let month = new Date();
      let monthStart = month.getFullYear()+'-'+(month.getMonth()+1)+'-'+1+' '+'0:0:0';
      // console.log(month.getMonth())
      if (month.getMonth() <= 10){
        var monthEnd = month.getFullYear()+'-'+(month.getMonth()+2)+'-'+1+' '+'0:0:0';
      } else {
        var monthEnd = (month.getFullYear()+1)+'-'+1+'-'+1+' '+'0:0:0';
      }
      return [monthStart,monthEnd];
    },
    week(){
      let now = new Date(); //当前日期 
      let nowDayOfWeek = now.getDay(); //今天本周的第几天 
      let nowDay = now.getDate(); //当前日 
      let nowMonth = now.getMonth(); //当前月 
      let nowYear = now.getYear()+1900; //当前年 
      let weekStartDate = new Date(nowYear, nowMonth, nowDay - nowDayOfWeek); 
      let weekEndDate = new Date(nowYear, nowMonth, nowDay + (7 - nowDayOfWeek)); 
      weekStartDate = timestampToTime(Date.parse(weekStartDate));
      weekEndDate = timestampToTime(Date.parse(weekEndDate));
      return [weekStartDate,weekEndDate];
    },
    quarter(){
      let now = new Date();
      let nowYear = now.getYear()+1900;//年
      let nowMonth = now.getMonth(); //当前月 
      let start = '';
      let end = '';
      if(nowMonth < 3){
        start = nowYear+'-1-1 0:0:0';
        end = nowYear+'-4-1 0:0:0';
      }else if (nowMonth >= 3 && nowMonth < 6){
        start = nowYear+'-4-1 0:0:0';
        end = nowYear+'-7-1 0:0:0';
      }else if(nowMonth >= 6 && nowMonth< 9){
        start = nowYear+'-7-1 0:0:0';
        end = nowYear+'-10-1 0:0:0';
      }else if (nowMonth >= 9){
        start = nowYear+'-10-1 0:0:0';
        end = (nowYear+1)+'-1-1 0:0:0';
      }
      return [start,end];
    },
    // 点击本天 本周 本月 本季度
    changeTimeByOption(option){
      if(option==1){
        this.pickTime = this.time();
      }else if(option==2){
        this.pickTime = this.week();
      }else if(option==3){
        this.pickTime = this.month();
      }else{
        this.pickTime = this.quarter();
      }
      this.searchChange();
    },
    // 点击表格的时候切换底下曲线图的设备
    changeVoiceDeviceId(row){
      this.voideDeviceId = row.device_id;
      this.searchChange();
    },
    // 设置打开还是关闭
    voiceSetting(value,row){
      let msg = '打开';
      if(value==0){
        msg = '关闭';
      }
      let obj = {
        device_code:row.device_code,
        operitem_code:this.voiceDeviceDetailsData.operitems.table[0].operitem_code,
        value:value
      };
      // 提示
      this.$confirm('确定继续该操作吗, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 传递给后台进行设置。设置完毕之后，查找
        this.updateVoiceDeviceOperitem(obj).then(()=>{
          // 操作成功，查找最新的数据
          this.findVoiceAllDeviceValueOfOne({params:{device_ids:'['+this.voiceDeviceIds.join(',')+']'}}).then((time)=>{
            this.alterNewTime(time);
            // 通过设备id数组获取当前值成功
            this.$notify({title:'成功',type:'success',message:'声光报警：'+msg});
          });
        }).catch((error)=>{
          this.$notify({title:'失败',type:'error',message:'操作失败!'});
        });
      }).catch(() => {
        this.$notify({title:'取消',type:'info',message:'已取消操作!'});         
      });
    },
    // 当绘制折线的条件改变时
    searchChange(){
      this.findVoiceAllHistoryValueOfOne({params:{
        start_time:this.searchTime[0],
        end_time:this.searchTime[1],
        device_id:this.voideDeviceId,
      }}).then((data)=>{
        // 查找历史数据成功，绘制
        setTimeout(()=>{
          this.drawFirst();
        },200);
      });
      // 查找设备的详细信息
      this.findVoiceDeviceDetails({params:{device_id:this.voideDeviceId}});
    },
    // 绘制位置
    toDraw(){
      // 获取节点
      let vm = this;
      let canvas = document.getElementById('voiceAlarmCanvas');
      let context = canvas.getContext('2d');
      context.fillStyle = 'block';
      context.lineWidth = 4;
      this.devicePosition.forEach((item)=>{
        let slicePath = item.device_imgpath.split('/images/devices/')[1];
        if(slicePath!=='default.png'){
          let image = new Image();
          image.src = item.device_imgpath;
          image.onload = function(){
            //绘制图像的函数
            context.drawImage(image,item.x/100*vm.canvasWidth,item.y/100*216,20,20);
          }
          context.fillText(item.text,item.x/100*vm.canvasWidth-10,item.y/100*216-10,100);

        }else{
          context.beginPath();
          context.arc(item.x/100*vm.canvasWidth,item.y/100*216,10,0,2*Math.PI);
          context.fill();
          context.fillText(item.text,item.x/100*vm.canvasWidth-15,item.y/100*216-15,100);
        }
      });
    },
    // 绘制
    drawFirst(){
      this.allLineData = [];
      // 封装数据
      if(this.allData&&this.allData.length>0){
        this.allData.forEach((item)=>{
          let tempObj = {
            name:item.name,
            step:'right',
          };
          if(item.data&&item.data.length>0){
            let tempArr = [];
            item.data.forEach((num,index)=>{
              tempArr.push([this.lineXDateData[index],num]);
            })
            tempArr.sort(function (x,y) {
              return x[0]-y[0];
            });
            tempObj.data = tempArr;
          }
          this.allLineData.push(tempObj);
        })
      }
      var chart = Highcharts.chart('windContainer', {
        chart: {
          zoomType: 'x',
        },
        title: {
            text: ''
        },
        xAxis: {
          type: 'datetime',
          dateTimeLabelFormats: {
            millisecond: '%H:%M:%S',
            second: '%H:%M:%S',
            minute: '%H:%M',
            hour: '%H:%M',
            day: '%m-%d',
            week: '%m-%d',
            month: '%Y-%m',
            year: '%Y'
          }
        },
        tooltip: {
          dateTimeLabelFormats: {
            millisecond: '%Y-%m-%d %H:%M:%S',
            second: '%Y-%m-%d %H:%M:%S',
            minute: '%Y-%m-%d %H:%M:%S',
            hour: '%Y-%m-%d %H:%M:%S',
            day: '%Y-%m-%d %H:%M:%S',
            week: '%Y-%m-%d %H:%M:%S',
            month: '%Y-%m-%d %H:%M:%S',
            year: '%Y-%m-%d %H:%M:%S'
          },
          pointFormatter: function() {
            let tempY = this.y==0?"停止":"运转";
              return this.series.name+': <b>'+ tempY +'</b>'
          },
        },
        yAxis: {
          lineWidth: 1,
          categories:['停止','运转'],
          title: {
            text: ''
          }
        },
        legend: {
          enabled: false
        },
        series:this.allLineData,
        credits:{
          enabled: false // 禁用版权信息
        },
        plotOptions: {
          series: {
            label: {
              connectorAllowed: false
            },
            marker: {
              enabled: false
            },
          },
          spline: {
            marker: {
              enabled: false
            },
          }
        },
        responsive: {
          rules: [{
            condition: {
              maxWidth: 500
            },
            chartOptions: {
              legend: {
                layout: 'horizontal',
                align: 'center',
                verticalAlign: 'bottom'
              }
            }
          }]
        },
      });
    },
    // 通过设备类型查找数据项
		findVoiceDataItemsOfOneData(obj){
      service.get('/api_room_monitor/get_configitem_info/',obj).then((data)=>{
        this.voiceDataItemsOfOneData = data
      })
    },
    // 获取指定设备的当前值，给后台一个设备id数组
		findVoiceAllDeviceValueOfOne(ids){
      let obj ={
        params: { device_ids: ids }
      }
      service.get('/api_room_monitor/get_current_data/',obj).then((data)=>{
        this.voiceAllDeviceValueOfOne=data.data
      }).catch(()=>{

      })
    },
    // 获取当前类型的所有设备信息
		findVoiceAllDeviceOfOne(){
      alert(1)
      service.get('/api_room_monitor/get_devices/',{
        params: {
          room_id: this.$parent.roomId,
          devicetype_id: this.$parent.devicetype_id
        }
      }).then((data)=>{
        this.voiceAllDeviceOfOne = data
        console.log('this.voiceAllDeviceOfOne',this.voiceAllDeviceOfOne)
        var idsArr = data.map((item) => {
            return item.device_id
          })
          var ids = idsArr.toString()
          console.log(ids)
          // this.query.device_id = ids
          this.findVoiceAllDeviceValueOfOne(ids)
          this.timer = setInterval(()=>{
            this.findVoiceAllDeviceValueOfOne(ids)
          },100000)
          setTimeout(() => {
            this.drawCanvas()
          }, 100)
      }).catch(()=>{

      })
    },
    // 获取某一设备的所有数据项的历史数据，给后台一个设备id和开始和结束时间
		findVoiceAllHistoryValueOfOne(){
      service.get('/api_room_monitor/get_device_data/', {
        params: this.query
      })
        .then(({ data }) => {
          alert(2)
          setTimeout(() => {
            this.drawwaterBox(data)
          }, 100)
        })
        .catch(() => {
          alert('不绘制')
        })
        .finally(() => {
        
        })
    },
    updateVoiceDeviceOperitem(obj){
      service.post('/api_room_monitor/operate_device/',obj).then((data)=>{

      }).catch(()=>{

      })
    },
    // 获取所有的机房的信息
    findAllRoomsMessage(){
      service.get('/api_room/list_all_room/?room_id=' + this.$parent.roomId).then((data)=>{
        console.log('=======',data)
        this.imgUrl=data.data[0].room_plane_imgpath
        console.log('===========',this.imgUrl)
      }).catch(()=>{

      })
    },
  }
}
</script>
<style scoped>
.voliceAlarm_img {
  /* background: #ccc; */
  width: 37%;
  height: 250px;
  float: left;
  position: relative;
}
.voliceAlarm_img #waterBoxCanvas {
  position: absolute;
  top: 0;
  left: 0;
}
.table {
  /* background: #223356; */
  margin-left: 38%;
  margin-bottom: 1em;
}
.voiceAlarm_history .voiceAlarm_historyform .dataOptions {
  cursor: pointer;
  margin-right: .5em;
  color: #fff;
  border-radius: 3px;
  padding: 3px;
  font-size: 14px;
}
.el-range-editor--mini.el-input__inner {
  position: relative;
  left: -523px;
}
.voiceAlarm_historyform span{
  position: relative;
  left: -500px
}
.voiceAlarm_history .voiceAlarm_historyform .optionDay {
  background: #409eff;
}
.voiceAlarm_history .voiceAlarm_historyform .optionWeek {
  background: #409eff;
}
.voiceAlarm_history .voiceAlarm_historyform .optionMonth {
  background: #409eff;
}
.voiceAlarm_history .voiceAlarm_historyform .optionQuarter {
  background: #409eff;
}
</style>