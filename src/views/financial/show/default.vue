<template>
  <div>
    <el-table :data="list" style="width: 100%">
      <el-table-column prop="intro" label="简介" width="150" align="center" :show-overflow-tooltip="true" />
      <el-table-column label="交易信息" width="200" align="center">
        <template slot-scope="scope">
          {{scope.row.type === 1 ? '+' : '-'}} {{scope.row.money}}
        </template>
      </el-table-column>
      <el-table-column prop="dealTime" label="完成时间" width="200" align="center" />
      <el-table-column label="是否公开" width="200" align="center">
        <template slot-scope="scope">
          <button class="table-btn" type="button" :style="{color: (scope.row.open === 0 ? 'orange' : 'green')}">
            {{scope.row.open === 0 ? '未公开' : '已公开'}}
          </button>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200" align="center">
        <template slot-scope="scope">
          <button class="table-btn" type="button">详情</button>
          <button class="table-btn" type="button">更新</button>
        </template>
      </el-table-column>
    </el-table>
    <div class="row page-select">
      <el-pagination
        background
        :current-page.sync="currentPage"
        :page-size="pageSize"
        layout="prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  export default {
    name: "default",
    data() {
      return {
        currentPage: 2,
        pageSize: 8,
        total: 20,
        list: [
          {intro: 'demo01', type: 1, dealTime: '2020-02-02', money: 200, open: 0},
          {intro: 'demo0222222222222222222222222222', type: 2, dealTime: '2020-02-02', money: 300, open: 1},
        ]
      }
    }
  }
</script>

<style scoped>

</style>
