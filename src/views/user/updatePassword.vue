<template>
  <div style="width: 60%; margin: 30px auto 0">
    <el-form :model="pass" status-icon :rules="passRules" ref="passwordForm" label-width="80px" class="demo-ruleForm">
      <el-form-item label="旧密码" prop="oldPassword">
        <el-input type="password" v-model="pass.oldPassword" />
      </el-form-item>
      <el-form-item label="新密码" prop="newPassword">
        <el-input type="password" v-model="pass.newPassword" />
      </el-form-item>
      <el-form-item label="确认密码" prop="confirmPassword">
        <el-input type="password" v-model="pass.confirmPassword" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('passwordForm')">提交</el-button>
        <el-button @click="resetForm('passwordForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import {password} from "@/api/profile";

  export default {
    name: "updatePassword",
    data() {
      const confirmPassword = (rule, value, callback) => {
        if (!value) {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.pass.newPassword) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        pass: {
          oldPassword: null,
          newPassword: null,
          confirmPassword: null,
        },
        passRules: {
          oldPassword: [{ required: true, message: '请输入旧密码', trigger: 'blur' }],
          newPassword: [{ required: true, message: '请输入新密码', trigger: 'blur' }],
          confirmPassword: [{ validator: confirmPassword, trigger: 'blur' }],
        }
      }
    },
    methods: {
      submitForm(formName) {
        let store = this.$store;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            password({
              oldPassword: this.pass.oldPassword,
              newPassword: this.pass.newPassword,
            }).then(resp => {
              this.$alert(resp.code === 20000 ? '修改密码成功' : '修改密码失败', '提示', {
                confirmButtonText: '确定',
                callback: action => {
                  if (action === 'confirm') {
                    if (resp.code === 20000) {
                      store.dispatch('user/resetToken').then(() => {
                        location.reload()
                      })
                    }
                  }
                }
              });
            });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>

<style scoped>

</style>
