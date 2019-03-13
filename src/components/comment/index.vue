<template>
    <div class="comment-component">
        <div class="comment-row">
            <span>提交评论</span>
            <span>返回</span>
        </div>

        <textarea v-model="msg" class="comment-new-msg"></textarea>

        <mt-button type="primary" size="large" @click.native="pushComment">发表评论</mt-button>

        <div class="comment-row">
            <span>评论列表</span>
            <span>{{comments.length}}条评论</span>
        </div>

        <ul class="comment-msg">
            <li class="comment-msg-item" 
                v-for="(comment, index) in comments" 
                :key="index">
                {{comment.user_name}}：{{comment.content}}
                <span class="time">
                    {{comment.add_time}}
                </span>
            </li>
        </ul>

        <mt-button v-show="showMoreBtn"
             type="danger" 
             size="large"
              @click.native="showMore">加载更多</mt-button>
        
    </div>
</template>

<script>

// 一页10条评论
const ONE_PAGE_NUM = 10;

export default {
    name: 'Comment',

    props: {
        artId: {
            type: [String, Number],
            required: true
        }
    },

    data () {
        return {
            allComments: [],
            comments: [],

            msg: '',
            curPage: 1,
            showMoreBtn: false
        };
    },

    watch: {
        comments () {
            let allComments = this.getAllComment();
            this.showMoreBtn = this.comments.length < allComments.length;
        }
    },

    mounted () {
        this.getCommentRequest();
    },

    methods: {
        getCommentRequest () {
            return this.$axios.get('/api/comment', {
                params: {
                    art_id: this.artId
                }
            }).then(res => {
                let allComments = res.data.comments;

                this.storeAllComment(allComments);

                this.updateComments();
            })
        },

        storeAllComment (comments) {
            localStorage.setItem('comments', JSON.stringify(comments));
        },

        getAllComment () {
            let data = localStorage.getItem('comments');
            return JSON.parse(data);
        },

        getCurTime () {
            let date = new Date().toLocaleDateString();
            return date.replace(/\//g, '-');
        },

        pushComment () {
            if (!this.msg) {
                this.$toast({
                    message: '您还没输入内容！',
                    duration: 1000
                });
                return;
            }

            let comments = this.getAllComment() || [];

            comments.unshift({
                user_name: '当前用户',
                content: this.msg,
                add_time: this.getCurTime()
            });

            this.storeAllComment(comments);
            this.msg = '';
            this.updateComments();
        },

        updateComments () {
            let comments = this.getAllComment() || [];

            this.comments = comments.slice(0, this.curPage * ONE_PAGE_NUM);
        },

        showMore () {
            this.curPage++;
            this.updateComments();
        }
    }
}
</script>

<style lang="less" scoped>
.comment-component {

    .comment-row {
        display: flex;
        justify-content: space-between;
    }

    .comment-new-msg {
        width: calc(100% - 7px);
        height: 100px;
        resize: none;
    }

    .comment-msg {
        margin: 10px 0;
    }

    .comment-msg-item {
        border-bottom: 1px solid #ddd;
        line-height: 30px;

        &:first-child {
            border-top: 1px solid #ddd;
        }
        .time {
            color: #ccc;
            font-size: 12px;
        }
    }

}
</style>
