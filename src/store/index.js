import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        loading_animation_visible: false, // 0で 非表示 1以上で表示
        footer_visible: true,


        categories: [],
        tags: [],
        articles: {
            data: [],
            all_out: false,
            next_page: 1,
            per_page: 12,
        },
        article: {
            content: '',
            title: '',
            date: '',
            date_modified: '',
            media: '',
            category: '',
            tags: [],
        },
        widget: {
            footer: {},
        },
        search_word: '',
    },
    mutations: {
    },
    actions: {
    },
    getters: {
    },
})
