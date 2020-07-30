<template>
  <div class="register">
    <login-top middleTop="登录bilibili">
      <div slot="right" @click="$router.push('/register')">用户注册</div>
    </login-top>

    <login-text
      label="账户"
      rule="^.{6,16}$"
      placeholder="请输入账户"
      @inputChange="content => model.username = content"
      style="margin:4.167vw 0"
    />
    <login-text
      label="密码"
      rule="^.{6,16}$"
      type="password"
      placeholder="请输入密码"
      @inputChange="content => model.password = content"
    />

    <login-btn btnText="登录" @registerSubmit="registerSubmit" />
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
      if (rulg.test(this.model.uesrname) && rulg.test(this.model.password)) {
        const res = await this.$http.post("/login", this.model);
        this.$msg.fail(res.data.msg);
        localStorage.setItem("id", res.data.id);
        localStorage.setItem("token", res.data.token);
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