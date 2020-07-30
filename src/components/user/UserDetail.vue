<template>
  <div class="userdetail">
    <div class="shang">
      <img :src="userInfo.user_img" alt class="ava" v-if="userInfo.user_img" />
      <img src="@/assets/default_img.jpg"  class="ava"  alt v-else />
      <div class="info">
        <p>
          <span>0</span>
          <span>粉丝</span>
        </p>
        <p>
          <span>54</span>
          <span>关注</span>
        </p>
        <p>
          <span>0</span>
          <span>获赞</span>
        </p>
        <div class="bianji" @click="$router.push('/edit')">编辑资料</div>
      </div>
      <span class="name">{{userInfo.name}}</span>
        <span v-if="userInfo.user_desc">{{userInfo.user_desc}}</span>
      <span v-else>这个人很神秘，什么都没有写</span>
    </div>
    <div class="video">
      <div>动态</div>
      <div>视频</div>
    </div>
  </div>
</template>

<script>
export default {
    props:['userInfo']
};
</script>

<style lang="less">
.userdetail {
  .shang {
    display: flex;
    flex-wrap: wrap;
    padding: 3.333vw 3.333vw 1.333vw 3.333vw;
    background-color: #fff;
    border-bottom: 0.278vw solid #dddddd;

    .ava {
      width: 24.722vw;
      height: 24.722vw;
      border-radius: 12.361vw;
      margin-right: 5.833vw;
    }
    .info {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      flex: 1;
      p {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 10vw;
        width: 33%;
        color: #aaaaaa;
        font-size: 3.611vw;
        &:nth-child(-n + 2) {
          border-right: 0.278vw solid #cccccc;
        }
        span:first-child {
          color: #666;
        }
      }
      .bianji {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 61.111vw;
        height: 8.056vw;
        border: 0.278vw solid #fb7a9f;
        border-radius: 1.667vw;
        color: #fb7a9f;
        font-size: 4.444vw;
      }
    }
    > span {
      display: block;
      width: 100%;
      margin-top: 3.333vw;
      color: #999999;
      font-size: 4.444vw;
      padding-bottom: 0.833vw;
    }
    .name{
        font-size: 20px;
        color: #555;
    }
  }
}

.video {
  display: flex;
  align-items: center;
  height: 6.944vw;
  padding: 1.333vw;
  font-size: 4.444vw;
  color: #8a8a8a;
  div {
    padding: 2.222vw;
  }
}
</style>