<template>
  <div>
    <el-form :inline="true" :model="query" ref="query" :rules="queryRules" class="demo-form-inline">
      <el-form-item label="交易完成时间" label-width="120px" prop="time">
        <el-date-picker v-model="query.time" value-format="yyyy-MM-dd" type="daterange" unlink-panels
                        range-separator="至" start-placeholder="开始时间"
                        end-placeholder="结束时间" :picker-options="pickerOptions"/>
      </el-form-item>
      <el-form-item v-if="$store.getters.identity.id !== 4">
        <el-switch v-model="queryType" active-text="查询家庭" inactive-text="查询个人">
        </el-switch>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getData">查询</el-button>
      </el-form-item>
    </el-form>

    <div ref="main" class="chart-div"></div>
  </div>
</template>

<script>
  import echarts from 'echarts';
  import {dealData, familyDealData} from '@/api/deal';

  export default {
    name: "data-show",
    mounted() {
      this.charts = echarts.init(this.$refs.main);
    },
    data() {
      return {
        charts: null,
        query: {
          time: [],
        },
        queryType: false,
        queryRules: {
          time: [{required: true, message: '请选择时间', trigger: 'blur'}],
        },
        pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(end.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(end.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(end.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        }
      }
    },
    methods: {
      getData() {
        let option = {
          title: {
            text: '消费情况',
            subtext: '数据分析',
            x: 'center'
          },
          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          legend: {
            orient: 'vertical',
            left: 'left'
          },
          series: [{
            name: '收入细节',
            type: 'pie',
            radius: '30%',
            center: ['30%', '50%'],
            itemStyle: {
              "emphasis": {
                "shadowBlur": 10,
                "shadowOffsetX": 0,
                "shadowColor": "rgba(0, 0, 0, 0.5)"
              }
            }
          }, {
            name: '支出细节',
            type: 'pie',
            radius: '30%',
            center: ['80%', '50%'],
            itemStyle: {
              "emphasis": {
                "shadowBlur": 10,
                "shadowOffsetX": 0,
                "shadowColor": "rgba(0, 0, 0, 0.5)"
              }
            }
          }, {
            name: '消费细节',
            type: 'pie',
            radius: '30%',
            center: ['55%', '50%'],
            itemStyle: {
              "emphasis": {
                "shadowBlur": 10,
                "shadowOffsetX": 0,
                "shadowColor": "rgba(0, 0, 0, 0.5)"
              }
            }
          }]
        };
        this.$refs.query.validate(valid => {
          if (valid) {
            let beginTime, endTime;
            if (this.query.time[0] <= this.query.time[1]) {
              beginTime = this.query.time[0];
              endTime = this.query.time[1];
            } else {
              beginTime = this.query.time[1];
              endTime = this.query.time[0];
            }
            let params = {beginTime, endTime};
            if (this.queryType) {
              familyDealData(params)
                .then(resp => {
                  this.setEChart(resp, option);
                })
            } else {
              dealData(params)
                .then(resp => {
                  this.setEChart(resp, option);
                });
            }
          }
        });
      },
      setEChart(resp, option) {
        let {data} = resp;
        if (data !== null && data.length > 0) {
          let income = 0, expand = 0;
          option.legend.data = data.map(item => item.intro);
          option.legend.data.push("总收入");
          option.legend.data.push("总支出");
          option.series[0].data = data.map(item => {
            if (item.money !== 0 && item.type === 1) {
              income += item.money;
              return {
                value: item.money,
                name: item.intro,
              };
            }
          });
          option.series[1].data = data.map(item => {
            if (item.money !== 0 && item.type === 2) {
              expand += item.money;
              return {
                value: item.money,
                name: item.intro,
              };
            }
          });
          option.series[2].data = [];
          option.series[2].data.push({
            value: income,
            name: "总收入"
          });
          option.series[2].data.push({
            value: expand,
            name: "总支出"
          });
          this.charts.setOption(option);
        } else if (data == null) {
          alert('这段时间无任何消费！');
        }
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .chart-div
    width 800px
    height 400px
    margin 20px 0 0 400px
    border 1px solid #8e8e8e
</style>

<style lang="stylus">
  .el-form
    margin-top 40px
    margin-left 50px

    .el-form-item__label
      color #cccccc

  .el-switch__label.is-active
    color #bb471d
</style>
