<template>
  <div class="default-container">
    <div class="http-line"></div>
    <div class="view-top-container">
      <div class="left-top-box">保理系统</div>
      <div class="middle-top-box">
        <div class="nav-left">
            <i :class="isCollapse?'el-icon-s-unfold':'el-icon-s-fold'"  @click="()=>{this.isCollapse = !this.isCollapse;}"></i>
        </div>
      </div>
      <!-- <div class="right-top-box"><i class="el-icon-user-solid"></i> stephen&nbsp;<el-button type="info" size="mini" icon="el-icon-switch-button" circle @click="handleLoginOut"></el-button></div> -->
      <div class="right-top-box">
        <el-dropdown trigger="click">
          <span class="el-dropdown-link">
            <i class="el-icon-user-solid"></i>&nbsp;<span>stephen</span><i class="el-icon-caret-bottom el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item class="clearfix">
              修改密码
            </el-dropdown-item>
            <el-dropdown-item class="clearfix">
              <div @click="handleLoginOut">安全退出</div>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <div class="view-main-container">
        <div class="left-main-box" :class="isCollapse?'left-min-width':'left-max-width'">
            <left-menu :isCollapse="isCollapse" :isTabs="display==='tab'"></left-menu>
        </div>
        <div class="right-main-box">
            <div class="right-main-box-container">
              <div class="nav-container">
                  <div ref="nav_middle" class="nav-middle" v-if="display==='tab'">
                      <div class="nav-item" :class="item.actived?'nav-item-active':'nav-item-normal'" :key="index" v-for="(item,index) in tabs.list" @click="handleChooseTab(item)">
                          {{item.label}}<i class="el-icon-circle-close" @click.stop="handleDelTab(item)" v-if="index != 0"></i><span v-if="index == 0">&nbsp;</span>
                      </div>
                  </div>
                  <div v-else-if="display==='breadcrumb'">
                    <el-breadcrumb separator-class="el-icon-arrow-right" class="nav-breadcrumb">
                      <el-breadcrumb-item :key="index"  v-for="(item,index) in breadcrumbDataList">{{item.name}}</el-breadcrumb-item>
                    </el-breadcrumb>
                  </div>
                  <div class="nav-right" v-if="display==='tab' && isMove">
                    <i class="el-icon-caret-left" @click="handleMoveTabToLeft"></i>
                    <i class="el-icon-caret-right" @click="handleMoveTabToRight"></i>
                  </div>
              </div>
              <div class="right-main-router-view-box">
                  <router-view></router-view>
              </div>

            </div>
        </div> 
    </div>	 
  </div>
</template>

<script>
import { mapState } from "vuex";    
import leftMenu from './block/leftMenu'

export default {
  data() {
    return {
      // true:菜单折叠 false:菜单打开
      isCollapse: false, 
      // 页面打开方式 tab、breadcrumb
      display: 'tab',
      isMove: true
      // keepAlive:this.$store.state.tabs.list.find(t=>t.path == this.$route.path).meta.keepAlive || false
    }
  },
  computed: {
    ...mapState([ "tabs" ]),
    breadcrumbDataList() {
      return this._filterRouterForBreadcrumb();
    }
  },
  components: {
    leftMenu
  },
  mounted() { 
    this.initData();  
  },
  methods: {
    initData() {
      this._autoMoveLeftRightOperator();
    },
    _filterRouterForBreadcrumb() {
      let _this = this;
      let breadcrumbData = [];
      let currentRouter = this.tabs.list.find(t => t.actived);
      let routes = this.$router.options.routes;
      let splitRouter = currentRouter.path.split('/');

      for (let i = 2; i <= splitRouter.length; i++) {
        let tempPath = splitRouter.slice(0, i).join('/');
        _pushRouter(tempPath);
      }
        
      function _pushRouter(path) {
        routes.forEach((r, i) => {
          if (r.path === path) {
            // 直接定位到目录
            breadcrumbData.push({name: r.name, path: r.path, isJump: false});
          } else if (r.children.length > 0) {
            r.children.forEach((c, k) => {
              if (c.path === path) {
                breadcrumbData.push({name: c.name, path: c.path, isJump: true});
              }
            });
          }
        });
      }
      
      
      return breadcrumbData;
    },
    handleChooseTab(item) {
      $TabHelper.open({...item}).then(() => {
        this._autoMoveLeftRightOperator();
      });
    },
    handleDelTab(item) {
      this.$store.dispatch('tabs/delTab', {...item}).then(result => {
        $TabHelper.open({...result}).then((_) => {
          $TabHelper.delFilter(item.value);
          this._autoMoveLeftRightOperator();
        });
      }) 
    },
    handleLoginOut() {
      $Data.remove([]);
      this.$router.push({path: '/login'});
    },
    handleMoveTabToLeft() {
      this.$refs.nav_middle.scrollLeft -= 50;
      // console.log('left', this.$refs.nav_middle.scrollWidth, this.$refs.nav_middle.offsetWidth, this.$refs.nav_middle.clientWidth)
    },
    handleMoveTabToRight() {
      this.$refs.nav_middle.scrollLeft += 50;
    },
    _autoMoveLeftRightOperator() {
      let flag = this.$refs.nav_middle.scrollWidth !== this.$refs.nav_middle.clientWidth;
      console.log(this.$refs.nav_middle.scrollWidth, this.$refs.nav_middle.offsetWidth, this.$refs.nav_middle.clientWidth)
      console.log(flag)
      this.isMove = flag
    }
  }
}
</script>

