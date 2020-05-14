<template>
  <div class="plan-create-content">
    <el-form :model="plan" :rules="planRules" ref="plan" label-width="80px">
      <el-form-item label="计划名称" prop="name">
        <el-input v-model.trim="plan.name"></el-input>
      </el-form-item>
      <el-form-item label="起止时间" prop="rangeTime">
        <el-date-picker v-model="plan.rangeTime" type="daterange" unlink-panels value-format="yyyy-MM-dd"
                        :picker-options="pickerOptions" start-placeholder="开始时间" end-placeholder="结束时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="总金额" prop="money">
        <el-input v-model.number="plan.money"></el-input>
      </el-form-item>
      <el-form-item label="交易类型" prop="type">
        <el-select v-model="plan.type" placeholder="请选择交易类型">
          <el-option label="收入" :value="1"></el-option>
          <el-option label="支出" :value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="计划简介" prop="intro">
        <el-input v-model="plan.intro"></el-input>
      </el-form-item>
      <el-form-item label="备注">
        <el-input v-model="plan.remark"></el-input>
      </el-form-item>
      <el-button type="primary" class="center-block" @click="commitPlan('plan')">创建计划</el-button>
    </el-form>
  </div>
</template>

<script>
  import {save} from '@/api/plan'

  export default {
    name: "create",
    data() {
      return {
        plan: {
          name: '',
          rangeTime: [],
          money: null,
          type: null,
          intro: '',
          remark: ''
        },
        planRules: {
          name: [{required: true, message: '请输入计划名称', trigger: 'blur'}],
          rangeTime: [{required: true, message: '请选择起止时间', trigger: 'blur'}],
          money: [{type: 'number', required: true, message: '请输入金额', trigger: 'blur'}],
          type: [{required: true, message: '请选择交易类型', trigger: 'blur'}],
          intro: [{required: true, message: '请输入简介', trigger: 'blur'}],
        },
        pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              end.setTime(start.getTime() + 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              end.setTime(start.getTime() + 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              end.setTime(start.getTime() + 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
      }
    },
    methods: {
      commitPlan(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let planData = {};
            planData.name = this.plan.name;
            planData.beginTime = this.plan.rangeTime[0];
            planData.endTime = this.plan.rangeTime[1];
            planData.money = this.plan.money;
            planData.type = this.plan.type;
            planData.intro = this.plan.intro;
            planData.remark = this.plan.remark;
            planData.userId = this.$store.getters.id;
            save(planData).then(response => {
              if (response.code === 20000) {
                this.$notify.success(response.message);
                this.$router.push('/plan');
              } else {
                this.$notify.error('创建计划失败，请检查您的网络');
              }
            });
          } else {
            console.log('error submit!!');
            return false;
          }
        })
      }
    }
  }
</script>

<style lang="stylus">
  @import "~@/style/widthForm.styl"
</style>
