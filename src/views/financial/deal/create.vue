<template>
  <div class="container home-content-position">
    <div class="cont_central">
      <div class="cont_login">
        <div class="cont_info_log_sign_up">
          <div class="col_md_login">
            <div class="cont_ba_opacity">
              <h2>附加信息</h2>
              <p>请您认真填写关于交易记录的附加信息</p>
              <button class="btn_login" @click="cambialLogin">填写附加信息</button>
            </div>
          </div>
          <div class="col_md_sign_up">
            <div class="cont_ba_opacity">
              <h2>基本信息</h2>
              <p>请您认真填写关于交易记录的基本信息</p>
              <button class="btn_sign_up" @click="cambialSignUp">填写基本信息</button>
            </div>
          </div>
        </div>
        <div class="cont_back_info">
          <div class="cont_img_back_grey">
            <img src="~@/assets/img/po.jpg" alt>
          </div>
        </div>
        <div class="cont_forms">
          <div class="cont_img_back_">
            <img src="~@/assets/img/po.jpg" alt>
          </div>
          <el-form :model="deal" :rules="dealRules" ref="deal" label-width="80px">
            <div class="cont_form_login form-control form-horizontal">
              <h2>附加信息</h2>
              <div style="padding: 20px 0">
                <el-form-item label="备注" prop="remark">
                  <el-input v-model.trim="deal.remark"></el-input>
                </el-form-item>
                <el-form-item label="交易组">
                  <el-select v-model="deal.dealGroup" placeholder="请选择交易组" form="deal" style="width: 100%">
                    <el-option v-for="dealGroup in dealGroups" :label="dealGroup.name" :value="dealGroup.id"/>
                  </el-select>
                </el-form-item>
                <el-form-item label="关联计划">
                  <el-select v-model="index.plan" placeholder="请选择计划" form="deal"
                             @change="choosePlan" style="width: 100%">
                    <el-option v-for="(plan, index) in plans" :label="plan.name" :value="index"/>
                  </el-select>
                </el-form-item>
              </div>
            </div>
            <div class="cont_form_sign_up form-horizontal form-control">
              <h2>基本信息</h2>
              <div style="padding: 20px 0">
                <el-form-item label="简介" prop="intro">
                  <el-input v-model.trim="deal.intro"></el-input>
                </el-form-item>

                <el-form-item label="交易金额" prop="money">
                  <el-input v-model.number="deal.money" :disabled="isDisable"></el-input>
                </el-form-item>
                <el-form-item label="交易类型" prop="type">
                  <el-select v-model="deal.type" :disabled="isDisable" placeholder="请选择交易类型" style="width: 100%">
                    <el-option label="收入" :value="1"></el-option>
                    <el-option label="支出" :value="2"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="交易时间" prop="dealTime">
                  <el-date-picker ref="dealTime" value-format="yyyy-MM-dd" v-model="deal.dealTime" type="date" style="width: 100%"/>
                </el-form-item>
                <el-button type="primary" @click="commitDeal('deal')">提交</el-button>
              </div>
            </div>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {availablePlan} from '@/api/plan';
  import {groups} from '@/api/dealGroup';
  import {save} from '@/api/deal';

  export default {
    name: "create",
    mounted: function () {
      availablePlan(this.$store.getters.id)
        .then(response => {
          this.plans = response.data;
        });
      groups(this.$store.getters.id)
        .then(response => {
          this.dealGroups = response.data
        })
    },
    data() {
      return {
        isDisable: false,
        index: {
          plan: null, dealGroup: null,
        },
        deal: {
          intro: null, money: null, type: null, dealTime: null, remark: null, dealGroup: null, planId: null
        },
        plans: null,
        dealGroups: [],
        dealRules: {
          intro: [{required: true, message: '请输入简介', trigger: 'blur'}],
          money: [{type: 'number', required: true, message: '请输入金额', trigger: 'blur'}],
          type: [{type: 'number', required: true, message: '请选择交易类型', trigger: 'blur'}],
          dealTime: [{required: true, message: '请输入交易时间', trigger: 'blur'}],
        }
      }
    },
    methods: {
      cambialLogin() {
        document.querySelector('.cont_forms').className = "cont_forms cont_forms_active_login";
        document.querySelector('.cont_form_login').style.display = "block";
        document.querySelector('.cont_form_sign_up').style.opacity = "0";

        setTimeout(function () {
          document.querySelector('.cont_form_login').style.opacity = "1";
        }, 400);

        setTimeout(function () {
          document.querySelector('.cont_form_sign_up').style.display = "none";
        }, 200);
      },
      cambialSignUp() {
        document.querySelector('.cont_forms').className = "cont_forms cont_forms_active_sign_up";
        document.querySelector('.cont_form_sign_up').style.display = "block";
        document.querySelector('.cont_form_login').style.opacity = "0";

        setTimeout(function () {
          document.querySelector('.cont_form_sign_up').style.opacity = "1";
        }, 100);

        setTimeout(function () {
          document.querySelector('.cont_form_login').style.display = "none";
        }, 400);
      },
      commitDeal(formName) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            save(this.deal)
              .then(response => {
                if (response.code === 20000) {
                  this.$notify.success(response.message);
                  this.$router.push('/deal/list');
                } else {
                  this.$notify.error('创建交易记录失败，请检查您的网络');
                }
              })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      choosePlan() {
        let currPlan = this.plans[this.index.plan];
        this.deal.planId = currPlan.id;
        this.deal.money = currPlan.money;
        this.deal.type = currPlan.type;
        this.deal.intro = '关联计划：' + currPlan.name;
        this.isDisable = true;
      }
    },
  }
