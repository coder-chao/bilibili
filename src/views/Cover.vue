<template>
  <div @click="pathPush">
    <div class="detail-item">
      <div class="feng">
        <img :src="detailItem.img" alt />
        <div class="bottom">
          <span class="icon-play2">1233</span>
          <span class="icon-file-text">7</span>
        </div>
      </div>
      <p>{{detailItem.name}}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: ["detailItem"],
  methods:{
      pathPush(){
          if(this.$route.path !== '/article/'+ this.detailItem.id){
              this.$router.push('/article/'+ this.detailItem.id)

          }
      }
  }
};
</script>

<style lang="less">
.detail-item {
  position: relative;
  img {
    width: 100%;
    height: 100px;
  }
  p {
    font-size: 3.611vw;
  }

  .feng {
    position: relative;
    .bottom {
       
      position: absolute;
      display: flex;
      justify-content: space-between;
      bottom: 1.944vw;
    padding: 1.111vw 2.778vw;
      width: 100%;
      color: white;
      background: linear-gradient(0deg, rgba(0, 0, 0, 0.85), transparent);
    }
  }
}
</style>