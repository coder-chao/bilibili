<template>
  <div class="home">
    <Navbar />
    <van-tabs v-model="active" swipeable sticky>
      <van-tab v-for="(item,index) in category" :key="index" :title="item.title">
        <van-list v-model="item.loading" :finished="item.finished" finished-text="我是有底线的" @load="onLoad"
        :immediate-check= "false"
        >
          <div class="detail_box">
            <Cover
              class="detailItem"
              :detailItem="categoryItem"
              v-for="(categoryItem,categoryIndex) in item.list"
              :key="categoryIndex"
            />
          </div>
        </van-list>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import Navbar from "@/components/common/Navbar";
import Cover from "./Cover";
export default {
  data() {
    return {
      category: [],
      active: 0,
    };
  },
  components: {
    Navbar,
    Cover,
  },
  methods: {
    async selectCategory() {
      const res = await this.$http.get("/category");
      this.changeCategory(res.data);
    },
    changeCategory(data) {
      this.category = data.map((item, index) => {
        item.list = [];
        item.page = 0;
        item.finished = false
        item.loading = false
        item.pagesize = 10;
        return item;
      });
      this.selectArticles();
    },
    async selectArticles() {
      const categoryItem = this.categoryItem();
      const res = await this.$http.get("/detail/" + categoryItem._id, {
        params: {
          page: categoryItem.page,
          pagesize: categoryItem.pagesize,
        },
      });
      categoryItem.list.push(...res.data)
      categoryItem.loading = false
      if(res.data.length < categoryItem.pagesize){
          categoryItem.finished = true
      }
    },
    categoryItem() {
      const categoryItem = this.category[this.active];
      return categoryItem;
    },
    onLoad(){
        const categoryItem = this.categoryItem()
        categoryItem.page++
        this.selectArticles()
    }
  },
  watch: {
    active() {
      this.selectArticles();
    },
  },
  created() {
    this.selectCategory();
  },
};
</script>

<style scoped lang="less">
.home {
  background-color: #fff;
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
</style>