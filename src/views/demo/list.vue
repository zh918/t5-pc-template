<template>
    <div class="home-container"> 
        外网（http://consul-omp-server-dev.kd1.pagoda.com.cn/api/human/person/list）数据：{{data}}
        <br/>
        内网（http://consul-omp-server-dev:9002/api/human/person/list）数据：{{data1}}
    </div>
</template>

<script>
import api from "@/services/demoLogic";
export default {
  data() {
    return {
      data: null,
      data1: null     
    }
  },
  created() {
    this.initData();
    this.initData1();
  },
  methods: {
    initData() {
      api.getDemoList().then(reulst => {
        this.data = reulst;
      });
    },
    initData1() {
      api.getDemoList1().then(reulst => {
        this.data1 = reulst;
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
