<template>
  <div class="about">
    关于我们
    <el-button @click="handleClick">open</el-button>
    <about-dialog :dialog-visible="dialogVisible"/>
  </div>
</template>
<script>
// import AboutDialog from './AboutDialog'
export default {
  components: {
    // aboutDialog: AboutDialog
  },
  data() {
    return {
      dialogVisible: false
    }
  },
  methods: {
    handleClick() {
      this.dialogVisible = true
    }
  }
}
</script>

<style scoped>
  .about {
    margin: 1em;
    background: #ffffff;
    border-radius: 3px;
    padding: 1em;
  }
</style>
