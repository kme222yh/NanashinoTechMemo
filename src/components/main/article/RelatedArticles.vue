<template>
    <section class="relatedArticles" v-if="articles.length">
        <div class="relatedArticles-body">
            <h4 class="relatedArticles-title">関連記事</h4>
            <ul class="relatedArticles-list">
                <article-link v-for="(article, index) in articles" :key="index"
                    :id="article.id"
                    :date="article.date"
                    :title="article['title'].rendered"
                    :media="article._embedded?.['wp:featuredmedia']?.[0]?.source_url"
                    :categories="article._embedded?.['wp:term']?.[0] ?? []"
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
        @include outerBody;
        padding-left: 10px;
        padding-right: 10px;
    }
    &-title{
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

    @include tablet{
        &-body{
            // padding-top: 40px;
        }
        &-title::after{
            margin-top: 7px;
        }
        &-list{
            padding: 25px 0;
        }
    }
}
</style>


<script setup lang="ts">
import axios from 'axios'
import { ref, onMounted, onUnmounted } from 'vue'
import Endpoints from '@/config/endpoints'
import type { RelatedPost } from '@/types/api'
import ArticleLink from '@/components/main/home/ArticleLink.vue'

import { useAjaxReadyStore } from '@/stores/ajaxReady'
const ajaxReadyStore = useAjaxReadyStore();

import { useRouter, useRoute } from 'vue-router'
const router = useRouter();
const route = useRoute();
let routerHook: (() => void) | null = null;

const articles = ref<RelatedPost[]>([]);
const initArticles = async ()=>{
    articles.value = [];
    const postId = String(route.params.post_id);
    if(/^[-]?([1-9]\d*|0)(\.\d+)?$/.test(postId)){
        const res = await axios.get<RelatedPost[]>(Endpoints.related + '/' + postId, {params: {_embed: true, limit: 4}});
        articles.value = res.data;
    }
    ajaxReadyStore.ready(Endpoints.related);
}

onMounted(()=>{
    initArticles();
    routerHook = router.afterEach(initArticles);
});
onUnmounted(()=>{
    routerHook?.();
});
</script>
