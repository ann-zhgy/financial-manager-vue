<template>
  <div v-if="family != null" class="family-content">
    <el-form ref="familyForm" :model="family" :rules="familyRules">
      <el-form-item prop="name" label="家庭名" label-width="100px">
        <el-input v-model="family.name"/>
      </el-form-item>
      <el-form-item prop="intro" label="家庭简介" label-width="100px">
        <el-input type="textarea" v-model="family.intro"/>
      </el-form-item>
      <el-form-item label="我的身份" label-width="100px">
        <el-input readonly v-model="family.identity.description"/>
      </el-form-item>
      <el-form-item label="现有人数" label-width="100px">
        <el-input readonly v-model="family.userCount"/>
      </el-form-item>
      <el-form-item label="家庭成员" label-width="100px">
        <el-button type="text" @click="getMember()">点击查看家庭成员</el-button>
      </el-form-item>
      <el-form-item label="创建时间" label-width="100px">
        <el-input readonly v-model="family.created"/>
      </el-form-item>
      <el-button type="primary" class="center-block" @click="commit('familyForm')">提交更新</el-button>
    </el-form>
    <el-dialog :append-to-body="true" v-if="dialog.data !== null" title="家庭成员" :visible.sync="dialog.visited">
      <el-table :data="dialog.data" :style="{width: (isCreator || isAdmin ? '93.5%' : '82.4%'), margin: 'auto'}">
        <el-table-column property="name" label="姓名" :show-overflow-tooltip="true" width="100"/>
        <el-table-column label="性别" width="60">
          <template slot-scope="scope">{{scope.row.gender === 1 ? '男' : scope.row.gender === 2 ? '女' : ''}}</template>
        </el-table-column>
        <el-table-column label="身份" width="80">
          <template slot-scope="scope">
            <el-link v-if="isCreator && scope.row.identity.id !== 1" type="primary"
                     @click="updateMemberIdentity(scope.row.id)">
              {{scope.row.identity.description}}
            </el-link>
            <span v-else>{{scope.row.identity.description}}</span>
          </template>
        </el-table-column>
        <el-table-column property="email" label="email" width="180"/>
        <el-table-column property="phone" label="手机号" width="180"/>
        <el-table-column v-if="isCreator || isAdmin" label="操作" width="80">
          <template slot-scope="scope">
            <div v-if="scope.row.identity.id !== 1">
              <el-link v-if="isCreator" type="primary" @click="exitFamily(scope.row.id)">
                踢出家庭
              </el-link>
              <el-link v-else-if="isAdmin && scope.row.identity.id !== 2" type="primary" @click="exitFamily(scope.row.id)">
                踢出家庭
              </el-link>
              <el-link v-else type="primary" disabled>
                无操作
              </el-link>
            </div>
            <el-link v-else type="primary" disabled>
              无操作
            </el-link>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
  import {family, members, admin, update, exit} from '@/api/family'

  export default {
    name: "family-info",
    inject: ['portalFormReload'],
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
    computed: {
      isCreator() {
        return this.$store.getters.identity.id === 1;
      },
      isAdmin() {
        return this.$store.getters.identity.id === 2;
      }
    },
    methods: {
      getMember() {
        if (!this.dialog.data) {
          members()
            .then(resp => {
              this.dialog.data = resp.data;
              this.dialog.visited = true;
            });
        } else {
          this.dialog.visited = true;
        }
      },
      updateMemberIdentity(id) {
        admin(id).then(resp => {
          if (resp.code === 20000) {
            this.$notify.success(resp.message);
          } else {
            this.$notify.error(resp.message);
          }
          members()
            .then(resp => {
              this.dialog.data = resp.data;
            });
        })
      },
      exitFamily(id) {
        exit(id)
          .then(resp => {
            if (resp.code === 20000) {
              this.$notify.success(resp.message);
            } else {
              this.$notify.error(resp.message);
            }
            members()
              .then(resp => {
                this.dialog.data = resp.data;
              });
          })
      },
      commit(formName) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            let data = {};
            data.id = this.family.id;
            data.intro = this.family.intro;
            data.name = this.family.name;
            update(data).then(resp => {
              if (resp.code === 20000){
                this.$notify.success(resp.message);
                this.$router.push({path: '/family/info'})
              } else {
                this.$notify.success('更新失败，请检查您的网络');
              }
            })
          }
        });
      }
    }
  }
</script>

<style scoped>

</style>
