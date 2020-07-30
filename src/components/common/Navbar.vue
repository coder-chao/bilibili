<template>
  <div class="navbar">
      <div class="logo">
          <img src="@/assets/logo.png" alt="">
      </div>
      <div class="shuru">
          <van-icon name="search" class="fang" />
          <div class="kuang"></div>
          <span>请输入内容</span>
      </div>
      <div>
          <img :src="imgUrl" alt="" @click="$router.push('/edit')" v-if="imgUrl">
          <img src="@/assets/default_img.jpg" alt="" v-else @click="$router.push('/login')">
          <a href="">下载App</a>
      </div>
  </div>
</template>

<script>
export default {
    data(){
        return{
            imgUrl:''
        }
    },
    async mounted(){
        if(localStorage.getItem('token')){
            const res = await this.$http.get('/user/'+localStorage.getItem('id'))
        this.imgUrl = res.data[0].user_img
        }
    }
}
</script>

<style scoped lang="less">
.navbar{
    display: flex;
    width: 100%;
    height: 12.5vw;
    background-color: #fff;
    .logo{
        width: 120px;
        display: flex;
        justify-content: center;
        align-items: center;
        img{
            width: 100%;
        }
    }
    .shuru{
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        flex: 1;
        .fang{
            display: flex;
            justify-content: center;
            align-items: center;
            width: 4.444vw;
            height: 4.444vw;
            position: absolute;
            left: 4.444vw;
            top: 50%;
            transform: translateY(-50%);
            color: #B6B6B6;
        }
        .kuang{
            width: 41.389vw;
            height: 6.944vw;
            border-radius: 6.944vw / 2;
            padding-left: 16px;
            margin-right: 10px;
            outline: 0;
            border: 0;
            background-color: #F4F4F4;
            
        }
        span{
            position: absolute;
            color: #B6B6B6;
            font-size: 3.333vw;
        }
    }
    div:nth-child(3){
        width: 33.889vw;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        img{
            width: 7.222vw;
            height: 7.222vw;
            border-radius: 50%;
        }
        a{
            display: flex;
            justify-content: center;
            align-items: center;
            width: 18vw;
            height: 7vw;
            margin: 0 1.222vw;
            border-radius: 4px;
            font-size: 3.611vw;
            color: #fff;
            background-color: #FB7299;
        }
    }
}
</style>