<template>
  <portal-form :component-title="myTitle" :component-sub-title="mySubTitle" :menus="menus"/>
</template>

<script>
  export default {
    name: "plan-index",
    data() {
      return {
        myTitle: 'Plan',
        mySubTitle: '计划才是评判消费合理的标准！',
        menus: [
          {
            name: '计划列表',
            url: '/plan/list',
          },
          {
            name: '新的计划',
            url: '/plan/create',
          },
          {
            name: '计划详情',
            url: '/plan/info/-1',
          },
          {
            name: '更新计划',
            url: '/plan/update/-1',
          },
        ]
      }
    }
  }
</script>
