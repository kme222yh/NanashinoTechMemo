import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        opening_animation_visible: 2, // 0で非表示 1以上で表示
        footer_visible: true,
    },
    mutations: {
        opening_animation_visible(state){state.opening_animation_visible += 1},
        opening_animation_hide(state){state.opening_animation_visible -= 1},
        footer_visible(state){state.footer_visible = true},
        footer_hide(state){state.footer_visible = false},
    },
    actions: {
        opening_animation_visible({commit}){commit('opening_animation_visible')},
        opening_animation_hide({commit}){commit('opening_animation_hide')},
        footer_visible({commit}){commit('footer_visible')},
        footer_hide({commit}){commit('footer_hide')},
    },
    getters: {
        is_opening_animation_visible(state){return state.opening_animation_visible>=1}
    },
    modules: {
        wp: {
            namespaced: true,

            getters: {
                loading(state){
                    return state.categories.loading || state.articles.loading || state.tags.loading
                },
                loading_taxonomies(state){
                    return state.categories.loading || state.tags.loading
                },
            },

            modules: {
                tags: require('./tags.js').default,
                categories: require('./categories.js').default,
                options: require('./options.js').default,
                // archives: require('./archives.js').default,
            },
        },
    }
})
