<template>
  <div class="news-page">
    <nav-bar :title="navTitle"></nav-bar>
    <mt-spinner class="news-page_loading" 
                v-if="loading && !list.length" 
                color="#26a2ff"
                type="fading-circle"></mt-spinner>
    <ul v-else v-infinite-scroll="loadMore"
        infinite-scroll-disabled="loading"
        infinite-scroll-distance="10" 
        class="news-page_content">
        <li v-for="news in list" 
            :key="news.id" 
            class="news-page_item-wrap">
            <div class="news-page_img">
                <img :src="news.img_url" alt="">
            </div>
            <div class="news-page_item">
                <p class="news-page_item-title">{{news.title}}</p>
                <div class="news-page_item-summary">
                    <p class="news-page_item-description">{{news.description}}</p>
                    <div class="news-page_item-info">
                        <span>点赞数：{{news.click}}</span>
                        <span>发表时间：{{news.add_time}}</span>
                    </div>
                </div>
            </div>
        </li>
    </ul>
  </div>
</template>

<script>
export default {
    
    name: 'NewsList',

    data () {
        return {
            list: [],
            newsList: [],
            loading: false,
            navTitle: '新闻列表'
        };
    },
    mounted () {
        this.$axios.get('/api/news/news_list')
        .then(res => {
            this.newsList = res.data.list;
        })
    },
    methods: {
        loadMore() {
            this.loading = true;
            setTimeout(() => {
                let length = this.list.length;
                this.list = this.list.concat(this.newsList.slice(length, length + 10));
                this.loading = false;
            }, 2500);
        }
    }
}
</script>

<style>
.news-page {
    height: 100%;
    width: 100%;
    position: relative;
}
.news-page_loading {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
.news-page_item-wrap {
    height: 160px;
    display: flex;
    align-items: center;
}
.news-page_img {
    width: 100px;
}
.news-page_img img {
    border-radius: 5px;
}
.news-page_item {
    margin: 0 10px;
    align-self: center;
}
.news-page_item-summary {
    font-size: 12px;
}
.news-page_item-description {
    color: #666;
}
.news-page_item-info {
    color: rgba(241, 144, 32, 0.836);
}
.news-page_item-info span + span {
    margin-left: 10px; 
}
</style>

