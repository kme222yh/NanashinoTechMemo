<template>
    <section class="articles">
        <div class="articles-body">
            <div class="articles-empty" v-show="articles.length==0">
                <p>記事が見つかりませんでした…</p>
                <p>( ；∀；)</p>
            </div>
            <ArticleLink v-for="(article, index) in articles" :key="index" :class="{'hidden': index>displayedArticleIdx}"
                :id="article.id"
                :date="article.date"
                :title="article.title"
                :media="article.media"
                :categories="article.categories"
            />
        </div>
        <div class="articles-load" v-if="nextPage" @click="moreArticles">
            <p class="articles-load-text">さらに読み込む…</p>
        </div>
        <StayBackground :visible="moreLoading"/>
    </section>
</template>


<style lang="scss">
.articles{
    &-body{
        min-height: 70vh;
        position: relative;
        display: flex;
        justify-content: center;
        align-items: flex-start;
        flex-wrap: wrap;
        padding: 30px 0;
    }
    &-empty{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        text-align: center;
        width: 100%;
        color: $text-transparent-gray;
        font-size: 20px;
    }
    &-load{
        @include outerBody;
        margin-top: 40px;
        margin-bottom: 60px;
        text-align: center;
        max-width: 300px;
        &-text{
            cursor: pointer;
            padding: 0px 30px;
            border: 1px solid;
            border-radius: 5px;
            color: $text-transparent-gray;
            transition: .5s;
            &:hover{color: $text-dark;}
        }
    }

    .articleLink{
        transition: 1s;
        opacity: 1;
        transform: none;
        &.hidden{
            opacity: 0;
            transform: translateY(5%) scale(0.98);
        }
    }
}
</style>


<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import Endpoints from '@/config/endpoints'
import ArticleLink from './ArticleLink.vue'
import StayBackground from '@/components/other/StayBackground.vue'

import { useAjaxReadyStore } from '@/stores/ajaxReady'
const ajaxReadyStore = useAjaxReadyStore();

import usePageDisplayReady from '@/config/pageDisplayReady'
const {doesReadyHomeView} = usePageDisplayReady();

import { useRouter, useRoute } from 'vue-router'
const router = useRouter();
const route = useRoute();
let routerHook = null;

const articles = ref([]);
const displayedArticleIdx = ref(-1);
const moreLoading = ref(false);
const nextPage = ref(1);
const initArticles = async ()=>{
    nextPage.value = 1;
    articles.value = [];
    displayedArticleIdx.value = -1;
    const res = await axios.get(Endpoints.articles, {params: Object.assign({page: nextPage.value}, route.query, route.params)});
    watchStopHandler = startRoutingWatch(doesReadyHomeView);
    articles.value = res.data.articles;
    nextPage.value = res.data.next_page;
    ajaxReadyStore.ready(Endpoints.articles);
}
const moreArticles = async ()=>{
    moreLoading.value = true;
    const res = await axios.get(Endpoints.articles, {params: Object.assign({page: nextPage.value}, route.query, route.params)});
    Array.prototype.push.apply(articles.value, res.data.articles);
    nextPage.value = res.data.next_page;
    setTimeout(f, 300);
    setTimeout(()=>{moreLoading.value = false;}, 1000);
}

let watchStopHandler = null;
const f = ()=>{
    if(displayedArticleIdx.value < articles.value.length-1){
        displayedArticleIdx.value++
        setTimeout(f, 300);
    }
}
const startRoutingWatch = (target)=>{
    return watch(target, ()=>{
        watchStopHandler();
        setTimeout(f, 300);
    })
}

onMounted(initArticles);
</script>
