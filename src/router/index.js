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
            path: '/contact',
            name: 'Contact',
            component: () => import('@/views/ContactView.vue'),
        },
        {
            path: '/:post_id(\\d+)',
            name: 'Article',
            component: () => import('@/views/ArticleView.vue'),
        },
        {
            path: '/:post_id',
            name: 'Page',
            component: () => import('@/views/ArticleView.vue'),
        },
        {
            path: '/:pathMatch(.*)*',
            name: 'NotFound',
            component: () => import('@/views/NotFoundView.vue'),
        },
    ],
    scrollBehavior (to, from, savedPosition) {
        if(from.name && to.fullPath == from.fullPath){
            return;
        } else if(to.name == 'NotFound' || to.name == 'Contact'){
            return { top: 0 }
        } else if(to.name == 'Article' || to.name == 'Page'){
            return {
                el: '.topVisual',
                top: 0,
            }
        } else if(from.name) {  // HomeView
            return {
                el: '.articlesDescription',
                top: 70,
            }
        }
        return { top: 0 } // default
    }
})

export default router
