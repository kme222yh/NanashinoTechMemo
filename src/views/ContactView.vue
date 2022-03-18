<template>
    <main class="contactView">
        <div class="contactView-body">
            <Messanger/>
            <h1 class="contactView-title">{{article.title}}</h1>
            <ContactForm/>
            <Breadcrumb :title="article.title" :category="article.category" :category_slug="article.category_slug" />
        </div>
    </main>
</template>


<style lang="scss">
.contactView{
    padding-top: 30px;
    &-title{
        @include outerBody;
        font-size: 25px;
        color: $text-transparent-gray;
        text-align: center;
        margin-bottom: 20px;
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
}
</style>


<script setup>
import Breadcrumb from '@/components/main/article/Breadcrumb.vue'
import ContactForm from '@/components/main/contact/ContactForm.vue'
import Messanger from '@/components/main/contact/Messanger.vue'

import { ref, onMounted, onUnmounted } from 'vue'
import Endpoints from '@/config/endpoints'

import { useAjaxReadyStore } from '@/stores/ajaxReady'
const ajaxReadyStore = useAjaxReadyStore();

import { useRoute } from 'vue-router'
const route = useRoute();

const article = ref([]);
const getArticleInfo = async () => {
    article.value = [];
    const res = await axios.get(Endpoints.article + '/' + 'contact');
    article.value = res.data;
    ajaxReadyStore.ready(Endpoints.article);
}

onMounted(getArticleInfo);
</script>
