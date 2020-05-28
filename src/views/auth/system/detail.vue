<template>
  <div>
    <el-cell-container>
      <el-title>基本信息</el-title>
      <el-cell title="系统编号">
        <el-label :value="detail.CODE"></el-label>
      </el-cell>
      <el-cell title="系统名称">
        <el-label :value="detail.NAME"></el-label>
      </el-cell>
      <el-cell title="有效期开始日期">
        <el-label :value="detail.BEGIN_TIME"></el-label>
      </el-cell>
      <el-cell title="有效期结束日期">
        <el-label :value="detail.END_TIME"></el-label>
      </el-cell>
      <el-cell title="状态">
        <el-label :value="detail.STATUS"></el-label>
      </el-cell>
    </el-cell-container>
  </div>
</template>

<script>
  import api from '@/services/systemLogic'

  export default {
    data() {
      return {
        detail: {
          CODE: null,
          NAME: null,
          BEGIN_TIME: null,
          END_TIME: null,
          CREATED_TIME: null,
          STATUS: null
        },
        flag:false,
      }
    },
    created() {
      this.initData();
    },
    methods: {
      initData() {
        api.systemFind({code: this.$route.query.code}).then(result=>{
          if (result.code == 1) {
            this.detail = result.data;
            this.flag = !this.flag;
          }
          else {
            this.$message({type: 'error', message: `加载失败!${result.msg}`});
          }
        });
      }
    },
    watch: {
      // 如果路由有变化，会再次执行该方法
      '$route': 'initData'
    },
  }
</script>