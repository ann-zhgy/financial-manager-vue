<template>
  <div class="custom-container home-container">
    <nav class="nav-bar">
      <ul class="nav-list">
        <li class="li-1"><router-link to="/home">主页</router-link></li>
        <li class="li-2"><router-link to="/financial/create">收支创建</router-link></li>
        <li class="li-3"><router-link to="/financial/show">我的收支</router-link></li>
        <li class="li-4"><router-link to="/home/data">数据分析</router-link></li>
        <li class="li-5"><router-link to="/plan">我的计划</router-link></li>
        <li class="li-6"><router-link to="/family">我的家庭</router-link></li>
        <div class="current">
          <div class="top-arrow"></div>
          <div class="current-back"></div>
          <div class="bottom-arrow"></div>
        </div>
      </ul>
      <div class="nav-right">
        <el-dropdown class="avatar-container" trigger="click">
          <div class="avatar-wrapper">
            <img :src="avatar" alt="avatar" class="user-avatar" :title="name">
            <i class="el-icon-caret-bottom"/>
          </div>
          <el-dropdown-menu slot="dropdown" class="user-dropdown">
            <router-link to="/profile/info">
              <el-dropdown-item>我的信息</el-dropdown-item>
            </router-link>
            <el-dropdown-item divided @click.native="logout">
              <span style="display:block;">退出登录</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </nav>
    <div>
      <router-view/>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'home',
    data() {
      return {
        isDeal: false,
        isDealGroup: false,
      }
    },
    computed: {
      avatar() {
        return this.$store.getters.avatar;
      },
      name() {
        return this.$store.getters.name;
      }
    },
    methods: {
      async logout() {
        await this.$store.dispatch('user/logout');
        await this.$router.replace(`/login?redirect=${this.$route.fullPath}`);
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .home-container
    background-image url("~@/assets/img/bg.jpg")

  .nav-bar
    position relative
    margin-top -15px
    height 80px
    width 100%
    vertical-align middle
    white-space nowrap
    background-image url("~@/assets/img/menu-bg.png")
    ul
      position relative
      li
        position relative
        padding-top 30px
        z-index 2
        font-size 14px
        text-align center
        display block
        float left
        width 10%
        height 80px

  .nav-list a
    color #D8D8D8
    text-decoration none
    display block
    width 100%
    height 100%
    text-shadow 0 -1px 0 #000
    vertical-align middle
    &:hover
      color #fff

  .nav-right
    height 40px
    line-height 50px
    width 40px
    position absolute
    right 50px
    top 0
    bottom 0
    margin auto
    &:focus
      outline none
    > .right-menu-item
      display inline-block
      padding 0 8px
      height 100%
      font-size 18px
      color #5a5e66
      vertical-align text-bottom
      > .hover-effect
        cursor pointer
        transition background .3s
        &:hover
          background rgba(0, 0, 0, .025)

  .avatar-wrapper
    position relative

  .user-dropdown a
    text-decoration none

  .user-avatar
    cursor pointer
    width 40px
    height 40px
    border-radius 10px

  .el-icon-caret-bottom
    cursor pointer
    position absolute
    right -20px
    top 25px
    font-size 12px

  .current
    position absolute
    left 7.4%
    margin-left -49px
    width 100px
    height 80px
    -webkit-transition all 400ms cubic-bezier(.45, 1.92, .9, 1.54)
    -moz-transition all 400ms cubic-bezier(.45, 1.92, .9, 1.54)
    -o-transition all 400ms cubic-bezier(.45, 1.92, .9, 1.54)
    transition all 400ms cubic-bezier(.16, 1.23, .87, 1.18)

  .current-back
    width 100%
    height 100%
    position absolute
    background #696969
    border-radius 5px
    border-bottom 2px solid rgba(0, 0, 0, 0.09)
    border-top 2px solid rgba(255, 255, 255, 0.1)

  .top-arrow
    position absolute
    overflow hidden
    width 100%
    height 12px
    top 13px
    left 0
    z-index: 2
    &:before
      content ""
      position absolute
      width 80%
      height 10px
      top -10px
      left 10%
      border-radius 20%
      box-shadow 0 0 10px black
    &:after
      content ""
      position absolute
      width 0
      height 0
      top: 0
      border-top 8px solid #696969
      border-left 6px solid transparent
      border-right 6px solid transparent
      margin-left -6px
      left 50%

  .bottom-arrow
    position absolute
    overflow hidden
    width 100%
    height 12px
    bottom 17px
    left 0
    z-index 2

  .bottom-arrow:before
    content ""
    position absolute
    width 80%
    height 10px
    bottom -10px
    left 10%
    border-radius 20%
    box-shadow 0 0 10px black

  .bottom-arrow:after
    content ""
    position absolute
    width 0
    height 0
    bottom 0
    border-bottom 12px solid #696969
    border-left 8px solid transparent
    border-right 8px solid transparent
    margin-left -8px
    left 50%

  for num in 0 1 2 3 4 5
    .li-{num + 1}:hover ~ .current
      left 7.4% + num * 9.7%
</style>
