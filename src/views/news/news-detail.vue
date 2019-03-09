<template>
    <div class="news-detail-page">
        <nav-bar :title="navTitle"></nav-bar>
        <div class="title">
            <h3>新闻详情</h3>
            <p>{{info.title}}</p>
            <div class="bottom">
                <span>点赞数：{{info.click}}</span>
                <span>类型：{{info.type}}</span>
                <span>发表时间：{{info.add_time}}</span>
            </div>
        </div>
        <div class="content" v-html="info.content"></div>
    </div>

</template>
<script>

/**
 * @file 新闻详情
 */
export default {

    data () {
        return {
            navTitle: '新闻详情',
            info: {}
        };
    },

    mounted () {
        // 获取新闻详情数据
        this.$axios.get('/api/news/news_detail', {
            id: this.$route.query.id
        }).then(res => {
            this.info = res.data.info;;
        }).catch(err => {

        });
    }
}
</script>
<style lang="less" scoped>
.news-detail-page {

    .title {
        border-bottom: 1px solid #ddd;

        .bottom {
            font-size: 12px;
            color: rgba(241, 144, 32, 0.836);

            span + span {
                margin-left: 15px;
            }
        }
    }

    .content {
        padding: 10px 5px;

        p {
            text-indent: 2em;
        }
    }
}
</style>

