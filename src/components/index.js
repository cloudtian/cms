import Vue from 'vue';
import NavBar from './nav-bar/index.vue';
import Comment from './comment/index.vue';

let components = [
    NavBar,
    Comment
]

components.forEach(item => {
    Vue.component(item.name, item);
})