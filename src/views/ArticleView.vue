<template>
    <main class="articleView">
        <div class="articleView-body">
            <Breadcrumb :title="article.title" :category="article.category" :category_slug="article.category_slug" />
            <TopVisual
                :title="article.title"
                :category="article.category"
                :date="article.date"
                :date_modified="article.date_modified"
                :media="article.media"
            />
            <Content :content="article.content" />
            <RelatedArticles />
            <Breadcrumb :title="article.title" :category="article.category" :category_slug="article.category_slug" />
        </div>
    </main>
</template>


<style lang="scss">
.articleView{
    &-body{

    }
    .topVisual{
        @include outerBody;
    }
    .relatedArticles{
        margin-top: 70px;
        border-top: 1px solid rgba(18,47,61,.2);
    }
}
</style>


<script setup>
import TopVisual from '@/components/main/home/TopVisual.vue'
import Content from '@/components/main/article/Content.vue'
import Breadcrumb from '@/components/main/article/Breadcrumb.vue'
import RelatedArticles from '@/components/main/article/RelatedArticles.vue'

import { ref, onMounted, onUnmounted } from 'vue'
import Endpoints from '@/config/endpoints'

import { useAjaxReadyStore } from '@/stores/ajaxReady'
const ajaxReadyStore = useAjaxReadyStore();

import { useRoute, useRouter } from 'vue-router'
const router = useRouter();
const route = useRoute();
let routerHook = null;

const article = ref([]);
const getArticleInfo = async () => {
    article.value = [];
    const res = await axios.get(Endpoints.article + '/' + route.params.post_id);
    article.value = res.data;
    ajaxReadyStore.ready(Endpoints.article);
}

onMounted(()=>{
    document.getElementsByClassName("topVisual")[0].scrollIntoView(true);
    getArticleInfo()
    routerHook = router.afterEach((to, from)=>{
        if(to.name == 'Article'){
            document.getElementsByClassName("topVisual")[0].scrollIntoView(true);
            getArticleInfo();
        }
    });
});
onUnmounted(()=>{
    routerHook();
});
</script>
