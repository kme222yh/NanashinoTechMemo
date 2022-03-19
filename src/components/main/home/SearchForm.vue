<template>
    <div class="searchForm">
        <form class="searchForm-body" @submit.prevent>
            <input class="searchForm-input" type="text" placeholder="search ..." v-model="searchWord">
            <button class="searchForm-button" type="submit" @click="doSearch"><i class="icon fas fa-search"></i></button>
        </form>
    </div>
</template>


<style lang="scss">
.searchForm{
    &-body{
        @include outerBody;
        max-width: 360px;
        height: 240px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    &-input, &-button{
        height: 40px;
        border: 1px solid;
        color: $text-transparent-gray;
        font-size: 20px;
        line-height: 1.5;
        transition: .5s;
        &:hover{color: $text-dark;}
    }
    &-input{
        width: 100%;
        padding: 0 10px;
        border-radius: 5px;
        &:focus{
            box-shadow: 0 0 0px 3px $text-transparent-gray;
            border: 1px solid $text-transparent-gray;
            color: $text-dark;
        }
    }
    &-button{
        cursor: pointer;
        width: 40px;
        border-radius: 20px;
        margin-left: 20px;
        .icon{
            display: block;
            text-align: center;
        }
        flex-shrink: 0;
    }

    @include tablet{
        &-body{
            height: 210px;
        }
    }
    @include mobile{
        &-body{
            height: 180px;
        }
    }
}
</style>


<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

import { useRouter, useRoute } from 'vue-router'
const router = useRouter();
const route = useRoute();
let routerHook = null;

const searchWord = ref('');
const oldSearchWord = ref('');
const doSearch = ()=>{
    if(searchWord.value == oldSearchWord.value)
        return;
    else if(searchWord.value == '')
        router.push({name: 'Home'});
    else
        router.push({name: 'Search', query: {s: searchWord.value}});
}
const initSearchWord = () => {
    if(route.query.s != undefined){
        searchWord.value = route.query.s;
        oldSearchWord.value = route.query.s;
    }
    else{
        searchWord.value = '';
        oldSearchWord.value = '';
    }
}

onMounted(()=>{
    initSearchWord();
    routerHook = router.afterEach(initSearchWord);
});
onUnmounted(()=>{
    routerHook();
})
</script>
