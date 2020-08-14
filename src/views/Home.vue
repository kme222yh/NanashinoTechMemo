<template>
    <main id="home" class="section">
        <top-articles class="section"/>
        <search-form class="section"/>
        <articles class="section"/>
        <archives-form/>
    </main>
</template>





<style lang="scss">
</style>




<script>
export default {
    components: {
        topArticles: require('../components/TopArticles.vue').default,
        searchForm: require('../components/SearchForm.vue').default,
        archivesForm: require('../components/ArchivesForm.vue').default,
        Articles: require('../components/Articles.vue').default,
    },
}
</script>
