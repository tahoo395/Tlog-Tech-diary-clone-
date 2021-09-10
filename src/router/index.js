import { createRouter, createWebHistory } from 'vue-router'
import home from '../views/home.vue'
import editor from '../views/editor.vue'
import getBlog from '../views/getBlog.vue'

const routes = [
    {
        path: '/',
        name: 'home',
        component: home,
    },
    {
        path: '/blog/create',
        name: 'editor',
        component: editor,
    },
    {
        path: '/blog/:user/:blog',
        name: 'getBlog',
        component: getBlog,
    },
]


const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router