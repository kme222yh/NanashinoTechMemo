export default {
    namespaced: true,

    state: () => ({
        data: [],
        loading: true,
    }),
    mutations: {
        async get(state){
            state.loading = true
            state.data = []
            let res = {data: {length: 1}}
            for(let page=1; res.data.length != 0; page++){
                res = await window.axios.get(`${window.home_url}/wp-json/wp/v2/tags?page=${page}`)
                state.data = state.data.concat(res.data)
            }
            state.loading = false
        },
    },
    actions: {
        get({commit}){
            commit('get')
        },
    },
    getters: {
        slug2name: (state) => (slug) => {
            return state.data.find(cat => cat.slug == slug).name
        },
    }
}
