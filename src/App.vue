<template>
  <div id="app" class="app">
    <!-- 顶部导航 -->
    <mt-header fixed :title="bottomList[selected] ? bottomList[selected].text : '内容管理系统'">
      <router-link to="/" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
      <template slot="right">
        <mt-button>登录&nbsp;</mt-button>
        <mt-button>注册</mt-button>
      </template>
    </mt-header>

    <div class="content">
      <router-view/>
    </div>

    <!-- 底部操作 -->
    <mt-tabbar v-model="selected" :fixed="true">
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
    selected (val) {
      if (val) {
        this.$router.push({ name: val })
      }
    },
    $route (to) {
      if (to.name !== this.selected) {  
          this.selected = this.bottomList[to.name] ? to.name : '';
      }
    }
  }
}
</script>


<style lang="less">
.app {
  height: 100%;
  width: 100%;
}
.content {
  margin-top: 40px;
  margin-bottom: 55px;
  height: 100%;
  width: 100%;
  overflow: auto;
}
</style>
