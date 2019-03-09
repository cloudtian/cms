import Vue from 'vue';
import NavBar from './nav-bar/index.vue';

let components = [
    NavBar
]

components.forEach(item => {
    Vue.component(item.name, item);
})