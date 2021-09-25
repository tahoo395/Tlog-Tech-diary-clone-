import { createRouter, createWebHistory } from 'vue-router'
import home from '../views/home.vue'
import search from '../views/search.vue'
import editor from '../views/editor.vue'
import getBlog from '../views/getBlog.vue'
import editBlog from '../views/editBlog.vue'

const routes = [
    {
        path: '/',
        name: 'home',
        component: home,
    },
    {
        path: '/search',
        name: 'search',
        component: search,
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
    {
        path: '/blog/edit/:user/:blog',
        name: 'editBlog',
        component: editBlog,
    },
]


const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router