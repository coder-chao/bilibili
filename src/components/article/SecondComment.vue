<template>
    <div class="xiaji">
        <div class="item" v-for="(childItem,childIndex) in commentChild" :key="childIndex">
            <span v-if="childItem.userinfo">{{childItem.userinfo.name}}</span>
            <p v-else>一个没有名字的用户</p>
            <span v-if="temp && childItem.parent_user_info" > 回复{{childItem.parent_user_info.name}}: {{childItem.comment_content}}</span>
            <span v-else>: {{childItem.comment_content}}</span>
            <span class="reply" @click="publishClick(childItem.comment_id)">回复</span>
            <SecondCommentItem :commentChild="childItem.child" @publishClick="publishClick" :temp="true"/>
        </div>
    </div>
</template>

<script>
export default {
    name:"SecondCommentItem",
    props:["commentChild","temp"],
    methods:{
        publishClick(comment_id){
            this.$emit('publishClick',comment_id)
        }
    }
};
</script>

<style lang="less" scoped>
.xiaji {
    background-color: #f4f4f4;
    
    .item {
        position: relative;
        margin: 2.944vw 0;
        span:first-child {
            color: #6ea2d3;
        }
        .reply{
            position: absolute;
            right: 10px;
            font-size: 12px;
            color: #aa9d9d;
            margin-top: 5px;
        }
    }
}
</style>