<template>
  <div class="user">
    <div>用户布局</div>
    <!-- 组件调用 -->
    <user-data-table />
  </div>
</template>
<script>
import userDataTable from './DataTable.vue'
export default {
  components: {
    userDataTable
  },
  data() {
    return {

    }
  }
}
</script>
<style scoped>
  .user {
    margin: 1em;
    background: #ffffff;
    border-radius: 3px;
    min-height: 400px;
    padding: 1em;
  }
</style>
