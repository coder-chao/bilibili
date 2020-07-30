<template>
  <div class="userinfo">
      <Navbar></Navbar>
      <img class="bannerTop" src="@/assets/bannerTop_new.png" alt="">
      <user-detail :userInfo="model"></user-detail>
  </div>
</template>

<script>
import Navbar from '@/components/common/Navbar'
import UserDetail from '@/components/user/UserDetail'

export default {
    data(){
        return{
            model:{}
        }
    },
    components:{
        Navbar,
        UserDetail
    },
    methods:{
        async getUserInfo(){
            const id = localStorage.getItem('id')
            const token = localStorage.getItem('token')
            const res = await this.$http.get('user/'+id)
            this.model=res.data[0]
            
        }
    },
    created(){
        this.getUserInfo()
    }

}
</script>

<style lang="less">
.userinfo{
    .bannerTop{
        width: 100%;
        height: 91px;
    }

}
</style>