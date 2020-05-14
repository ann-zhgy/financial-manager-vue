<template>
  <div class="custom-container register-container">
    <div class="register-content">
      <el-form ref="registerForm" :model="registerForm" :rules="registerRules">
        <div class="title-container">
          <h3 class="title">Register Form</h3>
        </div>
        <el-form-item prop="username">
          <el-input type="text" v-model="registerForm.username" placeholder="请输入用户名"/>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" v-model="registerForm.password" placeholder="请输入密码"/>
        </el-form-item>
        <el-form-item prop="confirmPassword">
          <el-input type="password" v-model="registerForm.confirmPassword" placeholder="请再次输入密码"/>
        </el-form-item>
        <el-form-item prop="email">
          <el-autocomplete style="width: 100%" v-model="registerForm.email" :trigger-on-focus="false"
                           placeholder="请输入邮箱" :fetch-suggestions="querySearch"/>
        </el-form-item>
        <div style="margin-bottom: 10px; width: 100%">
          <el-button type="primary" style="width: 48.5%" @click="register('registerForm')">注册</el-button>
          <el-button type="primary" style="width: 48.5%" @click="reset('registerForm')">重置</el-button>
        </div>
        <router-link class="to-login" to="/login">已有账号？立即登录</router-link>
      </el-form>
    </div>
  </div>
</template>

<script>
  import {checkEmail, checkUsername, register} from '@/api/user'
  import {Message} from "element-ui";

  export default {
    name: "register",
    mounted() {
      this.emails = [
        '@qq.com', '@126.com', '@163.com', '@sina.com', '@21cn.com', '@sohu.com', '@yahoo.com.cn',
        '@tom.com', '@etang.com', '@eyou.com', '@56.com', '@x.cn', '@chinaren.com', '@sogou.com',
        '@citiz.com'];
    },
    data() {
      const usernameEnable = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('用户名不能为空'));
        } else if (!/^\w{8,}$/.test(value.trim())) {
          callback(new Error('用户名仅能包含字母、数字或者下划线，且长度不得小于8位'));
        } else {
          checkUsername(value)
            .then(resp => {
              if (resp.code === 20000) {
                if (!resp.data) {
                  callback('用户名已存在');
                } else {
                  callback();
                }
              } else {
                callback('用户名校验异常，请检查您的网络');
              }
            })
            .catch(reason => {
              console.log(reason);
              callback('用户名校验异常，请检查您的网络');
            });
        }
      };

      const confirmPassword = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.registerForm.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };

      const emailEnable = (rule, value, callback) => {
        checkEmail(value)
          .then(resp => {
            if (resp.code === 20000) {
              if (!resp.data) {
                callback('邮箱已注冊');
              } else {
                callback();
              }
            } else {
              callback('邮箱校验异常，请检查您的网络');
            }
          })
          .catch(reason => {
            console.log(reason);
            callback('邮箱校验异常，请检查您的网络');
          });
      };

      return {
        registerForm: {username: '', password: '', confirmPassword: '', email: '',},
        registerRules: {
          username: [{validator: usernameEnable, trigger: 'blur'}],
          password: [
            {required: true, message: '密码不能为空', trigger: 'blur'},
            {min: 6, message: '密码长度不得低于6位', trigger: 'change'}
          ],
          confirmPassword: [{validator: confirmPassword, trigger: 'blur'}],
          email: [
            {required: true, message: '请输入邮箱', trigger: 'blur'},
            {type: 'email', message: '邮箱格式不正确', trigger: 'blur'},
            {validator: emailEnable, trigger: 'blur'}
          ],
        },
        emails: [],
      }
    },
    methods: {
      querySearch(queryString, callback) {
        const restaurants = this.emails;
        let string = queryString.trim();
        // 输入的是空格
        if (string === '') {
          callback([]);
        }
        // 输入的不是空格
        else {
          let result = [];
          restaurants.forEach(value => {
            if (/@[a-zA-Z0-9_\-.]*$/.test(string)) {
              let suffix = /@[a-zA-Z0-9_\-.]*$/.exec(string)[0];
              if (value.indexOf(suffix) !== -1) {
                let str = string.substring(0, string.indexOf('@'));
                result.push({value: str + value});
              }
            } else {
              result.push({value: string + value});
            }
          });
          callback(result);
        }
      },
      register(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            register({
              username: this.registerForm.username,
              password: this.registerForm.password,
              email: this.registerForm.email,
            }).then(resp => {
              if (resp.code === 20000) {
                Message({
                  message: resp.message,
                  type: 'success',
                  duration: 1000
                });
                this.$router.push({path: '/login'});
              }
            });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      reset(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .to-login
    color #f2f2f2

    &:hover
      color white

  .register-container
    background-image url("~@/assets/img/20.jpg")

  .register-content
    box-sizing border-box
    width 500px
    background-color rgba(255, 255, 255, .4)
    margin 110px auto 0
    padding 24px 42px
    border-radius 10px

  .title-container
    position relative

    .title
      font-size 26px
      color #eee
      margin 0 auto 40px
      text-align center
      font-weight bold
</style>