<style lang="less">
    .default-container {
        position: relative;
        width: 100%;
        height: 100%;
        // background: url('../../assets/bg.png') no-repeat;
        // background-size: cover;

        .view-top-container {
            display: flex;
            width: 100%;
            /* height: 80px;  */
            height: 56px;
            // background-color: #304156;
            background-color: #333;
            justify-content: space-between;

            .left-top-box {
              padding-left: 20px;
              width:240px;
              height:56px;
              font-size:16px;
              font-family:MicrosoftYaHei-Bold,MicrosoftYaHei;
              font-weight:bold;
              color:rgba(255,255,255,1);
              line-height:56px;
            }

            .middle-top-box {
                flex: 1;
                height: 80px;
                line-height: 80px; 

                .nav-left { 
                  width:24px;
                  height:56px;
                  line-height: 56px;
                  i {
                    font-size: 24px;
                    color: #fff;
                    vertical-align: middle;
                  }
                }
            }

            .right-top-box {
                flex: 0.2;
                padding-right: 20px;
                width:84px;
                height:56px;
                font-size:12px;
                font-family:MicrosoftYaHei;
                color: #fff;
                line-height:56px;
                text-align: right;

                i,span {
                    font-size: 12px;
                    color: #fff;
                    cursor: pointer;
                }
            }
        }

        .view-main-container { 
            display: flex;
            position: absolute;
            top: 56px;
            bottom: 0;
            left: 0;
            right: 0; 
            margin: 0;
            padding: 0;
            overflow: auto;
            // border: 1px solid red;

            .left-main-box { 
                width: 240px;
                height: 100%;
                // margin-right: 10px;
                overflow-y: auto;
                // border: 1px solid #ccc;
                // background-color: #304156;
                
                background-color: #3A3A3A;
            }

            .left-max-width {
                -webkit-animation:left-width-min-to-max-keyframes 1s 1 cubic-bezier(.23,1,.32,1);
                animation:left-width-min-to-max-keyframes 1s 1 cubic-bezier(.23,1,.32,1);
                -webkit-animation-fill-mode:both;
                animation-fill-mode:both;
            }

            .left-min-width {
                -webkit-animation:left-width-max-to-min-keyframes 1s 1 cubic-bezier(.23,1,.32,1);
                animation:left-width-max-to-min-keyframes 1s 1 cubic-bezier(.23,1,.32,1);
                -webkit-animation-fill-mode:both;
                animation-fill-mode:both;
            }

            @-webkit-keyframes left-width-min-to-max-keyframes {
                0% {  
                    width:64px;
                }
                
                100% {  
                    width: 240px;
                }
            }

            @-webkit-keyframes left-width-max-to-min-keyframes {
                0% {  
                    width: 240px;
                }
                
                100% {  
                    width:64px;
                }
            }
              
            .right-main-box { 
                position: relative;
                flex: 1;
                height: 100%;
                padding: 10px 20px;
                background-color: #EBEEF5;
                overflow: auto;

                .right-main-box-container {
                  width: 100%;
                  height: 100%;
                  background-color: #fff;
                }

                .nav-container {
                    position: relative;
                    // display: flex;
                    width: 100%;
                    height: 40px;   
                    background-color: #EBEEF5;

                    .nav-middle {
                        width: calc(100%-64px);
                        display: -webkit-box;
                        align-items: flex-start;
                        overflow-x: auto;
                        overflow-y: hidden;
                        scrollbar-width: none;
                        -ms-overflow-style: none;
                    }

                    .nav-middle::-webkit-scrollbar {
                      display: none; /* Chrome Safari */
                    }
                   

                    .nav-item {
                      position: relative;
                      padding: 0 30px 0 15px;
                      min-width: 80px;
                      height: 40px;
                      line-height: 40px;
                      text-align: center;
                      font-size: 12px;
                      justify-content: space-between;
                      align-items: center;
                      
                      font-family:MicrosoftYaHei;
                      cursor: pointer;
 
                      i {
                        position: absolute;
                        right: 10px;
                        bottom: 0;
                        top: 13px;
                        font-size: 12px;
                        z-index: 100;
                      }
                    }

                    .nav-item:first-child {
                      padding: 0 30px;
                    }

                    .nav-item-normal {
                      border-top: 1px solid #EBEEF5;
                      border-bottom: 1px solid #EBEEF5;
                      border-right: 1px solid #EBEEF5;
                      color: #999;
                      background-color: #fff;
                      i {
                        color: #999;
                      }
                    }

                    .nav-item-active {
                      color: #409EFF;
                      background-color: #fff;
                      border-top: 2px solid #409EFF;
                      border-right: 1px solid #EBEEF5;
                      i {
                        top: 12px;
                        color: #409EFF;
                      }
                    }

                    .nav-right {
                      // display: flex;
                      position: absolute;
                      top: 0;
                      right: 0;
                      width: 64px;
                      height: 40px;
                      line-height: 40px;
                      text-align: center;
                      border: 1px solid #EBEEF5;
                      align-items: center;
                      justify-content: space-evenly;
                      background-color: #fff;
                      z-index: 2000;

                      i {
                        font-size: 14px;
                        color: #999;
                        cursor: pointer;
                      }
                    }

                }

                .right-main-router-view-box {
                    background-color: #fff;
                    padding: 10px 20px;
                }
            }

            .right-main-box::-webkit-scrollbar {
              display: none; /* Chrome Safari */
            }
        } 

        .nav-breadcrumb {
          height: 38px;
          line-height: 28px;
          margin-left: 38px;
          font-size: 13px;
        }
    }
</style>

  
