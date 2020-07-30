<template>
    <div id="app">
        <Opening/>
        <Header/>
        <router-view v-if="!taxonomies_is_loading"/>
        <Footer/>
    </div>
</template>





<style lang="scss">
    html,body{
        width: 100%;
    }

    #app{
        background-color: $bg-color;
        width: 100%;
    }
</style>





<script>
    require('./assets/sass/reset.css')

    import { mapGetters } from 'vuex'

    export default {
        components: {
            Opening: require('./components/Opening.vue').default,
            Header: require('./components/Header.vue').default,
            Footer: require('./components/Footer.vue').default,
        },
        computed: {
            ...mapGetters({taxonomies_is_loading: 'wp/loading_taxonomies'}),
        }

        // created(){
        //     window.axios.get('wp-json/wp/v2/pages').then(res=>{
        //         console.log(res.data)
        //     })
        // },
    }
</script>
