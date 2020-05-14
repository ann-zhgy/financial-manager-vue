<template>
  <div v-if="family != null" class="family-content">
    <el-form ref="familyForm" :model="family">
      <el-form-item label="家庭名" label-width="100px">
        <el-input readonly v-model="family.name"/>
      </el-form-item>
      <el-form-item label="家庭简介" label-width="100px">
        <el-input readonly type="textarea" v-model="family.intro"/>
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
    </el-form>
    <el-dialog :append-to-body="true" v-if="dialog.data !== null" title="家庭成员" :visible.sync="dialog.visited">
      <el-table :data="dialog.data" style="width: 93.5%; margin: auto;">
        <el-table-column property="name" label="姓名" width="120"/>
        <el-table-column label="性别" width="60">
          <template slot-scope="scope">{{scope.row.gender === 1 ? '男' : scope.row.gender === 2 ? '女' : ''}}</template>
        </el-table-column>
        <el-table-column property="identity.description" label="身份" width="120"/>
        <el-table-column property="email" label="email" width="180"/>
        <el-table-column property="phone" label="手机号" width="180"/>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
  import {family, members} from '@/api/family'

  export default {
    name: "family-info",
    mounted() {
      family()
        .then(resp => {
          this.family = resp.data;
        })
    },
    data() {
      return {
        family: null,
        dialog: {
          data: null,
          visited: false
        },
      }
    },
    methods: {
      getMember() {
        if (!this.family.members) {
          members()
            .then(resp => {
              this.dialog.data = resp.data;
              this.dialog.visited = true;
            });
        } else {
          this.dialog.visited = true;
        }
      }
    }
  }
</script>

<style scoped>

</style>
