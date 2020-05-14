<template>
  <div v-if="list !== null && list.length > 0">
    <el-table :data="list" stripe style="width: 100%; max-height: 490px" infinite-scroll-disabled="busy"
              :infinite-scroll-throttle-delay="5000" v-el-table-infinite-scroll="load">
      <el-table-column prop="name" label="名称" width="90"/>
      <el-table-column prop="intro" label="简介" width="120" :show-overflow-tooltip="true"/>
      <el-table-column prop="money" label="金额" width="75"/>
      <el-table-column label="类型" width="85">
        <template slot-scope="scope">
          {{scope.row.type === 1 ? '收入' : '支出'}}
        </template>
      </el-table-column>
      <el-table-column label="状态" width="100">
        <template slot-scope="scope">
          <el-link v-if="scope.row.status === 2" type="primary" @click="openStatusDialog(scope.row.id)">
            未完成
          </el-link>
          <el-link v-else-if="scope.row.status === 1" type="success" :underline="false">已完成</el-link>
          <el-link v-else type="info" :underline="false" disabled>已取消</el-link>
        </template>
      </el-table-column>
      <el-table-column label="是否公开" width="100">
        <template slot-scope="scope">
          <el-popconfirm confirmButtonText='好的' cancelButtonText='不用了' icon="el-icon-info"
                         @onConfirm="updateOpen(scope.row.id, scope.row.open)"
                         :title="scope.row.open === 0 ? '公开后，家庭中的管理员将可以看到这条记录的信息，确定公开么？' : '取消公开后，只有自己可以看到这条记录的信息，确定取消公开么？'">
            <el-button type="text" slot="reference">
              <el-switch v-model="scope.row.open === 1" active-color="#13ce66" inactive-color="#ff4949"/>
            </el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="160">
        <template slot-scope="scope">
          <el-button @click="info(scope.row.id)" type="text" size="small">详情</el-button>
          <el-button v-if="scope.row.status !== 3" @click="modify(scope.row.id)" type="text" size="small">更新</el-button>
          <el-button v-else type="text" disabled size="small">更新</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="修改计划状态" append-to-body :visible.sync="dialogVisible">
      <el-form :model="planStatusForm">
        <el-input v-model="planStatusForm.id" hidden></el-input>
        <el-form-item label="计划状态" label-width="120px">
          <el-select v-model="planStatusForm.status" placeholder="请选择计划状态">
            <el-option label="已完成" value="1"></el-option>
            <el-option label="已取消" value="3"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateStatus">确 定</el-button>
      </div>
    </el-dialog>
  </div>
  <div v-else class="no-data">
    无数据
  </div>
</template>

<!-- TODO: 无限滚动多次调用 load 方法 bug 未解决 -->

<script>
  import {pagePlans, modifyStatus, modifyOpen} from '@/api/plan'

  export default {
    name: "plan-list",
    inject: ['portalFormReload'],
    mounted() {
      pagePlans(this.pageNum).then(response => {
        this.list.push(...response.data.list);
        this.total = response.data.total;
        this.hasMore = this.list.length < response.data.total;
      })
    },
    data() {
      return {
        list: [],
        busy: false,
        dialogVisible: false,
        planStatusForm: {
          id: null,
          status: null
        },
        total: 0,
        hasMore: true,
        pageNum: 1
      }
    },
    methods: {
      openStatusDialog(id) {
        this.planStatusForm.id = id;
        this.dialogVisible = true;
      },
      updateStatus() {
        modifyStatus(this.planStatusForm)
          .then(resp => {
            if (resp.code === 20000) {
              this.$notify.success(resp.message);
              this.portalFormReload();
            } else {
              this.$notify.error('更新计划状态失败，请检查您的网络');
            }
          });
      },
      updateOpen(id, open) {
        modifyOpen({id, open: open === 1 ? 0 : 1})
          .then(resp => {
            if (resp.code === 20000) {
              this.$notify.success(resp.message);
              this.portalFormReload();
            } else {
              this.$notify.error('设置计划公开失败，请检查您的网络');
            }
          });
      },
      info(id) {
        this.$router.push({
          path: '/plan/info/' + id,
        });
      },
      modify(id) {
        this.$router.push({
          path: '/plan/update/' + id,
        });
      },
      load() {
        this.busy = true;
        if (this.list.length < this.total) {
          this.$message.success('加载下一页');
          pagePlans(this.pageNum + 1).then(response => {
            if (this.list.length < response.data.total)
              this.list.push(...response.data.list);
            this.pageNum = response.data.pageNum;
            this.hasMore = this.list.length < response.data.total;
            this.busy = false;
          });
        } else {
          this.busy = false;
          this.$message.info('别滑啦！我真的一滴都没有啦！！！');
        }
      }
    }
  }
</script>
