<template>
    <div class="photo-detail-page">
        <nav-bar title="图文详情"></nav-bar>
        <div class="title">
            <p>{{info.title}}</p>
            <div class="desc">
                <span>发起时间：{{info.add_time}}</span>
                <span>{{info.click}}次浏览</span>
                <span>分类：{{info.type}}</span>
            </div>
        </div>

        <div class="img-wrap">
            <vue-preview :slides="img" @close="handleClose"></vue-preview>
        </div>

        <div class="content">
            <p v-html="info.content"></p>
        </div>

        <!-- comment -->
        <comment :art-id="$route.query.id"/>

    </div> 
</template>

<script>
export default {
    data () {
        return {
            info: {},
            img: []
        };
    },

    mounted () {
        let id = this.$route.query.id;
        
        this.$axios.all([this.getDetailInfo(id), this.getDetailImg(id)])
        .then(this.$axios.spread((info, img) => {
            this.info = info.data.info;
            this.img = img.data.img.map(item => {
                return {
                    src: item.src,
                    msrc: item.msrc,
                    title: item.title,
                    alt: item.alt,
                    w: 400,
                    h: 400
                }
            });
        }))
    },

    methods: {
        getDetailInfo (id) {
            return this.$axios.get('/api/photo/detail/info', {
                params: {
                    id: id
                }
            })
        },

        getDetailImg (id) {
            return this.$axios.get('/api/photo/detail/img', {
                params: {
                    id: id
                }
            })
        },

        handleClose () {

        }
    }
}
</script>

<style lang="less">
.photo-detail-page {

    .title {
        p {
            font-size: 16px;
            font-weight: bold;
            color: rgba(40, 121, 229, 0.836);
        }
        .desc {
            font-size: 12px;
            color: rgba(241, 144, 32, 0.836);

            span + span {
                margin-left: 10px;
            }
        }
    }

    .img-wrap .my-gallery {
        display: flex;
        flex-wrap: wrap;

        figure {
            margin: 5px;
        }
    }
}
</style>
