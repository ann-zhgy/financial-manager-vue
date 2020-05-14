<template>
  <portal-form v-if="menus !== null" :component-title="myTitle" :component-sub-title="mySubTitle" :menus="menus"/>
</template>

<script>
  export default {
    name: "profile-index",
    data() {
      return {
        myTitle: 'Profile',
        mySubTitle: '展现最真实的自己',
        menus: [
          {
            name: '个人档案',
            url: '/profile/info',
          },
          {
            name: '修改档案',
            url: '/profile/update',
          },
          {
            name: '修改密码',
            url: '/profile/password',
          },
        ]
      }
    }
  }
</script>

<style lang="stylus">
  .icon-button
    width 180px
    height 180px
    position absolute
    top 45px
    right 120px
</style>
