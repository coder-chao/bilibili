<template>
  <div class="article_box" v-if="model">
    <Navbar />
    <div class="video_box">
      <div class="video">
        <video :src="model.content" controls></video>
        <div class="detailText">
          <div class="title">
              <span>{{model.category.title}}</span>
            <span>{{model.name}}</span>
          </div>
          <div class="shuju">
            <span>{{model.userinfo.name}}</span>
            <span>146.4万次观看</span>
            <span>5281弹幕</span>
            <span>{{model.date}}</span>
          </div>
          <div class="san">
              <span class=" icon-star-full" @click="collectionClick" :class="{active:collectionActive}">收藏</span>
              <span class="icon-bubble">关注</span>
              <span class="icon-redo2">分享</span>
          </div>
        </div>
      </div>
    </div>
    <div class="detail_box">
        <Cover v-for="(item,index) in commendList"  :key="index" :detailItem = "item"
        class="detailItem"/>
    </div>
    
  </div>
</template>

<script>
import Navbar from "@/components/common/Navbar";
import Cover from "./Cover";
export default {
  data() {
    return {
      model: null,
      commendList:null,
      myUser:null,
      collectionActive:false
    };
  },
  methods: {
    async articleItemData() {
      const res = await this.$http.get("/article/" + this.$route.params.id);
      this.model = res.data[0];
    },
    async commendData(){
        const res = await this.$http.get('/commend')
        this.commendList = res.data
    },
    async collectionClick(){
        if(localStorage.getItem('token')){
            const res = await this.$http.post('/collection/'+localStorage.getItem('id'),{
            article_id:this.$route.params.id
        })
        if(res.data.msg=='收藏成功'){
            this.collectionActive = true
        }else{
            this.collectionActive= false
        }
        }
    },
    async collectionInit(){
        const res = await this.$http.get('/collection/'+localStorage.getItem('id'),{
            params:{
                article_id:this.$route.params.id
            }
        })
        console.log(res);
    }
  },
  watch:{
      $route(){
            this.articleItemData();
    this.commendData()
      }
  },
  created() {
    this.articleItemData();
    this.commendData()
    
  },
  components: {
    Navbar,
    Cover,
 
    
  },
};
</script>

<style lang="less" scoped>
.article_box{
    background-color: #fff;
}
.video_box {
  .video {
    width: 100%;
    video {
      width: 100%;
    }
  }
}
.detailText {
  > div {
    padding: 2.067vw 3vw;
  }
  .title{
      span:first-child{
          display: inline-block;
          width: 14.722vw;
          line-height: 5.833vw;
          text-align: center;
          font-size: 3.611vw;
          background-color: #f4f4f4;
          color: #fb72b1;
          border-radius: 2.778vw;
      }
      span:last-child{
          font-size: 5vw;
          color: #333;
          margin-left: 2.222vw;
      }
  }
}
.shuju{
    font-size: 13px;
    span:first-child{
        padding: 0 6px;
        font-size: 15px;
    }
    span:nth-child(n+2){
        color: #bdaaaa;
        margin: 0 5px;
    }
}
.san{
    margin: 4px 0;
    color: #757575;
    span{
        margin-right: 20px;
    }
    span:first-child{
        margin-left: 10px;
    }
}
.detail_box {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 0 12px;
  .detailItem {
    width: 47%;
    margin: 4px 0;
  }
}
.active{
    color: #fb72b1;
}
</style>