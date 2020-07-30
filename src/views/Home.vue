<template>
    <div id="home">
        <top-articles/>
        <search-form/>
        <articles/>
    </div>
</template>





<style lang="scss">
    .search-form{
        padding: 70px 10px;
        padding-bottom: 60px;
    }
</style>




<script>
export default {
    components: {
        topArticles: require('../components/TopArticles.vue').default,
        searchForm: require('../components/SearchForm.vue').default,
        Articles: require('../components/Articles.vue').default,
    },
}
</script>
