<template>
    <div class="comment_box">
        <div class="count">评论（{{commentCount}}）</div>
        <div class="publish">
            <img src="@/assets/default_img.jpg" alt />
            <input
                type="text"
                class="shuru"
                placeholder="说点什么吧"
                v-model="post.comment_content"
                ref="postInput"
            />
            <div class="btn" @click="commentPublish">发表</div>
        </div>
        <div class="item" v-for="(item,index) in commentList" :key="index">
            <div class="hd">
                <img
                    :src="item.userinfo.user_img"
                    alt
                    v-if="item.userinfo && item.userinfo.user_img"
                />
                <img src="@/assets/default_img.jpg" alt v-else />
                <div>
                    <p v-if="item.userinfo">{{item.userinfo.name}}</p>
                    <p v-else>一个没有名字的用户</p>
                    <p>{{item.comment_date}}</p>
                </div>
                <span @click="publishClick(item.comment_id)">回复</span>
            </div>
            <div class="content">
                <div class="yiji">{{item.comment_content}}</div>
                <div class="xiaji" v-if="item.child">
                    <div class="box">
                        <SecondComment
                            :commentChild="item.child"
                            :temp="false"
                            @publishClick="publishClick"
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import SecondComment from "@/components/article/SecondComment";
export default {
    data() {
        return {
            commentList: null,
            commentCount: null,
            myUser: null,
            post: {
                comment_content: "",
                comment_date: null,
                parent_id: null,
                article_id: null,
            },
        };
    },
    methods: {
        async commentData() {
            const res = await this.$http.get(
                "/comment/" + this.$route.params.id
            );
            this.commentCount = res.data.length;
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
        async myUserinfo() {
            const res = await this.$http.get(
                "/user/" + localStorage.getItem("id")
            );
            this.myUser = res.data[0];
        },
        async commentPublish() {
            if (
                !this.myUser &&
                !localStorage.getItem("token") &&
                localStorage.getItem("id")
            ) {
                this.$msg.fail("请先登录");
                return;
            }
            const date = new Date();
            let month = date.getMonth() + 1;
            let day = date.getDay();
            if (month < 10) {
                month = "0" + month;
            }
            if (day < 10) {
                day = "0" + day;
            }
            const str = month + "-" + day;
            this.post.comment_date = str;
            this.post.article_id = this.$route.params.id;
            const res = await this.$http.post(
                "/comment_post/" + localStorage.getItem("id"),
                this.post
            );
            if (res.status == 200) {
                this.$msg.fail("评论发表成功");
                this.post.comment_content = "";
                this.commentData();
                this.post.parent_id=null
            } else {
                this.$msg.fail("评论发表失败");
            }
        },
        publishClick(comment_id) {
            this.post.parent_id = comment_id;
            this.focus();
        },
        focus() {
            this.$refs.postInput.focus();
        },
    },
    created() {
        this.commentData();
        this.myUserinfo();
    },
    components: {
        SecondComment,
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
            border: 0;
            font-size: 13px;
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
                margin: 4px 0 0 -5px;
                padding: 2px 9px;
            }
        }
    }
}
</style>