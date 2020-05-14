<template>
  <div class="home-content-position">
    <div id="top">
      <h2>{{ componentTitle }}</h2>
      <div id="topTags">
        <span>{{ componentSubTitle }}</span>
      </div>
    </div>
    <div id="main">
      <div id="leftMenu">
        <ul ref="menusUl">
          <li v-for="menu in menus"><router-link :to="menu.url" active-class="color">{{ menu.name }}</router-link></li>
        </ul>
      </div>

      <div id="content">
        <router-view class="position-center" v-if="isRouteAlive" />
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    provide() {
      return {
        portalFormReload: this.reload,
      }
    },
    beforeUpdate() {
      let path = this.$route.path;
      let reg = /\/[a-zA-Z]+\/(\S*)\/(-)?\d+/;
      let str = reg.test(path) ? path.match(reg)[1] : path;
      let aList = this.$refs.menusUl.getElementsByTagName('a');
      for (let a of aList) {
        a.classList.remove("color");
      }
      for (let a of aList) {
        let aHref = a.getAttribute("href");
        if (aHref.indexOf(str) !== -1) {
          a.classList.add("color");
        }
      }
    },
    props: {
      menus: { type: Array, required: true },
      componentTitle: { type: String, required: true },
      componentSubTitle: { type: String, required: true },
    },
    data() {
      return {
        isRouteAlive: true,
      }
    },
    methods: {
      reload() {
        this.isRouteAlive = false;
        this.$nextTick(() => {
          this.isRouteAlive = true;
        });
      }
    }
  }
</script>

<style lang="stylus" scoped>
  ul, li, h2
    margin 0
    padding 0

  ul
    list-style none

  #top
    width 900px
    height 40px
    margin 0 auto
    background-color #cccc00
    h2
      width 150px
      height 40px
      background-color #f5f5f5
      float left
      font-size 14px
      text-align center
      line-height 40px

  #topTags
    width 750px
    height 40px
    margin 0 auto
    text-align center
    line-height 40px
    background-color #b0c4de
    float left
    ul li
      float left
      width 100px
      height 40px
      margin-right 5px
      display block
      text-align center
      cursor pointer
      padding-top 15px

  #main
    width 900px
    height 500px
    margin 0 auto
    background-color #F5F7E6

  #leftMenu
    width 150px
    height 500px
    background-color #BDB76B
    float left
    ul
      margin 10px
      li
        width 130px
        height 30px
        display block
        background #808000
        cursor pointer
        line-height 30px
        text-align center
        margin-bottom 5px
        text-decoration none
        a
          color #000000
          text-decoration none

  #content
    width 750px
    height 500px
    float left
    padding 5px 10px
    position relative
    overflow scroll
    scrollbar-width none
    -ms-overflow-style none
    &::-webkit-scrollbar
      display none !important

  .color
    color #FFF !important

  .no-data
    font-size 20px
    font-weight bolder
    color #454545
    text-align center
    margin 180px auto 0
</style>

<style lang="stylus">
  a
    &:hover
      text-decoration none
</style>
