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

import { onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
const router = useRouter();
let routerHook = null;
onMounted(()=>{
    routerHook = router.afterEach((to, from)=>{
        document.getElementsByClassName("articlesDescription")[0].scrollIntoView(true);
        if(to.name != 'Home'){
            window.scrollBy(0, -100);
        } else {
            window.scrollBy(0, -80);
        }
    });
});
onUnmounted(()=>{
    routerHook();
});
</script>
