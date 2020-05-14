<template>
  <div style="width: 70%; margin: 40px auto 0;" v-if="profile">
    <el-form :model="profile" label-width="80px">
      <el-form-item label="用户名">
        <el-input readonly v-model="profile.username" style="width: 220px"></el-input>
      </el-form-item>
      <el-form-item label="昵称">
        <el-input readonly v-model.trim="profile.nickName" style="width: 220px"></el-input>
      </el-form-item>
      <el-form-item label="性别">
        <el-select v-model="profile.gender">
          <el-option v-if="profile.gender === 1" :value="1" label="男"></el-option>
          <el-option v-if="profile.gender === 2" :value="2" label="女"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="生日">
        <el-input readonly v-model.trim="profile.birth"></el-input>
      </el-form-item>
      <el-form-item label="电子邮箱">
        <el-input readonly v-model.trim="profile.email"></el-input>
      </el-form-item>
      <el-form-item label="手机号">
        <el-input readonly v-model.trim="profile.phone"></el-input>
      </el-form-item>
      <el-form-item label="注册时间">
        <el-input readonly v-model.trim="profile.created"></el-input>
      </el-form-item>
      <el-form-item v-if="profile.familyId" label="家庭" prop="name">
        <el-button type="text" @click="getFamilyInfo">点击查看家庭信息</el-button>
      </el-form-item>
    </el-form>
    <el-tooltip class="item" effect="dark" content="头像" placement="bottom">
      <el-button class="icon-button">
        <el-image :src="profile.icon" fit="contain"/>
      </el-button>
    </el-tooltip>
    <el-dialog :append-to-body="true" v-if="familyDialog.data !== null" :visible.sync="familyDialog.visited"
               title="家庭信息">
      <el-form :model="familyDialog.data">
        <el-form-item label="家庭名称" label-width="120px">
          <el-input readonly v-model="familyDialog.data.name"/>
        </el-form-item>
        <el-form-item label="家庭简介" label-width="120px">
          <el-input readonly v-model="familyDialog.data.intro"/>
        </el-form-item>
        <el-form-item label="成员数量" label-width="120px">
          <el-input readonly v-model="familyDialog.data.userCount"/>
        </el-form-item>
        <el-form-item label="我的身份" label-width="120px">
          <el-input readonly v-model="familyDialog.data.identity.description"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="familyDialog.visited = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {profile} from '@/api/profile'
  import {family} from '@/api/family'

  export default {
    name: "profile-info",
    mounted() {
      profile().then(resp => this.profile = resp.data);
    },
    data() {
      return {
        profile: null,
        familyDialog: {
          visited: false,
          data: null
        }
      }
    },
    methods: {
      getFamilyInfo() {
        if (this.familyDialog.data === null) {
          family().then(resp => {
            if (resp.code === 20000) {
              this.familyDialog.data = resp.data;
              this.familyDialog.visited = true;
            } else {
              this.$notify.warning("获取家庭信息失败，请检查您的网络");
            }
          });
        } else {
          this.familyDialog.visited = true;
        }
      }
    }
  }
</script>
