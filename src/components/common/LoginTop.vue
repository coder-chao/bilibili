<template>
  <div class="login">
    <div class="top">
        <div class="item"></div>
        <div class="item">{{middleTop}}</div>
        <div class="item">
            <slot name="right"/>
        </div>
    </div>
  </div>
</template>

<script>
export default {
    props:['middleTop']
};
</script>

<style lang='less'>
    .top{
        height: 45px;
        background-color: #fff;
        display: flex;
        align-items: center;
        .item{
            display: flex;
            justify-content: center;
            align-items: center;
            flex: 1;
            font-size: 4.444vw;
        }
    }
</style>