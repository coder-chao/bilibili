<template>
    <div class="comment_box">
        <div class="count">评论（340）</div>
        <div class="publish">
            <img src="@/assets/default_img.jpg" alt />
            <div class="shuru"></div>
            <div class="btn">发表</div>
        </div>
        <div class="item" v-for="(item,index) in commentList" :key="index">
            <div class="hd">
                <img :src="item.userinfo.user_img" alt v-if="item.userinfo && item.userinfo.user_img" />
                <img src="@/assets/default_img.jpg" alt v-else />
                <div>
                    <p v-if="item.userinfo">{{item.userinfo.name}}</p>
                    <p v-else>一个没有名字的用户</p>
                    <p>{{item.comment_date}}</p>
                </div>
                <span>回复</span>
            </div>
            <div class="content">
                <div class="yiji">{{item.comment_content}}</div>
                <div class="xiaji" v-if="item.child">
                    <div class="item" v-for="(childItem,childIndex) in item.child" :key="childIndex">
                        <span  v-if="childItem.userinfo">{{childItem.userinfo.name}}</span>
                        <p v-else>一个没有名字的用户</p>
                        <span>{{childItem.comment_content}}</span>
                    </div>
                </div>
            </div>
        </div>
        <div></div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            commentList: null,
        };
    },
    methods: {
        async commentData() {
            const res = await this.$http.get(
                "/comment/" + this.$route.params.id
            );
            this.commentList = this.changeCommentData(res.data);
        },
        changeCommentData(data) {
            function fn(temp) {
                let arr1 = [];
                for (var i = 0; i < data.length; i++) {
                    if (data[i].parent_id == temp) {
                        arr1.push(data[i]);
                        data[i].child = fn(data[i].comment_id);
                    }
                }
                return arr1;
            }
            return fn(null);
        },
    },
    created() {
        this.commentData();
    },
};
</script>

<style lang="less" scoped>
.comment_box {
    padding: 6.998px;
    img {
        width: 24.998px;
        height: 24.998px;
        margin-right: 2.778vw;
        border-radius: 50%;
    }
    .publish {
        margin-top: 10.001px;
        display: flex;

        .shuru {
            width: 137.002px;
            height: 24.998px;
            border-radius: 12.499px;
            background-color: #f4f4f4;
            padding-left: 11.999px;
            margin-right: 10.001px;
        }
        .btn {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 50px;
            height: 24.998px;
            border-radius: 12.499px;
            font-size: 11.999px;
            background-color: #fb7299;
            color: #fff;
        }
    }
    .item {
        margin-top: 2.778vw;
        .hd {
            display: flex;
            position: relative;
            color: #9d9d9d;
            margin-bottom: 0.833vw;
            div {
                p {
                    padding: 0.833vw 0;
                }
            }
            span {
                position: absolute;
                right: 2.778vw;
            }
        }
        .content {
            margin-left: 9.444vw;
            color: #3c3c3c;
            .xiaji {
                background-color: #f4f4f4;
                .item {
                    padding: 1.944vw;
                    span:first-child {
                        color: #6ea2d3;
                        margin-right: 1.389vw;
                    }
                }
            }
        }
    }
}
</style>