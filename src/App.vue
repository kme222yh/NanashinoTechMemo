<template>
    <div id="app">
        <Composer/>
        <Loading/>
        <Header/>
        <router-view/>
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

    export default {
        components: {
            Composer: require('./Composer.vue').default,
            Loading: require('./components/Loading.vue').default,
            Header: require('./components/Header.vue').default,
            Footer: require('./components/Footer.vue').default,
        },
    }
</script>
