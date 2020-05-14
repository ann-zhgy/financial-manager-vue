<template>
  <div v-if="plan !== null" class="plan-create-content">
    <el-form :model="plan" :rules="planRules" ref="plan" label-width="80px">
      <el-form-item label="计划名称">
        <el-input :value="plan.name"></el-input>
      </el-form-item>
      <el-form-item label="起止时间">
        <el-date-picker v-model="plan.rangeTime" type="daterange" unlink-panels value-format="yyyy-MM-dd"
                        :picker-options="pickerOptions" start-placeholder="开始时间" end-placeholder="结束时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="总金额">
        <el-input v-model.number="plan.money"></el-input>
      </el-form-item>
      <el-form-item label="交易类型">
        <el-select v-if="plan.status === 2" v-model="plan.type">
          <el-option label="收入" :value="1"></el-option>
          <el-option label="支出" :value="2"></el-option>
        </el-select>
        <el-select v-else v-model="plan.type">
          <el-option v-if="plan.type === 1" label="收入" :value="1"></el-option>
          <el-option v-if="plan.type === 2" label="支出" :value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="计划简介">
        <el-input v-model="plan.intro"></el-input>
      </el-form-item>
      <el-form-item label="计划状态">
        <el-select v-model="plan.status">
          <el-option v-if="plan.status === 1" :value="1" label="已完成"></el-option>
          <el-option v-if="plan.status === 2" :value="2" label="未完成"></el-option>
          <el-option v-if="plan.status === 3" :value="3" label="已取消"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item v-if="plan.status === 1" label="完成时间">
        <el-date-picker readonly v-model="plan.finishTime" type="date"></el-date-picker>
      </el-form-item>
      <el-form-item v-if="plan.status === 1" label="交易记录">
        <el-button type="text" @click="getDealInfo">点击查看交易信息</el-button>
      </el-form-item>
      <el-form-item label="备注">
        <el-input v-model="plan.remark"></el-input>
      </el-form-item>
      <el-form-item label="是否公开">
        <el-switch v-model="plan.open" :active-value="1" :inactive-value="0" active-color="#13ce66" inactive-color="#ff4949" />
      </el-form-item>
      <el-form-item label="创建时间">
        <el-date-picker readonly v-model="plan.created" type="date"></el-date-picker>
      </el-form-item>
      <el-form-item label="上次更新">
        <el-date-picker readonly v-model="plan.updated" type="date"></el-date-picker>
      </el-form-item>
      <el-popconfirm confirmButtonText='确定' cancelButtonText='取消' icon="el-icon-info" iconColor="red"
                     title="更新后，与其关联的计划的部分信息也会更新，继续？" @onConfirm="updatePlan('plan')">
        <el-button type="primary" class="center-block" slot="reference">更新计划</el-button>
      </el-popconfirm>
    </el-form>
    <el-drawer title="交易记录" append-to-body :visible.sync="dialog" direction="rtl" ref="drawer">
      <div class="demo-drawer__content">
        <el-form v-if="plan.deal" append-to-body :model="plan.deal">
          <el-form-item label="简介" :label-width="formLabelWidth">
            <el-input v-model="plan.deal.intro" readonly></el-input>
          </el-form-item>
          <el-form-item label="交易金额" :label-width="formLabelWidth">
            <el-input v-model="plan.deal.money" readonly></el-input>
          </el-form-item>
          <el-form-item label="交易类型" :label-width="formLabelWidth">
            <el-select v-model="plan.deal.type">
              <el-option v-if="plan.deal.type === 1" label="收入" :value="1"></el-option>
              <el-option v-if="plan.deal.type === 2" label="支出" :value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="交易时间" :label-width="formLabelWidth">
            <el-input v-model="plan.deal.dealTime" readonly></el-input>
          </el-form-item>
          <el-form-item label="备注" :label-width="formLabelWidth">
            <el-input v-model="plan.deal.remark" readonly></el-input>
          </el-form-item>
          <el-button type="primary" class="center-block" @click="dialog = false">确认</el-button>
        </el-form>
      </div>
    </el-drawer>
  </div>
  <div v-else class="no-data">
    无数据
  </div>
</template>

<script>
  import {plan, modify} from '@/api/plan';
  import {deal} from '@/api/deal';

  export default {
    name: "info",
    mounted() {
      let id = Number(this.$route.params.id);
      if (id !== -1) {
        plan(id).then(response => {
          let data = response.data;
          let planData = data;
          planData.rangeTime = [data.beginTime, data.endTime];
          this.plan = planData;
        })
      } else {
        this.$alert('请在计划列表中选择记录更新，点击确定返回计划列表', '提示', {
          confirmButtonText: '确定',
          callback: () => {
            this.$router.push({path: '/plan/list'});
          }
        });
      }
    },
    data() {
      return {
        plan: null,
        planRules: {
          name: [{required: true, message: '请输入计划名称', trigger: 'blur'}],
          rangeTime: [{required: true, message: '请选择起止时间', trigger: 'blur'}],
          money: [{type: 'number', required: true, message: '请输入金额', trigger: 'blur'}],
          type: [{required: true, message: '请选择交易类型', trigger: 'blur'}],
          intro: [{required: true, message: '请输入简介', trigger: 'blur'}],
        },
        dialog: false,
        formLabelWidth: '120px',
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
      updatePlan(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let data = this.plan;
            data.beginTime = this.plan.rangeTime[0];
            data.endTime = this.plan.rangeTime[1];
            modify(data).then(resp => {
              if (resp.code === 20000) {
                this.$notify.success('更新计划信息成功');
                this.$router.push('/plan');
              } else {
                this.$notify.success('更新计划信息失败，请检查您的网络');
              }
            });
          }
        })
      },
      getDealInfo() {
        deal(this.plan.dealId)
          .then(resp => {
            if (resp.code === 20000) {
              this.plan.deal = resp.data;
              this.dialog = true;
            } else {
              this.$notify.error('获取交易信息失败，请检查您的网络');
            }
          });
      }
    }
  }
</script>

<style lang="stylus">
  @import "~@/style/widthForm.styl"
</style>
