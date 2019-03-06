import Vue from 'vue';
import NavBar from './nav-bar.vue';

let components = [
    NavBar
]

components.forEach(item => {
    Vue.component(item.name, item);
})