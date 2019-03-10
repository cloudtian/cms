<template>
    <div class="photo-list-page">
        <nav-bar title="图文分享"></nav-bar>
        <div class="category-list">
            <ul>
                <li v-for="item in category" 
                    :key="item.id" 
                    class="category-item"
                    :class="{'active': item.id === curCategory.id}"
                    @click="curCategory = item">
                    {{item.text}}
                    <!-- <router-link :to="{name: 'photo.list', params: {categoryId: item.id}}">
                        
                    </router-link> -->
                </li>
            </ul>
        </div>

        <div class="photo-list">
            <ul>
                <li v-for="photo in photos" :key="photo.id">
                    <div>
                        <img v-lazy="photo.img_url">
                    </div>
                    <p>
                        {{photo.description}}
                    </p>
                </li>
            </ul>
        </div>


    </div>
</template>
<script>
export default {

    data () {
        return {
            category: [],
            curCategory: {},
            photos: []
        }
    },

    mounted () {
        this.getCategory().then(() => {
            this.curCategory = this.category[0];
        })
    },

    watch: {
        'curCategory.id' () {
            this.getPhotos();
        }
    },

    methods: {
        getCategory () {
            return this.$axios.get('/api/photo/category').then(res => {
                this.category = res.data.category;
            });
        },

        getPhotos () {
            this.$axios.get('/api/photo/list', {
                id: this.curCategory.id
            }).then(res => {
                this.photos = res.data.list;
            })
        }
    }
}
</script>

<style lang="less" scoped>
.photo-list-page {

    .category-list {
        width: 100%;
        overflow-x: auto;
        height: 30px;
        line-height: 30px;

        ul {
            width: max-content;
        }

        .category-item {
            display: inline-block;
            margin-right: 10px;
            margin-left: 5px;
            color: #3224df;

            &.active {
                color: #cc1a1a;
            }
        }
    }

    .photo-list {

        li {
            position: relative;

             img {
                width: 100%;
                height: 250px;
            }

            p {
                position: absolute;
                bottom: 5px;
                left: 5px;
                right: 5px;
            }
        }
    }

    image[lazy=loading] {
        width: 40px;
        height: 300px;
        margin: auto;
    }
}
</style>
