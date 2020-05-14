<template>
  <div v-if="page.list !== null && page.list.length > 0">
    <el-table :data="page.list" style="width: 81%; margin-left: 70px">
      <el-table-column prop="intro" label="组名" width="140" align="center" />
      <el-table-column prop="intro" label="简介" width="200" align="center" :show-overflow-tooltip="true" />
      <el-table-column label="交易信息" width="140" align="center">
        <template slot-scope="scope">
          <button class="table-btn" type="button" @click="getDeals(scope.row.id)">交易信息</button>
        </template>
      </el-table-column>
      <el-table-column label="是否公开" width="140" align="center">
        <template slot-scope="scope">
          <button class="table-btn" type="button" :style="{color: (scope.row.open === 0 ? 'orange' : 'green')}"
                  @click="updateOpen(scope)">
            {{scope.row.open === 0 ? '未公开' : '已公开'}}
          </button>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="150" align="center">
        <template slot-scope="scope">
          <button class="table-btn" type="button" @click="info(scope.$index)">详情</button>
          <button class="table-btn" type="button" @click="update(scope.$index)">更新</button>
        </template>
      </el-table-column>
    </el-table>
    <div class="row page-select">
      <el-pagination background :hide-on-single-page="true" layout="prev, pager, next, jumper"
                     :current-page.sync="page.pageNum" :page-size="page.pageSize" :total="page.total"
                     @current-change="currentChange">
      </el-pagination>
    </div>
    <el-dialog :append-to-body="true" v-if="dealGroupDialog.data !== null" :visible.sync="dealGroupDialog.visited"
               :title="dealGroupDialog.type === 'info' ? '交易组详情' : '更新交易组信息'">
      <el-form :model="dealGroupDialog.data">
        <el-form-item label="组名" label-width="120px">
          <el-input :readonly="dealGroupDialog.type === 'info'" v-model="dealGroupDialog.data.name" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="简介" label-width="120px">
          <el-input readonly type="textarea" :readonly="dealGroupDialog.type === 'info'"
                    v-model="dealGroupDialog.data.intro" placeholder="简介"/>
        </el-form-item>
        <el-form-item label="是否公开" label-width="120px">
          <el-switch v-if="dealGroupDialog.type === 'info'" v-model="dealGroupDialog.data.open === 1"
                     active-color="#13ce66"
                     inactive-color="#ff4949"/>
          <el-switch v-else :active-value="1" :inactive-value="0" v-model="dealGroupDialog.data.open"
                     active-color="#13ce66"
                     inactive-color="#ff4949"/>
        </el-form-item>
        <el-form-item label="备注" label-width="120px">
          <el-input :readonly="dealGroupDialog.type === 'info'" v-model="dealGroupDialog.data.remark"></el-input>
        </el-form-item>
        <el-form-item label="创建时间" label-width="120px">
          <el-date-picker readonly v-model="dealGroupDialog.data.created" type="datetime"></el-date-picker>
        </el-form-item>
        <el-form-item label="上次更新" label-width="120px">
          <el-date-picker readonly v-model="dealGroupDialog.data.updated" type="datetime"></el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button v-if="dealGroupDialog.type === 'update'" @click="dealGroupDialog">取 消</el-button>
        <el-button v-if="dealGroupDialog.type === 'update'" type="primary" @click="dialogOk">确 定</el-button>
        <el-button v-else type="primary" @click="dialogInit">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog :append-to-body="true" v-if="dealsDialog.data !== null" :visible.sync="dealsDialog.visited"
               :title="'交易记录详情'">
      <el-table :data="dealsDialog.data" style="width: 69%; margin: auto">
        <el-table-column prop="intro" label="简介" width="140" align="center" :show-overflow-tooltip="true" />
        <el-table-column label="交易信息" width="110" align="center">
          <template slot-scope="scope">
            {{scope.row.type === 1 ? '+' : '-'}} {{scope.row.money}}
          </template>
        </el-table-column>
        <el-table-column prop="dealTime" label="完成时间" width="140" align="center" />
        <el-table-column label="是否公开" width="110" align="center">
          <template slot-scope="scope">
            <button class="table-btn" type="button" :style="{color: (scope.row.open === 0 ? 'orange' : 'green')}">
              {{scope.row.open === 0 ? '未公开' : '已公开'}}
            </button>
          </template>
        </el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogInit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
  <div v-else style="text-align: center; margin-top: 100px">
    <span style="font-size: 20px; color: #cccccc">无数据</span>
  </div>
</template>

<script>
  import {pageGroups, modifyOpen, modify} from "@/api/dealGroup"
  import {dealsByGroup} from "@/api/deal";

  export default {
    name: "deal-group-list",
    mounted() {
      this.init(1);
    },
    data() {
      return {
        page: {
          pageNum: 0,
          pageSize: 0,
          total: 0,
          list: []
        },
        dealGroupDialog: {
          visited: false,
          data: null,
          type: null,
        },
        dealsDialog: {
          visited: false,
          data: null,
        },
      }
    },
    methods: {
      init(pageNum) {
        pageGroups(pageNum)
          .then(response => {
            if (response.code === 20000) {
              this.page = response.data;
            } else {
              this.$message.error('请求失败，请检查您的网络并重试');
            }
          });
      },
      currentChange(currPage) {
        pageGroups(currPage)
          .then(response => {
            this.page = response.data;
          });
      },
      getDeals(id) {
        dealsByGroup(id)
          .then(resp => {
            this.dealsDialog.data = resp.data;
            this.dealsDialog.visited = true;
          });
      },
      info(index) {
        this.dealGroupDialog.type = 'info';
        this.dealGroupDialog.data = this.page.list[index];
        this.dealGroupDialog.visited = true;
      },
      update(index) {
        this.dealGroupDialog.type = 'update';
        this.dealGroupDialog.data = this.page.list[index];
        this.dealGroupDialog.visited = true;
      },
      updateOpen(scope) {
        let index = scope.$index;
        let id = scope.row.id;
        let open = scope.row.open;
        let newOpen = open === 1 ? 0 : 1;
        modifyOpen({id, open: newOpen})
          .then(response => {
            this.page.list[index].open = newOpen;
            this.$notify({
              title: '成功',
              message: response.message,
              type: 'success'
            });
          });
      },
      dialogOk() {
        if (this.dealGroupDialog.type === 'update') {
          let data = this.dealGroupDialog.data;
          modify(data).then(resp => {
            this.$alert(resp.message, '提示', {
              confirmButtonText: '确定',
              callback: action => {
                if (resp.code === 20000) {
                  this.init(this.page.pageNum);
                }
              }
            });
          });
        }
        this.dialogInit();
      },
      dialogInit() {
        this.dealsDialog.data = null;
        this.dealsDialog.visited = false;
        this.dealGroupDialog.type = null;
        this.dealGroupDialog.data = null;
        this.dealGroupDialog.visited = false;
      }
    },
  }
</script>

<style lang="stylus">
  .dialog-body
    max-height 800px
    overflow auto
</style>
