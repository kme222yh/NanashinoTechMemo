<template>
    <main class="homeView">
        <div class="homeView-body">
            <PinnedArticles/>
            <SearchForm/>
            <ArticlesDescription/>
            <Articles/>
            <ArchivesForm/>
        </div>
    </main>
</template>


<style lang="scss">
.articlesDescription, .articles{
    border-bottom: 1px solid rgba(18,47,61,.2);
}
</style>


<script setup>
import PinnedArticles from '@/components/main/home/PinnedArticles.vue'
import SearchForm from '@/components/main/home/SearchForm.vue'
import ArticlesDescription from '@/components/main/home/ArticlesDescription.vue'
import ArchivesForm from '@/components/main/home/ArchivesForm.vue'
import Articles from '@/components/main/home/Articles.vue'
</script>
