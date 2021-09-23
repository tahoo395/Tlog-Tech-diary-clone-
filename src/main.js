import { createApp } from 'vue'
import router from "./router/index"
import store from "./store.js"
import App from './App.vue'
import VueObserveVisibility from 'vue-observe-visibility'
import './tailwind.scss'

createApp(App).use(router).use(store).use(VueObserveVisibility).mount('#app')
