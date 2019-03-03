import Vue from 'vue'
import { 
    Tabbar, 
    TabItem,
    Header,
    Button 
} from 'mint-ui'

const components = [
    Tabbar, 
    TabItem,
    Header,
    Button
]

components.forEach(component => {
    Vue.component(component.name, component)
})