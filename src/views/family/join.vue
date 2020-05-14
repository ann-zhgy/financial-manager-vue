<template>
  <div class="family-content">

    <div style="text-align: center; line-height: 70px; height: 70px; margin-bottom: 50px;">
      <span v-if="family === null" style="color: #454545; font-size: 2rem">请输入创建者用户名来查询家庭以加入</span>
      <span v-if="family !== null" style="color: #454545; font-size: 2rem">请点击‘加入’按钮以申请加入这个家庭</span>
    </div>

    <el-form v-if="family === null" @submit.native.prevent>
      <el-form-item label="用户名" label-width="100px">
        <el-input v-model="username"/>
      </el-form-item>
      <el-form-item label-width="100px">
        <el-button style="margin: auto;" native-type="submit" type="primary" @click="info">搜索</el-button>
      </el-form-item>
    </el-form>

    <el-form v-if="family !== null" :model="family">
      <el-form-item prop="name" label="家庭名" label-width="100px">
        <el-input readonly v-model="family.name"/>
      </el-form-item>
      <el-form-item prop="intro" label="家庭简介" label-width="100px">
        <el-input readonly type="textarea" v-model="family.intro" placeholder="简介"/>
      </el-form-item>
      <el-form-item prop="intro" label-width="100px">
        <div style="margin: auto; width: 51%">
          <el-button type="primary" @click="commit">加入</el-button>
          <el-button @click="reset">重新搜索</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import {family, join} from "@/api/family";

  export default {
    name: "join",
    inject: ['portalFormReload'],
    data() {
      return {
        username: null,
        family: null,
      }
    },
    methods: {
      info() {
        family(this.username).then(resp => {
          if (resp.code === 20000) {
            this.family = resp.data;
          } else {
            this.$message.error('请求失败，请检查您的网络并重试');
          }
          this.username = null;
        });
      },
      commit() {
        join(this.family.id).then(resp => {
          if (resp.code === 20000) {
            this.$notify.success(resp.message + '，1秒后重定向到家庭管理首页');
            setTimeout(() => location.href = '/family', 1000);
          } else {
            this.$notify.success('加入家庭失败');
          }
        });
      },
      reset() {
        this.family = null;
        this.username = null;
      },
    }
  }
</script>

<style scoped>

</style>
