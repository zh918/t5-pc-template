<template>
    <div class="home-container"> 
        数据：{{data}}
        <!-- <br/>
        内网（http://consul-omp-server-dev:9002/api/human/person/list）数据：{{data1}} -->
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
    // this.initData1();
  },
  methods: {
    initData() {
      let parms = {
        name: "stephen",
        age: 8,
        other: {
          address: "中国北京"
        }
      }
      api.getDemoList(parms).then(reulst => {
        this.data = reulst;
      });
    },
    initData1() {
      let parms = {
        name: "拾光",
        age: 18,
        other: {
          address: "中国海南"
        }
      }

      api.getDemoList1(parms).then(reulst => {
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
