import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        during_screen_transition: false,
        footer_visible: true,
        page_title: '',

        menu: [],
        pinned: [],
        archives: [],
        articles: {
            data: [],
            all_out: false,
            next_page: 1,
            per_page: 12,
            show_until: -1,
            load: false, // Articles.vueで書き込み
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
        related: [],
        widgets: {
            footer: {},
            side_bar: {},
        },
        categories: {},
        search_word: '', // SearchForm.vueが書き込み
    },
})
