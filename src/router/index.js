import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/home/Index.vue'
// import Layout from '@/views/Layout.vue'

export const constRoutes = [
    {
        path: '/',
        name: '首页',
        redirect: '/home',
        children: [
            {
                path: 'home',
                name: 'home',
                component: Home,
                meta: {
                    name: '首页'
                },
            },
        ]
    },
]

const router = createRouter({
    history: createWebHistory(import.meta.env.VITE_APP_FIX),
    routes: constRoutes
})

export default router
