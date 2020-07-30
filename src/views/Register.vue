<template>
  <div class="register">
    <login-top middleTop="注册bilibili">
      <div slot="right" @click="$router.push('/login')">用户登录</div>
    </login-top>
    <login-text
      label="姓名"
      placeholder="请输入姓名"
      rule="^.{6,16}$"
      style="margin:4.167vw 0"
      @inputChange="content => model.name = content"
    />
    <login-text
      label="账户"
      rule="^.{6,16}$"
      placeholder="请输入账户"
      @inputChange="content => model.username = content"
    />
    <login-text
      label="密码"
      rule="^.{6,16}$"
      type="password"
      placeholder="请输入密码"
      @inputChange="content => model.password = content"
    />

    <login-btn btnText="注册" @registerSubmit="registerSubmit" />
  </div>
</template>

<script>
import LoginTop from "@/components/common/LoginTop";
import LoginText from "@/components/common/LoginText";
import LoginBtn from "@/components/common/LoginBtn";

export default {
  data() {
    return {
      model: {
        name: "",
        username: "",
        password: "",
      },
    };
  },
  components: {
    LoginTop,
    LoginText,
    LoginBtn,
  },
  methods: {
    async registerSubmit() {
      let rulg = /^.{6,16}$/;
      if (
        rulg.test(this.model.name) &&
        rulg.test(this.model.uesrname) &&
        rulg.test(this.model.password)
      ) {
        const res = await this.$http.post("/register", this.model);
        this.$msg.fail(res.data.msg);
        localStorage.setItem('id',res.data.id)
        localStorage.setItem('token',res.data.objtoken)
        if(res.data.code===200){
            setTimeout(() => {
            this.$router.push('/userinfo')
        }, 1000);
        }
      } else {
        this.$msg.fail("格式不正确，请重新输入");
      }
    },
  },
};
</script>

<style>
</style>