import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: require('../views/Home.vue').default,
    },
    {
        path: '/contact',
        name: 'Contact',
        component: require('../views/Contact.vue').default,
    },
    {
        path: '/notfound',
        name: 'NotFound',
        component: require('../views/NotFound.vue').default,
    },
    {
        path: '/search',//クエリパラメータ ?s= つき
        name: 'Search',
        component: require('../views/Home.vue').default,
    },
    {
        path: '/category/:category',
        name: 'Category',
        component: require('../views/Home.vue').default,
        alias: '/category/*/:category',
    },
    {
        path: '/date/:year/:month',
        name: 'Archives',
        component: require('../views/Home.vue').default,
    },
    {
        path: '/:post_id',
        name: 'Article',
        component: require('../views/Article.vue').default,
    },
    {
        path: '*',
        redirect: {name: 'NotFound'},
    },
]

const router = new VueRouter({
  mode: 'history',
  // base: process.env.BASE_URL,

  routes
})

export default router
