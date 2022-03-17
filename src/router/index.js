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
            path: '/search',
            name: 'Search',
            component: () => import('@/views/HomeView.vue'),
        },
        {
            path: '/archive/:year/:month',
            name: 'Archive',
            component: () => import('@/views/HomeView.vue'),
        },
        {
            path: '/category/:category',
            name: 'Category',
            component: () => import('@/views/HomeView.vue'),
        },
        {
            path: '/:post_id',
            name: 'Article',
            component: () => import('@/views/ArticleView.vue'),
        },
    ],
    scrollBehavior (to, from, savedPosition) {
        if(to.name == 'Article'){
            return {
                el: '.topVisual',
                top: 0,
            }
        } else if(from.name) {  // HomeView
            return {
                el: '.articlesDescription',
                top: 60,
            }
        }
        return { top: 0 }
    }
})

export default router
