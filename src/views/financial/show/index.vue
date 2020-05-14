<template>
  <div>
    <div class="row bordered font"></div>
    <div class="row">
      <div class="col-md-4 bordered">
        <div class="set_container col-md-10 col-md-offset-1 bordered">
          <div class="set_9_btn-corner">
            <span class="line1"></span>
            <span class="line2"></span>
            <span class="line3"></span>
            <span class="line4"></span>
            <div ref="deal" v-if="isDeal">交易记录</div>
            <div ref="deal" v-else @click="toDeal">交易记录</div>
          </div>
          <div style="clear:both"></div>
          <div class="set_9_btn-corner">
            <span class="line1"></span>
            <span class="line2"></span>
            <span class="line3"></span>
            <span class="line4"></span>
            <div ref="dealGroup" v-if="isDealGroup">交易组列表</div>
            <div ref="dealGroup" v-else @click="toDealGroup">交易组列表</div>
          </div>
          <div style="clear:both"></div>
        </div>
      </div>

      <div class="col-md-8 table-content disabled">
        <router-view v-if="isRouteAlive"/>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "show",
    mounted() {
      this.initPage();
    },
    beforeUpdate() {
      this.initPage();
    },
    provide() {
      return {
        financialShowReload: this.reload,
      }
    },
    data() {
      return {
        isRouteAlive: true,
        isDeal: false,
        isDealGroup: false,
      }
    },
    methods: {
      reload() {
        this.isRouteAlive = false;
        this.$nextTick(() => {
          this.isRouteAlive = true;
        });
      },
      toDeal() {
        this.$router.push({
          path: '/deal/list'
        }).catch(reason => {
          console.log(reason);
        })
      },
      toDealGroup() {
        this.$router.push({
          path: '/deal/group/list'
        }).catch(reason => {
          console.log(reason);
        })
      },
      initPage() {
        let fullPath = this.$route.fullPath;
        let dealClassList = this.$refs.deal.classList;
        let dealGroupClassList = this.$refs.dealGroup.classList;
        if (fullPath.indexOf('/deal/list') !== -1) {
          dealClassList.add('active-bar');
          dealGroupClassList.remove('active-bar');
          this.isDeal = true;
          this.isDealGroup = false;
        } else if (fullPath.indexOf('/deal/group/list') !== -1) {
          dealGroupClassList.add('active-bar');
          dealClassList.remove('active-bar');
          this.isDeal = false;
          this.isDealGroup = true;
        } else {
          dealGroupClassList.remove('active-bar');
          dealClassList.remove('active-bar');
          this.isDeal = false;
          this.isDealGroup = false;
        }
      }
    }
  }
</script>

<style lang="stylus">
  .row
    margin 0

  .bordered
    height 400px

  .table-content
    padding-left 20px
    padding-right 54px

  .font
    height 80px

  .set_9_btn-corner
    padding 0 25px
    border none
    background transparent
    color #ccc
    width 100%
    float left
    text-align center
    position relative
    line-height 45px
    cursor pointer
    margin 20px 2em 20px 0

    span
      position absolute
      background-color rgba(225, 225, 225, 0.5)
      display block
      transition all 200ms

    .line1, .line3
      height 2px
      width 20px

    .line2, .line4
      height 20px
      width 2px

    .line1, .line2
      top 0
      right 0

    .line3, .line4
      bottom 0
      left 0

    &:hover, &:active
      background-color transparent
      color #fff

      .line1, .line3
        width 100%

      .line2, .line4
        height 100%

  .set_9_btn-corner.reverse
    .line1, .line3
      width 100%

    .line2, .line4
      height 100%

  .set_9_btn-corner:hover.reverse, .set_9_btn-corner:active.reverse
    .line1, .line3
      width 20px

    .line2, .line4
      height 20px

  .page-select
    margin 5px 0 0 0

  .active-bar
    color #fff

  .table-btn
    background-color transparent
    font-family "Microsoft YaHei UI", sans-serif
    border none
    color #cccccc

    &:hover, &:focus
      color #f2f2f2

  button.el-button.el-button--default
    margin-right 20px

  .el-dialog
    max-height 542px
    overflow auto

  .el-pager
    li
      background-color rgba(255,255,255,.5)!important

  .el-pagination
    button, input
      background-color rgba(255,255,255,.5)!important

  .el-table, .el-table__expanded-cell
    background-color transparent
    thead, tbody, tr, th, td
      background-color transparent
      font-family "Microsoft YaHei UI", sans-serif
      color #454545


  .el-table__body
    tr:hover > td, tr.current-row > td
      background-color rgb(169, 169, 169) !important;
</style>
