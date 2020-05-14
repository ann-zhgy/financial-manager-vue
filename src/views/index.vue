<template>
  <div class="custom-container index-container">
    <div class="index-content">
      <div class="title">
        <p>我 们 将 会 为 你 打 开 联 系 家 庭 财 务 的 世 界</p>
        <p>使 你 的 生 活 变 得 更 美 好</p>
        <p>源 于 生 活 紧 扣 家 庭</p>
      </div>
      <div class="sub-title">
        方便<span>|</span> 快速<span>|</span> 准确
      </div>
      <div class="links clear-fix">
        <router-link class="act-but" to="/login">登录</router-link>
        <router-link class="act-but" to="/register">注册</router-link>
      </div>
    </div>
  </div>
</template>

<style lang="stylus" scoped>
  .index-container
    background-image url("~@/assets/img/15.jpg")

  .index-content
    width 100%
    height 300px
    text-align center
    margin-top 150px
    div.title
      font-size 35px
      text-align center
      color #fff
      p
        margin 2px auto
    div.sub-title
      margin-top 10px
      text-align center
      font-size 25px
      color #FF8C00

  .links
    width 240px
    height 30px
    margin 20px auto
    a
      text-decoration none
      outline none
      padding 0
      margin 0 10px
      width 100px
      height 100%
      line-height 30px
      border-radius 50px
      font-size 20px
      display block
      float left
      text-align center
      color #FFFFFF
      background #0096e6
      &:hover
        background-color #DC143C !important
</style>
