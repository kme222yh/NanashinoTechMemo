<template>
    <div class="archivesForm">
        <form class="archivesForm-body" @submit.prevent>
            <select class="archivesForm-select" v-model="searchParam" @change="doSearch">
                <option value="">archives</option>
                <option v-for="(archive, index) in archives" :key="index" :value="archive.year+'/'+archive.month">{{archive.year}}-{{archive.month}} ({{archive.post_count}})</option>
            </select>
        </form>
    </div>
</template>


<style lang="scss">
.archivesForm{
    &-body{
        @include outerBody;
        max-width: 360px;
        height: 240px;
        display: flex;
        justify-content: center;
        align-items: center;

        position: relative;
        &::after{
            position: absolute;
            top: 50%;
            right: 45px;
            transform: translateY(-50%);
            content: "\f0d7";
            font-size: 20px;
            font-weight: 900;
            font-family: "Font Awesome 5 Free";
            color: $text-transparent-gray;
            pointer-events: none;
        }
    }
    &-select{
        display: flex;
        align-items: center;
        height: 40px;
        width: 100%;
        border: 1px solid;
        color: $text-transparent-gray;
        font-size: 20px;
        padding: 0 10px;
        border-radius: 5px;
        transition: .5s;
        &:hover{color: $text-dark;}
        &:focus{
            box-shadow: 0 0 0px 3px $text-transparent-gray;
            border: 1px solid $text-transparent-gray;
            color: $text-dark;
        }
    }
}
</style>


<script setup>
import { onMounted, ref, onUnmounted } from 'vue'
import Endpoints from '@/config/endpoints'
import { useRouter, useRoute } from 'vue-router'
const router = useRouter();
const route = useRoute();
let routerHook = null;

const searchParam = ref('');
const doSearch = ()=>{
    if(searchParam.value == ''){
        router.push({name: 'Home'});
    } else {
        router.push('/archive/'+searchParam.value);
    }
}
const initSearchParam = () => {
    if(route.name != 'Archive'){
        searchParam.value = '';
    }
    else{
        searchParam.value = `${route.params.year}/${route.params.month}`
    }
}

const archives = ref([]);
onMounted(()=>{
    axios.get(Endpoints.archives).then((res)=>{
        archives.value = res.data;
    });
    initSearchParam();
    routerHook = router.afterEach(initSearchParam);
});
onUnmounted(()=>{
    routerHook();
})
</script>
