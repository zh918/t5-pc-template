<template>
    <div class="home-container">
        <div class="title">请求serverless-》302-》cas2-》前端页面</div>
        <el-button type="primary" @click="handleSubmit">模拟请求serverless</el-button>
        
    </div>
</template>

<script>
import api from "@/services/demoLogic";
export default {
  data() {
    return {
             
    }
  },
  methods: {
    handleSubmit() {
      api.getData().then(result => {
        console.log(result);
        location.href = result.redirect_url;
      });
    }
  }
}
</script>

<style lang="less" scoped>
    .home-container {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;

        .title {
            font-size: 30px;
        }
    }
</style>
