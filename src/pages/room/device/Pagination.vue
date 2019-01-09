<template>
  <!-- 设备管理分页 -->
  <div class="device_pagination">
    <el-pagination
      :page-size="1"
      :total="total"
      layout="total, prev, pager, next"
      @current-change="handleCurrentChange" />
      <!-- </el-pagination> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      total: 10,
      pagination: {

      }
    }
  },
  methods: {
    handleSizeChange(val) {
      console.log(1)
    },
    handleCurrentChange(val) {
      console.log(1)
    }
  }
}
</script>

<style scoped>
  .device_pagination {
    text-align: right;
  }
</style>
