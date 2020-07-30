<template>
  <div>
    <Navbar style="margin-bottom:4.167vw" />
    <div class="uploadFile">
      <van-uploader preview-size="100vw" :after-read="afterRead" class="uploadimg" />
      <EditBanner left="头像" class="ava">
        <img :src="model.user_img" alt slot="right" v-if="model.user_img" />
        <img src="@/assets/default_img.jpg" alt slot="right" v-else />
      </EditBanner>
    </div>
    <EditBanner left="昵称" @bannerClick="show=true">
      <a href="javascript:;" slot="right">{{model.name}}</a>
    </EditBanner>
    <EditBanner left="账户">
      <a href="javascript:;" slot="right">{{model.username}}</a>
    </EditBanner>
    <EditBanner left="性别" @bannerClick="gendershow=true">
      <a href="javascript:;" slot="right">{{model.gender===1?'男':'女'}}</a>

    </EditBanner>
    <EditBanner left="个性签名" @bannerClick="textshow=true"></EditBanner>
    <van-dialog
      v-model="show"
      title="昵称"
      show-cancel-button
      @confirm="confirm"
      @cancel="content=''"
    >
      <van-field v-model="content" autofocus />
    </van-dialog>
    <van-dialog
      v-model="textshow"
      title="个性签名"
      show-cancel-button
      @confirm="textAreaClick"
      @cancel="content=''"
    >
      <van-field v-model="content" type="textarea" autofocus />
    </van-dialog>

    <van-action-sheet v-model="gendershow" :actions="actions" @select="onSelect" cancel-text="取消" />

    <div class="editback" @click="$router.back()">
        返回个人中心
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/common/Navbar";
import EditBanner from "@/components/common/EditBanner";

export default {
  data() {
    return {
      model: {},
      show: false,
      content: "",
      textshow: false,
      gendershow: false,
      actions: [
          { name: "男",val:1 }, 
          { name: "女",val:0 }, 
          ],
    };
  },
  components: {
    Navbar,
    EditBanner,
  },
  methods: {
    async selectUser() {
      const id = localStorage.getItem("id");
      const res = await this.$http.get("user/" + id);
      this.model = res.data[0];
    },
    async afterRead(file) {
      const fromdata = new FormData();
      fromdata.append("file", file.file);
      const res = await this.$http.post("/upload", fromdata);
      this.model.user_img = res.data.url;
      this.userUpdate();
    },
    async userUpdate() {
      const res = await this.$http.post(
        "/update/" + localStorage.getItem("id"),
        this.model
      );
      if(res.data.code == 200){
               this.$msg.fail('修改成功')
           } 
    },
    confirm() {
      this.model.name = this.content;
      this.userUpdate();
      this.content = "";
    },
    textAreaClick() {
      this.model.user_desc = this.content;
      this.userUpdate();
      this.content = "";
    },
    onSelect(data){
        this.model.gender = data.val
        this.userUpdate();
        this.gendershow = false
    }
  },
  created() {
    this.selectUser();
  },
};
</script>

<style lang="less">
.ava {
  img {
    width: 46px;
    height: 46px;
    border-radius: 50%;
  }
}
.uploadFile {
  position: relative;
  overflow: hidden;
  .uploadimg {
    position: absolute;
    opacity: 0;
  }
}
.editback{
    margin-top: 5.556vw;
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    color: #999;
    padding: 4.167vw 0;
    font-size: 4vw;
}
</style>