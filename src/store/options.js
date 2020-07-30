export default {
    namespaced: true,

    state: () => ({
        search: '',
    }),
    mutations: {
        search(state, {value}){
            state.search = value
            // this.commit('wp/articles/refresh')
        },
    },
    actions: {
        search({commit}, {value}){
            commit('search', {value})
        },
    },
    getters: {

    },
}
