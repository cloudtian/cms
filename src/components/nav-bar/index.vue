<template>
    <div class="nav-bar">
        <div class="nav-bar_back" @click="goBack">&lt;</div>
        <div class="nav-bar_title">{{title}}</div>
    </div>
</template>
<script>
export default {
    name: 'NavBar',
    props: {
        title: String
    },
    methods: {
        goBack () {
            this.$router.go(-1);
        }
    }
}
</script>
<style>
.nav-bar {
    height: 40px;
    line-height: 40px;
    border-bottom: 1px solid #ddd;
    position: relative;
}
.nav-bar_back {
    display: inline-block;
    margin-left: 15px;
}
.nav-bar_title {
    display: inline-block;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
}
</style>
