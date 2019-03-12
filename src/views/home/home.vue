<template>
  <div class="home-page">
    <div class="home-page_swipe-wrap">
      <mt-swipe :auto="4000">
        <mt-swipe-item v-for="item in imgs" :key="item.id">
          <img :src="item.src" alt="">
        </mt-swipe-item>
      </mt-swipe>

      <div class="home-page_grid-info-wrap">
        <ul class="home-page_grid-info">
          <li class="home-page_grid-info-item"
              v-for="grid in grids" :key="grid.id">
              <router-link :to="grid.router">
                <i class="home-page_grid-info-icon iconfont" 
                  :class="grid.icon" 
                  :style="{color: grid.color}"></i>
              </router-link>
              <p>{{grid.text}}</p>
          </li>
        </ul>
      </div>
    </div>
    
  </div>
</template>

<script>

const IMGS = [{
  id: 1,
  src: require('@/assets/img/1.jpg')
}, {
  id: 2,
  src: require('@/assets/img/2.jpg')
}];

export default {
  name: "home",
  data() {
    return {
      imgs: IMGS,
      grids: []
    };
  },
  mounted () {
    this.$axios.get('/api/home/grid_info').then(res => {
      this.grids = res.data.data;
    })
  }
}
</script>

<style lang="less">
.home-page_swipe-wrap {
  height: 170px;
}
.home-page_swipe-wrap img {
  width: 100%;
}
.home-page_grid-info {
  display: flex;
  font-size: 12px;
  flex-wrap: wrap;
}
.home-page_grid-info-item {
  width: 33%;
  text-align: center;
  padding-top: 10px;
}
.home-page_grid-info-icon {
  font-size: 24px;
}
</style>
