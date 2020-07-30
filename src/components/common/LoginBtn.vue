<template>
  <div class="btn-box" @click="registerClick"> 
      <div class="btn" >{{btnText}}</div>
  </div>
</template>

<script>
export default {
    props:['btnText'],
    methods:{
        registerClick(){
            this.$emit('registerSubmit')
        }
    }
}
</script>

<style lang="less">
    .btn-box{
        padding: 4.167vw 2.778vw;
        .btn{
            display: flex;
            justify-content: center;
            align-items: center;
            height: 45px;
            background: #ff9db5;
            color: white;
            border-radius: 22.5px;
        }
    }
</style>