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
        path: '/about',
        name: 'About',
        component: require('../views/Article.vue').default,
    },
    {
        path: '/:post_id',
        name: 'Article',
        component: require('../views/Article.vue').default,
    },
    {
        path: '/category/:category',
        name: 'Category',
        component: require('../views/Home.vue').default,
    },
    {
        path: '/tag/:tag',
        name: 'Tag',
        component: require('../views/Home.vue').default,
    }
]

const router = new VueRouter({
  mode: 'history',
  // base: process.env.BASE_URL,
  // scrollBehavior () {
  //     console.log('hoge')
  //     return false
  // },

  routes
})

export default router
