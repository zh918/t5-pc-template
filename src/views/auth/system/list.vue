<template> 
  <div>
    <el-data-container 
      :searchContainer="searchContainer" 
      @search="handleSearch" 
      :operatorContainer="operatorContainer" 
      :tableContainer="tableContainer" 
      :paginationContainer="paginationContainer">
      <template slot="operate" slot-scope="row">
        <div>
          <el-button type="text" @click="handleDetails(row.CODE)" size="mini">详情</el-button>
          <el-button type="text" size="mini">删除</el-button>
        </div>
      </template>
    </el-data-container>

    <!-- 弹出层 -->
    <el-dialog title="新增系统" 
      width="60%"
      :visible.sync="dialogVisibleSystem" 
      :modal-append-to-body="false" 
      :close-on-click-modal="false">
      <el-cell-container ref="frm_dialog_addsystem" :model="dialogFrm" :rules="rules" >
        <el-cell title='系统名称' icon="*" prop="NAME">
          <el-input v-model="dialogFrm.NAME" placeholder="请输入内容" size="small"></el-input>
        </el-cell>
        <el-cell title='有效期开始日期' icon="*" prop="BEGIN_TIME">
          <el-date-picker v-model="dialogFrm.BEGIN_TIME" type="date" value-format="yyyy-MM-dd" placeholder="选择日期" size="small"></el-date-picker>
        </el-cell>
        <el-cell title='有效期结束日期' icon="*" prop="END_TIME">
          <el-date-picker v-model="dialogFrm.END_TIME" type="date" value-format="yyyy-MM-dd" placeholder="选择日期" size="small"></el-date-picker>
        </el-cell>
        <el-cell title='状态' icon="*" prop="STATUS">
          <el-select v-model="dialogFrm.STATUS" clearable placeholder="请选择" size="small">
            <el-option label="启用" value="1"></el-option>
            <el-option label="禁用" value="0"></el-option>
          </el-select>
        </el-cell>
      </el-cell-container>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleSystem = false" size="mini">取 消</el-button>
        <el-button type="primary" @click="handleAddSystemSubmit('frm_dialog_addsystem')" size="mini" :loading="!flag.isAddSystemSubmit">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  import api from '@/services/systemLogic'

  export default {
    data() {
      return {
        // -----------------------标准1 开始-----------------------
        searchContainer: {
          isResetAutoSearch: false,
          itemSpan: 4,
          list: [
            { key: 'NAME', type: 'input', class: '', placeholder: '系统名称', value: '', fetch: '', cb: ''},
            { key: 'STATUS', type: 'select', class: '', placeholder: '系统状态', value: '', fetch: '', cb: '', options: [
              { value: '1', label: '启用' },
              { value: '0', label: '禁用' }
            ]},
            // { key: 'CREATE_DATE', type: 'date', class: '', placeholder: '创建时间', value: '', fetch: '', cb: ''},
          ]
        },
        operatorContainer: [
          { type: 'primary', text: '新增系统', cb: this.handleAddSystem}
        ],
        tableContainer: {
          selection:true,
          selectionChange: ()=>{},
          operate: {
            label: "操作",
            // fixed: "right",
            width: "100px",
            list: [
              // {
              //   type: 'primary',
              //   label: '删除',
              //   cb: this.handleDel
              // }
            ]
          },
          head: [
            {
              prop: "CODE",
              label: "系统编码"
            },
            {
              prop: "NAME",
              label: "系统名称"
            },
            {
              prop: "NAME",
              label: "系统名称"
            },
            {
              prop: "NAME",
              label: "系统名称"
            },
            {
              prop: "NAME",
              label: "系统名称"
            },
            {
              prop: "NAME",
              label: "系统名称"
            },
            {
              prop: "NAME",
              label: "系统名称"
            },
            {
              prop: "NAME",
              label: "系统名称"
            },
            {
              prop: "NAME",
              label: "系统名称"
            },
            {
              prop: "NAME",
              label: "系统名称"
            },
            {
              prop: "CREATED_TIME",
              label: "创建时间",
              width: "100px"
            },
            {
              prop: "STATUS",
              label: "状态"
            }
          ],
          data: []
        },
        paginationContainer: {
          pageNum: 1,
          total: 1
        },
        tempParms:null,
        // -----------------------标准1 结束-----------------------

        dialogVisibleSystem: false,
        dialogFrm: {
          NAME:'',
          BEGIN_TIME:'',
          END_TIME:'',
          STATUS:''
        },
        rules: {
          NAME: [
            { type:'string', required: true, message: '系统名称不能为空'}
          ],
          BEGIN_TIME: [
            { type:'string', required: true, message: '有效期开始不能为空'}
          ],
          END_TIME: [
            { type:'string', required: true, message: '有效期结束不能为空'}
          ],
          STATUS: [
            { type:'string', required: true, message: '系统状态不能为空'}
          ]
        },
        flag: {
          isAddSystemSubmit: true
        }


      }
    },
    created() {
      $TabHelper.initFilter(this.$route.meta.uid, (obj)=>{
        this._data.searchContainer = obj.searchContainer;
        this._data.paginationContainer = obj.paginationContainer;
      });
    },
    methods: {
      initData(parms) {
        api.systemQuery(parms).then(result=>{
          if (result.code == 1) {
            this.tableContainer.data = result.data.list;
            this.paginationContainer.pageNum = result.data.page.pageNum;
            this.paginationContainer.total = result.data.page.total;
          }
          else {
            this.$message.error(result.msg);
          }
        });
      },
      handleSearch(parms) {
        this.tempParms = parms;
        this.initData(parms);
      },
      handleAddSystem() { 
        this._clearDialogData();
        this.dialogVisibleSystem = true;
        // 清除表单验证状态
        this.$refs["frm_dialog_addsystem"].resetFields();
      },
      handleDel(row) {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      },
      handleAddSystemSubmit(frmName) {
        let _this = this;
        if (!this.flag.isAddSystemSubmit) return;
        this.flag.isAddSystemSubmit = false;

        // 校验表单
        this.$refs[frmName].validate(flag=>{
          if (!flag) {
            _this.flag.isAddSystemSubmit = true;
            return;
          }

          api.systemCreate(_this.dialogFrm).then(result=>{
            _this.flag.isAddSystemSubmit = true;
            if (result.code == 1) {
              _this.handleSearch(this.tempParms);
              _this.dialogVisibleSystem = false;
              _this.$message({type: 'success', message: '操作成功!'});
            }
            else {
              _this.$message({type: 'error', message: `操作失败!${result.msg}`});
            }
          });

        });
      },
      _clearDialogData() {
        this.dialogFrm = {
          NAME:'',
          BEGIN_TIME:'',
          END_TIME:'',
          STATUS:''
        };
      },
      handleDetails(code) {
        $TabHelper.open({ path: '/system/list/detail', query:{code}});
      }
    },
    beforeRouteLeave (to, from, next) {
        $TabHelper.setFilter(from.meta.uid, this._data);  
        next();
    }
    
  }
</script>