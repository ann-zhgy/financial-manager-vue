<template>
  <div class="row">
    <div class="col-md-6 col-md-offset-3" id="grid">
      <div class="row ">
        <div class="cell col-md-4"></div>
        <div class="cell col-md-4" id="top"></div>
        <div class="cell col-md-4"></div>
      </div>
      <div class="row ">
        <div class="cell col-md-4" id="left">
          <a href="/deal/create">
            <i class="el-icon-edit"/><br>
            <span>创建交易记录</span>
          </a>
        </div>
        <div class="cell col-md-4" id="center">
          <div id="divImg"></div>
        </div>
        <div class="cell col-md-4" id="right">
          <a href="/deal/group/create">
            <i class="el-icon-edit"/><br>
            <span>创建交易记录分组</span>
          </a>
        </div>
      </div>
      <div class="row ">
        <div class="cell col-md-4"></div>
        <div class="cell col-md-4" id="bottom"></div>
        <div class="cell col-md-4"></div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "create"
  }
</script>

<style lang="stylus" scoped>
  custom-border-image($direction)
    border 1px solid
    if $direction == top || $direction == bottom
      border-bottom none
      border-top none
    if $direction == left || $direction == right
      border-left none
      border-right none
    border-image linear-gradient($direction, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1)) 1 1
    -o-border-image -o-linear-gradient($direction, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1)) 1 1
    -moz-border-image -moz-linear-gradient($direction, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1)) 1 1
    -webkit-border-image -webkit-linear-gradient($direction, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1)) 1 1

  cell-div($borderColor = #fff)
    text-align center
    vertical-align middle
    display block
    margin auto
    width 120px
    height 120px
    border-radius 50%
    border 2px solid $borderColor
    color #5C6262

  .row
    margin 0 auto

  #grid
    padding-top 40px

  #top
    custom-border-image(top)

  #left
    custom-border-image(left)

  #center
    border 1px solid #fff

  #right
    custom-border-image(right)

  #bottom
    padding-top 28px
    custom-border-image(bottom)

  #left, #right, #center
    padding-top 14px

  .cell
    height 150px
    background-color transparent
    div
      cell-div(#fff)
      padding-top 12px
      font-size 3em
      background rgba(225, 225, 225, 0.5)
    a
      cell-div(#ddd)
      padding-top 15px
      text-decoration none
      i
        font-size 3em
      span
        font-size 1.3em
      &:hover
        border 2px solid #fff
        background rgba(225, 225, 225, 0.5)
        transition all 0.3s ease
        -webkit-transition all 0.3s ease
        -moz-transition all 0.3s ease
        -o-transition all 0.3s eas

  #divImg
    background-image url('~@/assets/img/60.png')
    background-size contain
</style>
