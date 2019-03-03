<template>
  <div id="app">
    <!-- 顶部导航 -->
    <mt-header title="内容管理系统">
      <router-link to="/" slot="left">
        <mt-button icon="back">back</mt-button>
      </router-link>
      <mt-button icon="more" slot="right"></mt-button>
    </mt-header>

    <router-view/>

    <!-- 底部操作 -->
    <mt-tabbar v-model="selected">
      <mt-tab-item v-for="(item, key) in bottomList" :key="key" :id="key">
        <i slot="icon" :class="item.class"></i>
        {{item.text}}
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      selected: 'home',
      bottomList: {
        home: {
          text: '首页',
          class: 'iconfont icon-shouye'
        },
        vip: {
          text: '会员',
          class: 'iconfont icon-wode'
        },
        car: {
          text: '购物车',
          class: 'iconfont icon-gouwuche'
        },
        search: {
          text: '搜索',
          class: 'iconfont icon-sousuo'
        }
      }
    }
  },
  watch: {
    selected () {
      this.$router.push({ name: this.selected })
    },
    $route (to) {
      if (to.name !== this.selected) {
        this.selected = to.name;
      }
    }
  }
}
</script>


<style lang="less">
</style>
