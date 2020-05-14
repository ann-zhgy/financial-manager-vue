<template>
  <div v-if="list && list.length > 0">
    <el-table :data="list" stripe style="width: 87.9%; margin: auto; max-height: 490px"
              infinite-scroll-disabled="busy" infinite-scroll-throttle-delay="5000" v-infinite-scroll="load">
      <el-table-column prop="intro" label="简介" width="140" align="center" :show-overflow-tooltip="true"/>
      <el-table-column label="交易信息" width="110" align="center">
        <template slot-scope="scope">
          {{scope.row.type === 1 ? '+' : '-'}} {{scope.row.money}}
        </template>
      </el-table-column>
      <el-table-column prop="dealTime" label="完成时间" width="140" align="center"/>
      <el-table-column prop="username" label="创建者" width="126" align="center"/>
      <el-table-column prop="remark" label="备注" width="126" align="center"/>
    </el-table>
  </div>
  <div v-else class="no-data">
    无数据
  </div>
</template>

<!-- TODO: 无限滚动多次调用 load 方法 bug 未解决 -->

<script>
  import {deals} from "@/api/family";

  export default {
    name: "family-deals",
    mounted() {
      deals(0).then(response => {
        this.list.push(...response.data.list);
        this.hasMore = this.list.length < response.data.total;
      })
    },
    data() {
      return {
        list: [],
        busy: false,
        hasMore: false,
        pageNum: null,
      }
    },
    methods: {
      load() {
        this.busy = true;
        if (this.hasMore) {
          this.$message.success('加载下一页');
          deals(this.pageNum + 1).then(response => {
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
