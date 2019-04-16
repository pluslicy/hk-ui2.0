<template>
  <div class="security">
    <!-- 安防 红外 -->
    <el-row :gutter="20">
      <el-col :span="10"><div class="security_img">
        <img src="@/assets/bg.png" alt="图片加载中..." style="height:100%;width:100%;border:1px solid #ededed;">
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
            label="浸水"
            align="center" />
        </el-table>
      </div></el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  data(){
    return {
      currentSecurity: []
    }
  }
}
</script>
<style scoped>
.security {

}
.security_img {
  height: 250px;
}
</style>

