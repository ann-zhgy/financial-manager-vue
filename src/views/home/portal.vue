<template>
  <div class="custom-container home-content-position">
    <div class="clear-fix bg bg-box-3">
      <div id="wrap">
        <ul>
          <li>
            <div class="home3 overflow">
              <p>更多精彩</p>
              <ul class="Team">
                <li style="padding-left: 80px;padding-top:160px">敬请期待！</li>
                <li style="padding-left: 80px">我们期待你的加入！！！φ(≧ω≦*)♪</li>
              </ul>
            </div>
          </li>
          <li>
            <div class="home2 overflow">
              <p>关于用户</p>
              <ul class="Team">
                <li style="padding-left: 20px;padding-top:80px" class="th1">适合于所有希望对自己财物有一个统一的、形象的计划的人群</li>
                <li style="padding-left: 20px" class="th1">┗|｀O′|┛ 嗷~~</li>
              </ul>
            </div>
          </li>
          <li>
            <div class="home1 overflow">
              <p>关于产品</p>
              <ul class="Team">
                <li style="padding-left: 80px;padding-top:70px" class="th">这是一款基于web的家庭财务管理系统</li>
                <li style="padding-left: 20px;padding-top:32px" class="th">
                  家庭是一个小小的管理单元，财务的收入与支出是一个零碎而又与切身利益相关的问题
                </li>
                <li style="padding-left: 20px" class="th"> 用户可以随时记录自己的收入、支出等信息，另外为了保护自己的隐私，还可以设置密码。</li>
                <li style="padding-left: 20px" class="th">
                  我们产品可以有效地帮助合理规划和支配资金，可以通过分析来获得家庭成员在一段时期内的消费和收入信息，是家庭理财的好帮手
                </li>
              </ul>
            </div>
          </li>
          <li class="curr">
            <div class="home">
              <p>关于技术</p>
              <ul class="Team">
                <li style="padding-left: 40px;padding-top:80px">微服务：应高并发而产生的软件架构</li>
                <li style="padding-left: 40px;padding-top:20px">前后端分离：前后端之间的终极解耦</li>
                <li style="padding-left: 40px;padding-top:20px">spring cloud：微服务架构主流标准</li>
                <li style="padding-left: 40px;padding-top:20px">Vue：前台开发框架的后起之秀</li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "portal",
    data: () => {
      return {
        isMore: false,
        isAboutUser: false,
        isProduction: false,
        isTechnology: true
      };
    },
    mounted: () => {
      let lis = $('#wrap > ul > li');
      let bgDiv = $('.bg');
      let divs = $('#wrap > ul > li > div');
      lis.each(function (index) {
        $(this).mouseover(() => {
          if (!$(this).hasClass('curr')) {
            $('#wrap > ul > li').removeClass('curr');
            $(this).addClass('curr');
          }
          if ($(this).hasClass('curr')) {
            bgDiv.removeClass('bg-box-0 bg-box-1 bg-box-2 bg-box-3');
            bgDiv.addClass('bg-box-' + index);
          }

          $('.curr').stop().animate({
            width: 700
          }, 500, 'linear');
          lis.not('.curr').stop().animate({
            width: 100
          }, 500, 'linear');
        });

        divs.mouseover(function () {
          if ($(this).hasClass('overflow')) {
            divs.addClass('overflow');
            $(this).removeClass('overflow');
          }
        });
      })
    },
  }
</script>

<style lang="stylus" scoped>
  .bg
    width 100%
    height 675px

  for num in 1 2 3 4
    .bg-box-{num - 1}
      $url = '~@/assets/img/' + num + '.jpg'
      background url($url) no-repeat center / cover

  #wrap
    margin 100px auto 0
    width 1000px
    height 400px
    ul
      width 120%
      list-style none
    > ul > li
      overflow hidden
      float left
      width 100px
      height 400px
      cursor pointer
      > div
        width 100px
        height 100%
        background #000
        opacity .6
        p
          padding 20px 40px
          font-family 'Microsoft yahei', sans-serif
          color #fff
      .Team
        width 600px
        height 100%
        font-family 'Microsoft yahei', monospace
        color #fff
        font-size 30px
        line-height normal
        margin -130px -130px -130px 100px
        p
          padding-top 30px
        ul > li
          padding-top 20px
          font-size 20px
          color #FFF
      > .overflow
        overflow hidden

  #wrap > ul > li:nth-child(1)
    background url('~@/assets/img/1.jpg') no-repeat center / cover

  #wrap > ul > li:nth-child(2)
    background url('~@/assets/img/2.jpg') no-repeat center / cover

  #wrap > ul > li:nth-child(3)
    background url('~@/assets/img/3.jpg') no-repeat center / cover

  #wrap > ul > li:nth-child(4)
    background url('~@/assets/img/4.jpg') no-repeat center / cover
    width 700px

  .th
    color #ffb6c1
    font-size 26px

  .th1
    color #ffa500
</style>
