<template>
  <div class="family-content">
    <el-form ref="familyForm" :model="family" :rules="familyRules">
      <el-form-item prop="name" label="家庭名" label-width="100px">
        <el-input v-model="family.name" />
      </el-form-item>
      <el-form-item prop="intro" label="家庭简介" label-width="100px">
        <el-input type="textarea" v-model="family.intro" placeholder="简介"/>
      </el-form-item>
      <div style="margin: auto; width: 70px">
        <el-button type="primary" @click="commit('familyForm')">创建</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
  import {save} from '@/api/family'

  export default {
    name: "family-create",
    data() {
      return {
        family: {
          name: null,
          intro: null
        },
        familyRules: {
          name: [{required: true, message: '请输入家庭名', trigger: 'blur'}],
          intro: [{required: true, message: '请输入简介', trigger: 'blur'}],
        }
      }
    },
    methods: {
      commit(formName) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            save(this.family)
              .then(resp => {
                if (resp.code === 20000) {
                  this.$message.success(resp.message + '，1秒后重定向到信息页');
                  setTimeout(() => location.href = '/family', 1000);
                } else {
                  this.$message.error('创建家庭失败');
                }
              })
          }
        });
      }
    }
  }
</script>
