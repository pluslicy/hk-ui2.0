<template>
  <div class="electricity">
    <!-- 备电页面 -->
    <el-row :gutter="20">
      <el-col :span="6">
        <div class="electricity_left">
          <!-- 图片 -->
          <div class="electricity_img">
            <img :src="electricityDeviceDetail.device_imgpath" alt="" style="width:100%;">
          </div>
          <!-- 操作 -->
          <div class="electricity_operation">
            <div class="operation_one">
              <div class="operation_desc">延时关机时间(秒)：</div>
              <el-input-number v-model="num1" :min="0" size="mini"></el-input-number>
              <el-button type="primary" plain size="mini">保存</el-button>
            </div>
            <div class="operation_two">
              <div class="operation_desc">延时开机时间(秒)：</div>
              <el-input-number v-model="num2" :min="0" size="mini"></el-input-number>
              <el-button type="primary" plain size="mini">保存</el-button>
            </div>
            <div class="operation_three">
              <div class="operation_desc">蜂鸣器开关：</div>
              <el-button type="primary" plain size="mini">打开</el-button>
              <el-button type="primary" plain size="mini">关闭</el-button>
              <el-button type="primary" plain size="mini">静音</el-button>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="18">
        <div class="electricity_right" :style="he">
          <div v-for="(obj,index) in electricityDeviceDetail.dataitems" :key="index">
            <el-card class="card" shadow="always" :body-style="{padding:0}" v-for="(item,index) in obj.table" :key='index' @click="viewChart">
              <div class="name">{{item.dataitem_name}}</div>
              <div class="value">{{item.dataitem_value}}{{item.dataitem_unit}}</div>
            </el-card>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import service from '@/utils/request'
import $ from 'jquery'
export default {
  data(){
    return {
      // 备电详情
      electricityDeviceDetail: {},
      // 计数器
      num1:'',
      num2:'',
      // 备电列表高度
      he:'',
      electricityData:[]
    }
  },
  created(){
    this.he = 'height: ' + ($(window).height() - 275) + 'px;'
    this.findDeviceDetail()
    this.findAllconfigiteInfo()
  },
  methods:{
    // 查看图表
    viewChart(){
      
    },
    // 获取所有数据项信息
    findAllconfigiteInfo(){
      service.get('/api_room_monitor/get_configitem_info/?devicetype_id='+this.$parent.devicetype_id)
      .then(({data})=>{
        console.log(data)
        this.electricityData = data
      })
    },
    // 获取设备详情
    findDeviceDetail(){
      service.get('/api_device/list_device_detail/?device_id='+this.$parent.device_id)
      .then(({data})=>{
        console.log(data,'---------')
        if(data[0]){
          data[0].dataitems.forEach((obj)=>{
            if(obj.table&&obj.table.length>0){
              obj.table.forEach((item)=>{
                if(!item.dataitem_value){
                  item.dataitem_value = '--';
                }
              })
            }
          })
        }
        this.electricityDeviceDetail = data[0]
      })
    }
  }
}
</script>
<style scoped>
.electricity_img {
  margin-bottom: 2em;
}
.electricity_operation .operation_desc {
  font-size: .8em;
  margin: 1em 0;
}
.electricity_list {
  border: 1px solid #eedede;
  border-radius: 5px;
  width: 11px;
}
.electricity_right{
  overflow: auto;
}
.electricity_right .el-card {
  border-radius: 10px;
  width: 195px;
  float: left;
  margin: 5px;
}
.electricity_right .card .name {
  border-bottom: 1px solid #ededed;
  padding: 10px;
  text-align: center;
  font-size: .8em;
}
.electricity_right .card .value {
  padding: 10px;
  text-align: center;
  font-size: .8em;
}
</style>
