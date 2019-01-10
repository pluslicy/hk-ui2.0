<template>
  <div class="deviceType">
    <deviceTypeTable ref="deviceTypeTable" />
  </div>
</template>
<script>
import axios from '@/http/axios'
import deviceTypeTable from '@/pages/room/deviceType/deviceTypeTable.vue'
export default {
  components: {
    deviceTypeTable
  },
  data() {
    return {
    }
  },
  created() {
    this.load()
  },
  methods: {
    load() {
      axios.get('/api_devicetype/list_detail_devicetypes/')
        .then(({ data }) => {
          // console.log('---------', data)
        }).catch(() => {
          this.$notify.error({
            title: '错误',
            message: '这是一条错误的提示消息'
          })
        })
    }
  }
}
</script>
<style type="text/css">
.deviceType {
  margin: 1em;
  background: #ffffff;
  border-radius: 3px;
  padding: 1em;
}
.deviceType .deviceType_title {
  font-size: 18px;
  margin-bottom: 10px;
}
.el-dropdown-link {
  cursor: pointer;
  color: #409EFF;
}
.el-icon-arrow-down {
  font-size: 12px;
}
.deviceType i{
  margin: 10px;
}

</style>
