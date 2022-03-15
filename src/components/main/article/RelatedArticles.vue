<template>
    <section class="relatedArticles" v-if="articles.length">
        <div class="relatedArticles-body">
            <h4 class="relatedArticles-title">関連記事</h4>
            <ul class="relatedArticles-list">
                <article-link v-for="(article, index) in articles" :key="index"
                    :id="article.id"
                    :date="article.date"
                    :title="article['title'].rendered"
                    :media="article['_embedded']['wp:featuredmedia'][0]['source_url']"
                    :categories="article['_embedded']['wp:term'][0]"
                    :htag_level="5"
                />
            </ul>
        </div>
    </section>
</template>


<style lang="scss">
.relatedArticles{
    &-body{
        padding-top: 50px;
    }
    &-title{
        @include outerBody;
        color: $bg-transparent-gray;
        text-align: center;
        &::after{
            display: block;
            margin: 0 auto;
            margin-top: 10px;
            height: 9px;
            max-width : $footer-widget-max-width;
            width: 100%;
            border-radius: 10px;
            background-color: $bg-transparent-gray;
            content: '';
        }
    }
    &-list{
        display: flex;
        justify-content: center;
        align-items: flex-start;
        flex-wrap: wrap;
        padding: 30px 0;
    }
}
</style>


<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import Endpoints from '@/config/endpoints'
import ArticleLink from '@/components/main/home/ArticleLink.vue'

import { useAjaxReadyStore } from '@/stores/ajaxReady'
const ajaxReadyStore = useAjaxReadyStore();

import { useRouter, useRoute } from 'vue-router'
const router = useRouter();
const route = useRoute();
let routerHook = null;

const articles = ref([]);
const initArticles = async ()=>{
    articles.value = [];
    if(/^[-]?([1-9]\d*|0)(\.\d+)?$/.test(route.params.post_id)){
        const res = await axios.get(Endpoints.related + '/' + route.params.post_id, {params: {_embed: true, limit: 10}});
        articles.value = res.data;
    }
    ajaxReadyStore.ready(Endpoints.related);
}

onMounted(()=>{
    initArticles();
    routerHook = router.afterEach(initArticles);
});
onUnmounted(()=>{
    routerHook();
});
</script>
