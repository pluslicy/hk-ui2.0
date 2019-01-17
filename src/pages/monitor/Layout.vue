<template>
  <div class="monitor">
    <div class="monitor_nav">
      <el-menu default-active="2" class="el-menu-vertical-demo" background-color="#F0F2F5">
        <el-menu-item index="2">
          <i class="el-icon-menu" />
          <span slot="title">导航二</span>
        </el-menu-item>
        <el-menu-item index="3">
          <i class="el-icon-document" />
          <span slot="title">导航三</span>
        </el-menu-item>
        <el-menu-item index="4">
          <i class="el-icon-setting" />
          <span slot="title">导航四</span>
        </el-menu-item>
      </el-menu>
    </div>
    <div class="monitor_content">
      内容
    </div>
  </div>
</template>
<style scoped>
.monitor {
  margin: 1em;
  background: #ffffff;
  border-radius: 3px;
  padding: 1em;
  min-height: calc(100vh - 84px);
  overflow: hidden;
}

.el-menu {
  border-right: 0
}

.monitor_nav {
  min-height: calc(100vh - 84px);
  width: 180px;
  float: left;
  background-color: #F0F2F5;
}

.monitor_content {
  min-height: calc(100vh - 84px);
  width: 90%;
  background-color: #F0F2F5;
  overflow: hidden;
  margin-left: 190px;
}

</style>
<script>
export default {
  methods: {}
}

</script>
