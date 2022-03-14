import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'Home',
            component: () => import('@/views/HomeView.vue'),
        },
        {
            path: '/:post_id',
            name: 'Article',
            component: () => import('@/views/ArticleView.vue'),
        },
    ]
})

export default router
