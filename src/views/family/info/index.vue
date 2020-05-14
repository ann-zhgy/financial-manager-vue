<template>
  <portal-form v-if="menus !== null" :component-title="myTitle" :component-sub-title="mySubTitle" :menus="menus"/>
</template>

<script>
  export default {
    name: "family-index",
    mounted() {
      this.initMenus();
    },
    data() {
      return {
        myTitle: 'Family',
        mySubTitle: '家是永远的依靠',
        menus: null,
      }
    },
    methods: {
      initMenus() {
        let menuId = this.$store.getters.identity.id;
        let info = {name: '我的家庭', url: '/family/info',};
        let create = {name: '创建家庭', url: '/family/create',};
        let join = {name: '加入家庭', url: '/family/join',};
        let update = {name: '更新家庭', url: '/family/update',};
        let del = {name: '解散家庭', url: '/family/delete',};
        let exit = {name: '退出家庭', url: '/family/exit',};
        let deals = {name: '所有交易信息', url: '/family/deals',};
        let plans = {name: '所有计划信息', url: '/family/plans',};
        let menus = [];

        if (menuId !== 4) {
          menus.push(info);
          menus.push(deals);
          menus.push(plans);
        }

        if (menuId === 1) {
          menus.push(update);
          menus.push(del);
        } else if (menuId === 2) {
          menus.push(update);
          menus.push(exit);
        } else if (menuId === 3) {
          menus.push(exit);
        } else if (menuId === 4) {
          menus.push(create);
          menus.push(join);
        }
        this.menus = menus;
      }
    }
  }
</script>


<style lang="stylus">
  .family-content
    width 60%
    height 450px
    position absolute
    margin auto
    top 0
    bottom 0
    left 0
    right 0

  .el-textarea__inner
    resize none
</style>
