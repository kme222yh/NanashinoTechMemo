<template>
    <section class="articles">
        <div class="articles-body">
            <div class="articles-empty" v-show="articles.length==0">
                <p>記事が見つかりませんでした…</p>
                <p>( ；∀；)</p>
            </div>
            <ArticleLink v-for="(article, index) in articles" :key="index"
                :id="article.id"
                :date="article.date"
                :title="article.title"
                :media="article.media"
                :categories="article.categories"
            />
        </div>
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
}
</style>


<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import Endpoints from '@/config/endpoints'
import ArticleLink from './ArticleLink.vue'

const router = useRouter();
const route = useRoute();
let routerHook = null;

const articles = ref([]);
const initArticles = async ()=>{
    articles.value = [];
    const res = await axios.get(Endpoints.articles, {params: Object.assign(route.params, route.query)});
    articles.value = res.data.articles;
}

onMounted(()=>{
    initArticles();
    routerHook = router.afterEach(()=>{
        document.getElementsByClassName("searchForm")[0].scrollIntoView(true);
        initArticles();
    });
});
onUnmounted(()=>{
    routerHook();
});
</script>
