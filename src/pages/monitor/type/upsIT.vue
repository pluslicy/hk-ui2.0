<template>
  <div class="upsIT">
    <el-card v-for="item in allDeviceType" :key="item.name" class="box-card">
      <div class="text item">
        <div class="card_top">
          <span>{{ item.value }}</span>
        </div>
        <div class="card_bottom">
          <span>{{ item.name }}</span>
        </div>
      </div>
    </el-card>
  </div>
</template>
<style>
  .text {
    font-size: 14px;
  }
  .item {
    padding: 18px 0;
  }
  .box-card {
    background: white;
    width: 12%;
    min-height: 200px;
  }
  .el-card.is-always-shadow, .el-card.is-hover-shadow:focus, .el-card.is-hover-shadow:hover {
    box-shadow: 8px 8px 20px 0 #ccc;
  }
 .box-card {
    box-sizing: border-box;
    float: left;
    margin: 8px;
 }
 .card_top {
    width: 100%;
    height: 100px;
    background-color: #ecf5ff;
    float: left;
    text-align: center;
 }
 .card_top span{
    line-height: 100px;
    color: #969696;
    font-size: 15px;
    font-weight: bolder;
 }
 .card_bottom{
    width: 100%;
    height: 50px;
    float: left;
    opacity: 0.4;
    background-color: #b3d8ff;
    text-align: center;
 }
 .card_bottom span{
    line-height: 50px;
    font-size: 15px;
    color: black;
    font-weight: bolder;
 }
</style>
<script type="text/javascript">
import axios from '@/http/axios'
export default {
  data() {
    return {
      // 所有设备类型下的数据
      allDeviceType: [],
      device_id: ''
    }
  },
  created() {
    // this.loadAllDevice()
  },
  methods: {
    loadAllDeviceType() {
      axios.get('/api_room_monitor/get_configitem_info/', { params: { devicetype_id: 16 }}).then(({ data }) => {
        this.allDeviceType = data
      })
    },
    loadAllDevice() {
      const num = Number(this.device_id)
      axios.get('/api_room_monitor/get_current_data/', { params: { device_ids: num }}).then(({ data }) => {
        // console.log('====',data[0].data)
        this.allDeviceType = data[0].data
      })
    }
  }
}

</script>
