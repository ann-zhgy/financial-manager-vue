<template>
  <div v-if="page.list !== null && page.list.length > 0">
    <el-table :data="page.list" style="width: 100%">
      <el-table-column prop="intro" label="简介" width="140" align="center" :show-overflow-tooltip="true" />
      <el-table-column label="交易信息" width="110" align="center">
        <template slot-scope="scope">
          {{scope.row.type === 1 ? '+' : '-'}} {{scope.row.money}}
        </template>
      </el-table-column>
      <el-table-column prop="dealTime" label="完成时间" width="140" align="center" />
      <el-table-column label="是否公开" width="110" align="center">
        <template slot-scope="scope">
          <button class="table-btn" type="button" :style="{color: (scope.row.open === 0 ? 'orange' : 'green')}"
                  @click="updateOpen(scope)">
            {{scope.row.open === 0 ? '未公开' : '已公开'}}
          </button>
        </template>
      </el-table-column>
      <el-table-column label="所属交易组" width="150" align="center">
        <template slot-scope="scope">
          <button class="table-btn" type="button" @click="getDealGroupInfo(scope.row.dealGroup)">交易组信息</button>
        </template>
      </el-table-column>
      <el-table-column label="关联计划" width="150" align="center">
        <template slot-scope="scope">
          <button class="table-btn" type="button" @click="getPlanInfo(scope.row.planId)">计划信息</button>
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
    <el-dialog :append-to-body="true" v-if="dealDialog.data !== null" :visible.sync="dealDialog.visited"
               :title="dealDialog.type === 'info' ? '交易记录详情' : '更新交易信息'">
      <el-form :model="dealDialog.data">
        <el-form-item label="简介" label-width="120px">
          <el-input :readonly="dealDialog.type === 'info'" v-model="dealDialog.data.intro" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="交易金额" label-width="120px">
          <el-input :readonly="dealDialog.type === 'info'" v-model="dealDialog.data.money" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="交易类型" label-width="120px">
          <el-select v-if="dealDialog.type === 'info'" v-model="dealDialog.data.type">
            <el-option v-if="dealDialog.data.type === 1" :value="1" label="收入"/>
            <el-option v-if="dealDialog.data.type === 2" :value="2" label="支出"/>
          </el-select>
          <el-select v-else v-model="dealDialog.data.type">
            <el-option label="收入" :value="1"/>
            <el-option label="支出" :value="2"/>
          </el-select>
        </el-form-item>
        <el-form-item label="完成时间" label-width="120px">
          <el-date-picker :readonly="dealDialog.type === 'info'" value-format="yyyy-MM-dd" v-model="dealDialog.data.dealTime" type="date"/>
        </el-form-item>
        <el-form-item label="是否公开" label-width="120px">
          <el-switch v-if="dealDialog.type === 'info'" v-model="dealDialog.data.open === 1" active-color="#13ce66"
                     inactive-color="#ff4949"/>
          <el-switch v-else :active-value="1" :inactive-value="0" v-model="dealDialog.data.open" active-color="#13ce66"
                     inactive-color="#ff4949"/>
        </el-form-item>
        <el-form-item label="备注" label-width="120px">
          <el-input :readonly="dealDialog.type === 'info'" v-model="dealDialog.data.remark"></el-input>
        </el-form-item>
        <el-form-item v-if="dealDialog.type === 'update'" label="所属组" label-width="120px">
          <el-select v-model="dealDialog.data.dealGroup">
            <el-option v-for="item in dealDialog.data.groups" :label="item.name" :value="item.id"/>
          </el-select>
        </el-form-item>
        <el-form-item label="创建时间" label-width="120px">
          <el-date-picker readonly v-model="dealDialog.data.created" type="datetime"></el-date-picker>
        </el-form-item>
        <el-form-item label="上次更新" label-width="120px">
          <el-date-picker readonly v-model="dealDialog.data.updated" type="datetime"></el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button v-if="dealDialog.type === 'update'" @click="dialogInit">取 消</el-button>
        <el-popconfirm v-if="dealDialog.type === 'update'" confirmButtonText='确定' cancelButtonText='取消'
                       icon="el-icon-info" iconColor="red"
                       title="更新后，与其关联的计划的部分信息也会更新，继续？" @onConfirm="dialogOk" @onCancel="dialogInit">
          <el-button type="primary" slot="reference">确 定</el-button>
        </el-popconfirm>
        <el-button v-else type="primary" @click="dialogInit">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog :append-to-body="true" v-if="planDialog.data !== null" :visible.sync="planDialog.visited"
               title="关联计划详情">
      <el-form :model="planDialog.data">
        <el-form-item label="计划名称" label-width="120px">
          <el-input readonly v-model="planDialog.data.name" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="计划简介" label-width="120px">
          <el-input readonly v-model="planDialog.data.intro" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="交易金额" label-width="120px">
          <el-input readonly v-model="planDialog.data.money" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="交易类型" label-width="120px">
          <el-select>
            <el-option v-if="planDialog.data.type === 1" label="收入"/>
            <el-option v-if="planDialog.data.type === 2" label="支出"/>
          </el-select>
        </el-form-item>
        <el-form-item label="开始时间" label-width="120px">
          <el-date-picker readonly v-model="planDialog.data.beginTime" type="date"/>
        </el-form-item>
        <el-form-item label="结束时间" label-width="120px">
          <el-date-picker readonly v-model="planDialog.data.endTime" type="date"/>
        </el-form-item>
        <el-form-item label="计划状态" label-width="120px">
          <el-select v-model="planDialog.data.status">
            <el-option v-if="planDialog.data.status === 1" :value="1" label="已完成"/>
            <el-option v-if="planDialog.data.status === 2" :value="2" label="未完成"/>
            <el-option v-if="planDialog.data.status === 3" :value="3" label="已取消"/>
          </el-select>
        </el-form-item>
        <el-form-item v-if="planDialog.data.status === 1" label="完成时间" label-width="120px">
          <el-date-picker readonly v-model="planDialog.data.dealTime" type="date"/>
        </el-form-item>
        <el-form-item label="是否公开" label-width="120px">
          <el-switch v-model="planDialog.data.open === 1" active-color="#13ce66" inactive-color="#ff4949"/>
        </el-form-item>
        <el-form-item label="备注" label-width="120px">
          <el-input readonly :value="planDialog.data.remark"/>
        </el-form-item>
        <el-form-item label="创建时间" label-width="120px">
          <el-date-picker readonly v-model="planDialog.data.created" type="datetime"/>
        </el-form-item>
        <el-form-item label="上次更新" label-width="120px">
          <el-date-picker readonly v-model="planDialog.data.updated" type="datetime"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogInit">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog :append-to-body="true" v-if="dealGroupDialog.data !== null" :visible.sync="dealGroupDialog.visited"
               title="交易组详情">
      <el-form :model="dealGroupDialog.data">
        <el-form-item label="组名" label-width="120px">
          <el-input readonly v-model="dealGroupDialog.data.name" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="交易组简介" label-width="120px">
          <el-input readonly type="textarea" v-model="dealGroupDialog.data.intro" placeholder="简介"/>
        </el-form-item>
        <el-form-item label="是否公开" label-width="120px">
          <el-switch v-model="dealGroupDialog.data.open === 1" active-color="#13ce66" inactive-color="#ff4949"/>
        </el-form-item>
        <el-form-item label="备注" label-width="120px">
          <el-input readonly v-model="dealGroupDialog.data.remark"></el-input>
        </el-form-item>
        <el-form-item label="创建时间" label-width="120px">
          <el-date-picker readonly v-model="dealGroupDialog.data.created" type="datetime"></el-date-picker>
        </el-form-item>
        <el-form-item label="上次更新" label-width="120px">
          <el-date-picker readonly v-model="dealGroupDialog.data.updated" type="datetime"></el-date-picker>
        </el-form-item>
      </el-form>
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
  import {pageDeals, modify, modifyOpen} from "@/api/deal"
  import {group, groups} from "@/api/dealGroup"
  import {plan} from "@/api/plan"

  export default {
    name: "deal-list",
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
        },
        planDialog: {
          visited: false,
          data: null,
        },
        dealDialog: {
          visited: false,
          data: null,
          type: null,
        },
      }
    },
    methods: {
      init(pageNum) {
        pageDeals(pageNum)
          .then(response => {
            if (response.code === 20000) {
              this.page = response.data;
            } else {
              this.$message.error('请求失败，请检查您的网络并重试');
            }
          });
      },
      currentChange(currPage) {
        pageDeals(this.$store.getters.id, currPage)
          .then(response => {
            this.page = response.data;
          });
      },
      getDealGroupInfo(groupId) {
        if (groupId !== null) {
          group(groupId)
            .then(resp => {
              this.dealGroupDialog.data = resp.data;
              this.dealGroupDialog.visited = true;
            });
        } else {
          this.$notify.warning('这条记录没有交易组信息');
        }
      },
      getPlanInfo(planId) {
        if (planId !== null) {
          plan(planId)
            .then(resp => {
              this.planDialog.data = resp.data;
              this.planDialog.visited = true;
            });
        } else {
          this.$notify.warning('这条记录没有关联计划');
        }
      },
      info(index) {
        this.dealDialog.data = this.page.list[index];
        this.dealDialog.type = 'info';
        this.dealDialog.visited = true;
      },
      update(index) {
        groups()
          .then(resp => {
            this.dealDialog.data = this.page.list[index];
            this.dealDialog.data.groups = resp.data;
            this.dealDialog.type = 'update';
            this.dealDialog.visited = true;
          });
      },
      updateOpen(scope) {
        let index = scope.$index;
        let id = scope.row.id;
        let open = scope.row.open;
        let newOpen = open === 1 ? 0 : 1;
        modifyOpen({id, open: newOpen})
          .then(resp => {
            if (resp.code === 20000) {
              this.$notify.success(resp.message);
              this.page.list[index].open = newOpen;
            } else {
              this.$notify.success('设置公开失败');
            }
          });
      },
      dialogOk() {
        if (this.dealDialog.type === 'update') {
          let data = this.dealDialog.data;
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
        this.dealDialog.type = null;
        this.dealDialog.data = null;
        this.dealDialog.visited = false;
        this.dealGroupDialog.data = null;
        this.dealGroupDialog.visited = false;
        this.planDialog.data = null;
        this.planDialog.visited = false;
      }
    },
  }
</script>
