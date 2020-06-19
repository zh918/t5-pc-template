<template>
  <div class="left-menu-container">
    <el-menu
      default-active="1-4-1"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      :collapse="isCollapse"
      background-color="#3A3A3A"
      text-color="#FFFFFF"
      active-text-color="#409EFF"
    >
      <el-submenu
        :key="index"
        :index="item.id"
        v-for="(item, index) in menu">
        <template slot="title">
          <i class="el-icon-setting"></i>
          <span class="el-menu-item-12" slot="title">{{ item.name }}</span>
        </template>
        <el-menu-item
          :key="'item_'+n"
          class="el-menu-item-12"
          :index="m.id"
          @click="handleChooseMenu(m.path,m)"
          v-for="(m, n) in item.children"
          >{{ m.name }}</el-menu-item
        >
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
import shortid from "shortid";
import api from "@/services/commonLogic";

export default {
  name: "leftMenu",
  props: [ "isCollapse", "isTabs" ],
  data() {
    return {
      menu: []
    };
  },
  created() {
    this.initData();
  },
  methods: {
    initData() {
      api.getMenu().then(result => {
        if (result.trees) {
          this.menu = result.trees;
        } 
      });
    },
    initData1() {
      let parms = {
        clientId: "bgyfactorOmp",
        userCode: $Data.get("userCode")
      };

      api.getMenu(parms).then(result => {
        if (result.errorCode === 0) {
          this.menu = result.data.children;
        } else {
          this.$message.error(result.errorMsg);
        }
      });
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    handleChooseMenu(path, menu) {
      if (this.isTabs) {
        $TabHelper.open({ path: path });
      } else {
        // 清空检索栏缓存数据
        let routes = this.$router.options.routes;
        let key = _pushRouter(menu.path, routes);
        console.log(key);

        $TabHelper.delFilter(key);
        $TabHelper.open({ path: path });

        

      }
    }
  }
};

function _pushRouter(path, routes) {
  let uid = null;
  routes.forEach((r, i) => {
    if (r.path === path) {
      // 直接定位到目录
      uid = r.meta.key;
    } else if (r.children.length > 0) {
      r.children.forEach((c, k) => {
        if (c.path === path) {
          uid = c.meta.uid;
        }
      });
    }
  });

  return uid;
}

</script>

<style lang="less" scoped>
.left-menu-container {
  width: 100%;
  i {
    color: #bfcbd9;
  }

  .el-menu-item-13 {
    // font-size: 13px;
    font-family: PingFangSC,helvetica neue,hiragino sans gb,arial,microsoft yahei ui,microsoft yahei,simsun,"sans-serif";
    font-size: 14px;
  }

  .el-menu-item-12 {
    font-family:MicrosoftYaHei;
    font-size: 12px;
  }
}
</style>