</script>

<style lang="stylus" scoped>
  *
    margin 0 auto
    text-align center
    font-family 'Lato', sans-serif

  .cont_central
    position relative
    float left
    width 100%
    margin-top 0

  .cont_login
    position relative
    width 640px
    left 50%
    margin-left -320px

  .cont_back_info
    position relative
    float left
    width 640px
    height 280px
    overflow hidden
    background-color #fff
    margin-top 100px
    box-shadow 1px 10px 30px -10px rgba(0, 0, 0, 0.5)

  .cont_forms
    position absolute
    overflow hidden
    top 100px
    left 0
    width 320px
    height 280px
    background-color #eee
    -webkit-transition all 0.5s
    -moz-transition all 0.5s
    -o-transition all 0.5s
    transition all 0.5s

  .cont_forms_active_login
    box-shadow 1px 10px 30px -10px rgba(0, 0, 0, 0.5)
    height 420px
    top 20px
    left 0
    -webkit-transition all 0.5s
    -moz-transition all 0.5s
    -o-transition all 0.5s
    transition all 0.5s

    > .cont_img_back_
      top 0
      -webkit-transition all 0.5s
      -moz-transition all 0.5s
      -o-transition all 0.5s
      transition all 0.5s

  .cont_forms_active_sign_up
    box-shadow 1px 10px 30px -10px rgba(0, 0, 0, 0.5);
    height 420px
    top 20px
    left 320px
    -webkit-transition all 0.5s
    -moz-transition all 0.5s
    -o-transition all 0.5s
    transition all 0.5s

    > .cont_img_back_
      top 0
      left -435px
      -webkit-transition all 0.5s
      -moz-transition all 0.5s
      -o-transition all 0.5s
      transition all 0.5s

  .cont_img_back_grey
    position absolute
    width 950px
    top -80px
    left -116px

    > img
      width 100%
      -webkit-filter grayscale(100%)
      filter grayscale(100%)
      opacity 0.2
      animation-name animal_fondo
      animation-duration 20s
      animation-timing-function linear
      animation-iteration-count infinite
      animation-direction alternate

  .cont_img_back_
    position absolute
    width 950px
    top -80px
    left -116px

    > img
      width 100%
      opacity 0.3
      animation-name animal_fondo
      animation-duration 20s
      animation-timing-function linear
      animation-iteration-count infinite
      animation-direction alternate

  .cont_info_log_sign_up
    position absolute
    width 640px
    height 280px
    top 100px
    z-index 1

  .col_md_login
    position relative
    float left
    width 50%

    > h2
      font-weight 400
      margin-top 70px
      color #757575

    > p
      font-weight 400
      margin-top 15px
      width 80%
      color #37474F

  .btn_login
    background-color #FF9800
    border none
    padding 10px
    width 200px
    border-radius 3px
    box-shadow 1px 5px 20px -5px rgba(0, 0, 0, 0.4)
    color #fff
    margin-top 10px
    cursor pointer

  .col_md_sign_up
    position relative
    float left
    width 50%

  .cont_ba_opacity
    position relative
    background-color rgba(187, 168, 170, 0.79);
    width 80
    border-radius 3px
    margin-top 60px
    padding 15px 0

    > h2
      font-weight 400
      color #fff

    > p
      font-weight 400
      margin-top 15px
      color #fff

  .btn_sign_up
    background-color: #f44336;
    border none
    padding 10px
    width 200px
    border-radius 3px
    box-shadow 1px 5px 20px -5px rgba(0, 0, 0, 0.4);
    color #fff
    margin-top 10px
    cursor pointer

  .cont_forms_active_sign_up
    z-index 2

  @-webkit-keyframes animal_fondo
    from
      -webkit-transform scale(1) translate(0px)
      -moz-transform scale(1) translate(0px)
      -ms-transform scale(1) translate(0px)
      -o-transform scale(1) translate(0px)
      transform scale(1) translate(0px)

    to
      -webkit-transform scale(1.5) translate(50px)
      -moz-transform scale(1.5) translate(50px)
      -ms-transform: scale(1.5) translate(50px)
      -o-transform scale(1.5) translate(50px)
      transform scale(1.5) translate(50px)

  @-o-keyframes identifier
    from
      -webkit-transform scale(1);
      -moz-transform scale(1)
      -ms-transform scale(1)
      -o-transform scale(1)
      transform: scale(1)
    to
      -webkit-transform scale(1.5)
      -moz-transform scale(1.5)
      -ms-transform scale(1.5)
      -o-transform scale(1.5)
      transform scale(1.5)

  @-moz-keyframes identifier
    from
      -webkit-transform scale(1)
      -moz-transform scale(1)
      -ms-transform scale(1)
      -o-transform scale(1)
      transform scale(1)

    to
      -webkit-transform scale(1.5)
      -moz-transform scale(1.5)
      -ms-transform scale(1.5)
      -o-transform scale(1.5)
      transform scale(1.5)

  @keyframes identifier
    from
      -webkit-transform scale(1)
      -moz-transform scale(1)
      -ms-transform scale(1)
      -o-transform scale(1)
      transform scale(1)

    to
      -webkit-transform scale(1.5)
      -moz-transform scale(1.5)
      -ms-transform scale(1.5)
      -o-transform scale(1.5)
      transform scale(1.5)

  .cont_form_login
    position absolute
    opacity 0
    display none
    width 320px
    -webkit-transition all 0.5s
    -moz-transition all 0.5s
    -o-transition all 0.5s
    transition all 0.5s

    > h2
      margin-top 110px
      font-weight 400
      color #757575

  .cont_forms_active_login
    z-index 2

  .cont_form_sign_up
    position absolute
    width 320px
    float left
    opacity 0
    display none
    -webkit-transition all 0.5s
    -moz-transition all 0.5s
    -o-transition all 0.5s
    transition all 0.5s

    > h2
      margin-top 50px
      font-weight 400
      color #757575
</style>
