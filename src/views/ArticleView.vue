<template>
    <Content :content="article.content" />
</template>


<style lang="scss">
</style>


<script setup>
import Content from '@/components/main/article/Content.vue'

import { onMounted, ref } from 'vue'
import Endpoints from '@/config/endpoints'

const article = ref([]);

import { useRoute } from 'vue-router'
const route = useRoute()

onMounted(()=>{
    axios.get(Endpoints.article + '/' + route.params.post_id).then((res)=>{
        article.value = res.data;
        console.log(article.value);
    });
});
</script>
