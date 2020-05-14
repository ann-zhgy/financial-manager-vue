<template>
  <div v-if="plan !== null" class="plan-create-content">
    <el-form :model="plan" ref="plan" label-width="80px">
      <el-form-item label="计划名称">
        <el-input readonly :value="plan.name"></el-input>
      </el-form-item>
      <el-form-item label="起止时间">
        <el-date-picker readonly v-model="plan.rangeTime" type="daterange"></el-date-picker>
      </el-form-item>
      <el-form-item label="总金额">
        <el-input readonly v-model.number="plan.money"></el-input>
      </el-form-item>
      <el-form-item label="交易类型">
        <el-select v-model="plan.type">
          <el-option v-if="plan.type === 1" :value="1" label="收入"></el-option>
          <el-option v-if="plan.type === 2" :value="2" label="支出"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="计划简介">
        <el-input readonly v-model="plan.intro"></el-input>
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
        <el-input readonly v-model="plan.remark"></el-input>
      </el-form-item>
      <el-form-item label="是否公开">
        <el-switch readonly v-model="plan.open === 1" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
      </el-form-item>
      <el-form-item label="创建时间">
        <el-date-picker readonly v-model="plan.created" type="datetime"></el-date-picker>
      </el-form-item>
      <el-form-item label="上次更新">
        <el-date-picker readonly v-model="plan.updated" type="datetime"></el-date-picker>
      </el-form-item>
      <el-drawer title="交易记录" append-to-body :visible.sync="dialog" direction="rtl" ref="drawer">
        <div class="demo-drawer__content">
          <el-form v-if="plan.deal" :model="plan.deal">
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
    </el-form>
  </div>
  <div v-else class="no-data">
    无数据
  </div>
</template>

<script>
  import {plan} from '@/api/plan';
  import {deal} from '@/api/deal'

  export default {
    name: "info",
    mounted() {
      let id = Number(this.$route.params.id);
      if (id !== -1) {
        plan(id).then(response => {
          let data = response.data;
          let planData = {};
          planData.name = data.name;
          planData.intro = data.intro;
          planData.money = data.money;
          planData.type = data.type;
          planData.remark = data.remark;
          planData.status = data.status;
          planData.finishTime = data.finishTime;
          planData.dealId = data.dealId;
          planData.created = data.created;
          planData.updated = data.updated;
          planData.open = data.open;
          planData.rangeTime = [data.beginTime, data.endTime];
          this.plan = planData;
        })
      } else {
        this.$alert('请在计划列表中选择记录查看信息，点击确定返回计划列表', '提示', {
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
        dialog: false,
        formLabelWidth: '120px',
      }
    },
    methods: {
      getDealInfo() {
        deal(this.plan.dealId)
          .then(response => {
            this.plan.deal = response.data;
            this.dialog = true;
          });
      }
    }
  }
</script>

<style lang="stylus">
  @import "~@/style/widthForm.styl"
</style>
