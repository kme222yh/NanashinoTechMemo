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
        padding: 0 !important;
    }
    .relatedArticles{
        margin-top: 70px;
        border-top: 1px solid rgba(18,47,61,.2);
    }

    @include tablet{
        .relatedArticles{
            margin-top: 0;
            border: none;
        }
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
const route = useRoute();
const router = useRouter();

const article = ref([]);
const wppIncrement = ()=>{
    axios.post(Endpoints.wppIncrement + `?wpp_id=${route.params.post_id}`);
}
const getArticleInfo = async () => {
    article.value = [];

    axios.get(Endpoints.article + '/' + route.params.post_id).then((res)=>{
        article.value = res.data;
        wppIncrement();
        ajaxReadyStore.ready(Endpoints.article);
    }).catch((res)=>{
        router.push({name: 'NotFound'});
    });
}

onMounted(getArticleInfo);
</script>
