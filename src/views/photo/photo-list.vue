<template>
    <div class="photo-list-page">
        <nav-bar title="图文列表"></nav-bar>
        <div class="category-list">
            <ul>
                <li v-for="item in category" 
                    :key="item.id" 
                    class="category-item"
                    :class="[item.id === curCategory.id ? 'active' : '']"
                    @click="__changeCategory(item)">
                    {{item.text}}
                </li>
            </ul>
        </div>

        <div class="photo-list">
            <ul>
                <li v-for="photo in photos" :key="photo.id">
                    <router-link :to="{name: 'photo.detail', query: {id: photo.id}}">
                        <img v-lazy="photo.img_url">
                    </router-link>
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
            photos: [],
            id: 0
        }
    },

    mounted () {
        this.getCategory().then(() => {
            this.curCategory = this.category.find(item => {
                return item.id === this.id;
            });

            // todo 如果分类不在视野中，需要滚动定位
        })
    },

    // 路由守卫
    beforeRouteEnter (to, from, next) {
        
        // 此时不能获取组件实例this
        next(vm => {
            vm.id = +to.params.categoryId;
            vm.getPhotos(vm.id);
        });
    },

    beforeRouteUpdate (to, from, next) {
        
        // 此时可以获取组件实例this
        this.getPhotos(to.params.categoryId);

        next();
    },

    methods: {
        getCategory () {
            return this.$axios.get('/api/photo/category').then(res => {
                this.category = res.data.category;
                this.category.unshift({id: 0, text: '全部'});
            });
        },

        getPhotos (id) {
            id = typeof id === 'undefined' ? this.curCategory.id : id;
            this.$axios.get('/api/photo/list', {
                params: {
                    id: id
                }
            }).then(res => {
                this.photos = res.data.list;

                if (!this.photos.length) {
                    this.$toast({
                        message: '没有图片！',
                        iconClass: 'iconfont icon-guanbi2',
                        duration: 1000
                    });
                }
            })
        },

        __changeCategory (item) {
            this.curCategory = item;
            this.$router.push({name: 'photo.list', params: {categoryId: item.id}});
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
