<template>
    <section class="articlesDescription">
        <div class="articlesDescription-body">
            <h1 class="articlesDescription-text" v-if="description">{{description}}</h1>
            <h1 style="display: none;" v-else>記事一覧</h1>
        </div>
    </section>
</template>


<style lang="scss">
.articlesDescription{
    &-body{
        @include outerBody;
    }
    &-text{
        color: $text-transparent-gray;
        font-size: 35px;
        @include tablet{
            font-size: 30px;
        }
        @include mobile{
            font-size: 25px;
        }
    }
}
</style>


<script setup>
import { ref, onMounted, onUnmounted, inject } from 'vue'

import { useRouter, useRoute } from 'vue-router'
const router = useRouter();
const route = useRoute();
let routerHook = null;

const description = ref('');
const initDescription = () => {
    if(route.name == 'Category'){
        description.value = categories.value[route.params.category] + "に関する記事";
    }
    else if(route.name == 'Archive'){
        description.value = `${route.params.year}年${route.params.month}月に投稿された記事`
    }
    else if(route.name == 'Search'){
        description.value = `「${route.query.s}」の検索結果`
    }
    else{
        description.value = ''
    }
}

const categories = inject('categories');

onMounted(async ()=>{
    initDescription();
    routerHook = router.afterEach(initDescription);
});
onUnmounted(()=>{
    routerHook();
})
</script>
