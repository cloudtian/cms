import Vue from 'vue'
import { 
    Tabbar, 
    TabItem,
    Header,
    Button,
    Swipe,
    SwipeItem,
    InfiniteScroll,
    Spinner  
} from 'mint-ui'

const components = [
    Tabbar, 
    TabItem,
    Header,
    Button,
    Swipe,
    SwipeItem,
    InfiniteScroll,
    Spinner 
]



components.forEach(component => {
    
    if (component.install) {
        Vue.use(component);
    } else {
        Vue.component(component.name, component)
    }
    
})