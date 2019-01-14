<template>
  <div class="about">
    关于我们
    <el-button @click='handleClick'>open</el-button>
    <about-dialog :dialogVisible="dialogVisible"/>
  </div>
</template>
<script>
import AboutDialog from './AboutDialog'
export default {
  data(){
    return {
      dialogVisible:false
    }
  },
  components:{
    aboutDialog:AboutDialog
  },
  methods:{
    handleClick(){
      this.dialogVisible = true;
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
