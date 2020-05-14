<template>
  <div v-if="family != null" class="family-content">
    <el-form ref="familyForm" :model="family" :rules="familyRules">
      <el-form-item prop="name" label="家庭名" label-width="100px">
        <el-input disabled v-model="family.name"/>
      </el-form-item>
      <el-form-item prop="intro" label="家庭简介" label-width="100px">
        <el-input disabled type="textarea" v-model="family.intro"/>
      </el-form-item>
      <el-form-item label="现有人数" label-width="100px">
        <el-input disabled v-model="family.userCount"/>
      </el-form-item>
      <el-button type="primary" class="center-block" @click="exitFamily">退出家庭</el-button>
    </el-form>
  </div>
</template>

<script>
  import {family, del, exit, members} from "@/api/family";

  export default {
    name: "family-delete",
    mounted() {
      family()
        .then(resp => {
          this.family = resp.data;
        })
    },
    data() {
      return {
        family: null,
        familyRules: {
          name: [{required: true, message: '请输入家庭名', trigger: 'blur'}],
          intro: [{required: true, message: '请输入简介', trigger: 'blur'}],
        },
        dialog: {
          data: null,
          visited: false
        },
      }
    },
    methods: {
      exitFamily() {
        exit()
          .then(resp => {
            if (resp.code === 20000) {
              this.$notify.success(resp.message + '，1秒后重定向到家庭管理首页');
              setTimeout(() => location.href = '/family', 1000);
            } else {
              this.$notify.error('退出家庭失败');
            }
          })
      },
    }
  }
</script>

<style lang="stylus">
  .el-form-item__label
    opacity 0.8
</style>
