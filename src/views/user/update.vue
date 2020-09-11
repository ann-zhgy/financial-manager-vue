<template>
  <div style="width: 70%; margin: 40px auto;" v-if="profile">
    <el-form :model="profile" label-width="80px">
      <el-form-item label="昵称">
        <el-input v-model.trim="profile.nickName" style="width: 220px"></el-input>
      </el-form-item>
      <el-form-item label="性别">
        <el-radio-group style="margin-left: 30px;" v-model="profile.gender">
          <el-radio :label="1">男</el-radio>
          <el-radio :label="2">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="生日">
        <el-date-picker v-model="profile.birth" value-format="yyyy-MM-dd" type="date"></el-date-picker>
      </el-form-item>
      <el-form-item label="电子邮箱">
        <el-input readonly v-model.trim="profile.email"></el-input>
      </el-form-item>
      <el-form-item label="手机号">
        <el-input readonly v-model.trim="profile.phone"></el-input>
      </el-form-item>
      <el-button type="primary" class="center-block" @click="commitUpdate">提交更新</el-button>
    </el-form>
    <el-tooltip class="item" effect="dark" content="点击修改头像" placement="bottom">
      <el-button class="icon-button" @click.native="setIcon">
        <el-image :src="profile.icon" fit="contain"/>
      </el-button>
    </el-tooltip>
    <el-dialog title="修改头像" append-to-body :visible.sync="upload.dialogVisible" width="30%">
      <el-upload class="avatar-uploader" action="" :show-file-list="false" drag
                 :auto-upload="false" :on-change='changeUpload'>
        <img v-if="upload.imageUrl" :src="upload.imageUrl" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cannelIcon">取 消</el-button>
        <el-button type="primary" @click="confirmIcon">确 定</el-button>
      </span>
    </el-dialog>
    <!-- vueCropper 剪裁图片实现-->
    <el-dialog title="图片剪裁" :visible.sync="cropper.dialogVisible" :close-on-press-escape="false"
               :close-on-click-modal="false" append-to-body>
      <div class="cropper-content">
        <div class="cropper" style="text-align:center">
          <vueCropper ref="cropper" :img="cropper.option.img" :outputSize="cropper.option.size"
                      :outputType="cropper.option.outputType" :info="true" :canScale="cropper.option.canScale"
                      :autoCrop="cropper.option.autoCrop" :autoCropWidth="cropper.option.autoCropWidth"
                      :autoCropHeight="cropper.option.autoCropHeight" :fixedBox="cropper.option.fixedBox"
                      :fixed="cropper.option.fixed" :fixedNumber="cropper.option.fixedNumber"
                      :canMove="cropper.option.canMove" :canMoveBox="cropper.option.canMoveBox"
                      :original="cropper.option.original" :centerBox="cropper.option.centerBox"
                      :infoTrue="cropper.option.infoTrue" :full="cropper.option.full" :enlarge="cropper.option.enlarge"
                      :mode="cropper.option.mode"/>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cropper.dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="finish" :loading="cropper.loading">确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {profile, update, avatar} from '@/api/profile'
  import {del, upload} from "@/api/upload";
  import {dataURLtoFile} from "@/utils/commonUtil";

  export default {
    name: "profile-info",
    mounted() {
      profile().then(resp => this.profile = resp.data);
    },
    data() {
      return {
        profile: null,
        path: null,
        upload: {
          dialogVisible: false,
          imageUrl: '',
        },
        cropper: {
          dialogVisible: false,
          // 裁剪组件的基础配置option
          option: {
            img: '', // 裁剪图片的地址
            outputSize: 0.8, // 裁剪生成图片的质量
            outputType: 'jpeg', // 裁剪生成图片的格式
            info: true, // 裁剪框的大小信息
            canScale: true, // 图片是否允许滚轮缩放
            autoCrop: true, // 是否默认生成截图框
            autoCropWidth: 320, // 默认生成截图框宽度
            autoCropHeight: 320, // 默认生成截图框高度
            fixedBox: true, // 固定截图框大小 不允许改变
            fixed: true, // 是否开启截图框宽高固定比例
            fixedNumber: [1, 1], // 截图框的宽高比例
            canMove: true, // 上传图片是否可以移动
            canMoveBox: false, // 截图框能否拖动
            original: false, // 上传图片按照原始比例渲染
            centerBox: true, // 截图框是否被限制在图片里面
            infoTrue: true, // true 为展示真实输出图片宽高 false 展示看到的截图框宽高
            full: false, // 是否输出原图比例的截图
            enlarge: '1', // 图片根据截图框输出比例倍数
            mode: 'contain' // 图片默认渲染方式
          },
          // 防止重复提交
          loading: false
        },
      }
    },
    methods: {
      confirmIcon() {
        if (this.path !== null) {
          avatar(this.path)
            .then(resp => {
              if (resp.code === 20000) {
                this.$notify.success('头像更新成功');
                del(this.profile.icon);
                this.$store.dispatch('user/getInfo');
                profile().then(resp => this.profile = resp.data);
                this.upload.dialogVisible = false;
                this.path = null;
              } else {
                this.$notify.error('头像更新失败');
                this.delPath();
              }
            });
        } else {
          this.$message.warning('请选择头像并上传');
        }
      },
      cannelIcon() {
        this.delPath();
        this.upload.dialogVisible = false;
      },
      setIcon() {
        this.upload.dialogVisible = true;
      },
      commitUpdate() {
        let data = {};
        data.id = this.profile.id;
        data.nickName = this.profile.nickName;
        data.gender = this.profile.gender;
        data.birth = this.profile.birth;
        update(data)
          .then(resp => {
            if (resp.code === 20000) {
              this.$notify.success(resp.message);
              this.$router.push("/profile");
            } else {
              this.$notify.error(resp.message);
            }
          });
      },
      delPath() {
        if (this.path) {
          del(this.path).then(() => {
            this.path = null;
          });
        }
      },
      changeUpload(file) {
        const isImage = /^image\/\s*/;
        const isLt5M = file.size / 1024 / 1024 < 5;
        if (!isImage.test(file.raw.type)) {
          this.$message.error('文件类型不支持');
          console.log("文件类型为：" + file.raw.type);
          return false
        }
        if (!isLt5M) {
          this.$message.error('上传文件大小不能超过 5MB!');
          return false
        }

        // 上传成功后将图片地址赋值给裁剪框显示图片
        this.$nextTick(() => {
          this.cropper.option.img = URL.createObjectURL(file.raw);
          this.cropper.dialogVisible = true
        })
      },
      // 点击裁剪，这一步是可以拿到处理后的地址
      finish() {
        // 获取截图的base64 数据
        this.$refs.cropper.getCropData((data) => {
          this.cropper.loading = true;
          let formData = new window.FormData();
          let file = dataURLtoFile(data);
          formData.append('file', file);
          upload(formData).then(resp => {
            if (resp.code === 20000) {
              this.$notify.success('头像上传成功');
              this.upload.imageUrl = resp.data.path;
              this.path = resp.data.path;
            } else {
              this.$notify('头像上传失败，请检查你的网络');
            }
            this.cropper.loading = false;
            this.cropper.dialogVisible = false;
          }).catch(() => {
            this.cropper.loading = false;
          });
        })
      }
    }
  }
</script>

<style scoped>
  .cropper {
    width: auto;
    height: 320px;
  }
</style>

<style>
  .avatar-uploader {
    width: 178px;
    height: 178px;
    margin: auto;
  }

  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }

  .el-upload-dragger {
    width: 178px;
    height: 178px;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }

  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }

  .el-upload input {
    display: none;
  }
</style>
