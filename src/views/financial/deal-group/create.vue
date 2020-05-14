<template>
  <div class="login-wrap">
    <div class="login-html">
      <input id="tab-1" type="radio" class="sign-in" checked/><label for="tab-1" class="tab">交易组创建</label>
      <div class="login-form">
        <div class="sign-in-htm">
          <el-form ref="groupForm" :model="dealGroup" :rules="dealGroupRules">
            <el-form-item prop="name">
              <el-input v-model="dealGroup.name" placeholder="组名" />
            </el-form-item>
            <el-form-item prop="intro">
              <el-input type="textarea" v-model="dealGroup.intro" placeholder="简介" />
            </el-form-item>
            <el-form-item>
              <el-input v-model="dealGroup.remark" placeholder="备注" />
            </el-form-item>
            <div class="group">
              <button type="button" @click="commitGroup('groupForm')" class="btn button">创建</button>
            </div>
          </el-form>
          <div class="hr"></div>
          <div class="foot-lnk"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { save } from '@/api/dealGroup'

  export default {
    name: "group-create",
    data() {
      return {
        dealGroup: {
          name: null,
          intro: null,
          remark: null
        },
        dealGroupRules: {
          name: [{required: true, message: '请输入组名', trigger: 'blur'}],
          intro: [{required: true, message: '请输入简介', trigger: 'blur'}],
        }
      }
    },
    methods: {
      commitGroup(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.dealGroup.userId = this.$store.getters.id;
            save(this.dealGroup).then(response => {
              if (response.code === 20000) {
                this.$message.success(response.message);
                this.$router.push('/deal/group/list');
              } else {
                this.$message.success('创建家庭组失败，请检查您的网络');
              }
            });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
    }
  }
</script>

<style lang="stylus" scoped>
  *, :after, :before
    box-sizing border-box

  a
    color inherit
    text-decoration none

  input, button
    outline none
    border none

  .login-wrap
    width 100%
    margin 75px auto
    max-width 525px
    min-height 450px
    position relative
    background url('~@/assets/img/bg.jpg') no-repeat center
    box-shadow 0 12px 15px 0 rgba(0, 0, 0, .24), 0 17px 50px 0 rgba(0, 0, 0, .19)

  .login-html
    width 100%
    height 100%
    position absolute
    text-align center
    padding 40px 70px 50px 70px
    background rgba(40, 57, 101, .7)
    .sign-in
      display none
    .tab
      text-transform uppercase
      font-size 22px
      padding-bottom 5px
      margin 0 auto 10px
      display inline-block
      border-bottom 2px solid #1161ee
      color rgba(255,255,255,.7)

  .login-form
    .group
      margin-bottom 15px
      .input,.button
        width 100%
        color #fff
        display block
        border none
        padding 15px 20px
        border-radius 25px
        background rgba(255, 255, 255, .1)
      .button
        background #1161ee
        text-transform uppercase
        &:hover
          background #c71585

  .hr
    height 2px
    margin 60px 0 50px 0
    background rgba(255, 255, 255, .2)

  .foot-lnk
    text-align center

  .current-back
    width 100%
    height 100%
    position absolute
    background #696969
    border-radius 5px
    border-bottom 2px solid rgba(0, 0, 0, 0.09)
    border-top 2px solid rgba(255, 255, 255, 0.1)
</style>

<style lang="stylus">
  el-form-item__content, .el-input, .el-textarea, .el-input__inner, .el-textarea__inner
    background-color rgba(255, 255, 255, 0.1)
    color #f2f2f2
    border none
    border-radius 20px
  .el-textarea__inner
    resize none
</style>
