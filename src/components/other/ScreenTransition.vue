<template>
    <transition>
        <div class="screenTransition" v-if="visible"></div>
    </transition>
</template>


<style lang="scss">
    .screenTransition{
        position: fixed;
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
        z-index: 998;
        background-color: $bg-light;


        &.v-leave-active, &.v-enter-active{
            transition: .5s;
        }
        &.v-leave-from, &.v-enter-to{
            opacity: 1;
        }
        &.v-leave-to, &.v-enter-from{
            opacity: 0;
        }
    }
</style>


<script setup>
import { ref, onMounted, watch, computed, nextTick } from 'vue'

import { useRouter } from 'vue-router'
const router = useRouter();

const visible = ref(false);

const waitmSecound = (s=500)=>{
    return new Promise((resolve)=>{
        setTimeout(resolve, s)
    })
}


const hideOpeningAnimation = ()=>{
    const el = document.getElementById('opening-animation');
    el.classList.add('hide');
    setTimeout(()=>{el.style.display="none"}, 1010);
}


import usePageDisplayReady from '@/config/pageDisplayReady'
const {doesReadyHomeView ,doesReadyArticleView ,refresh} = usePageDisplayReady();


let watchStopHandler = null;
const startRoutingWatch = (target)=>{
    return watch(target, ()=>{
        watchStopHandler();
        visible.value = false;
        hideOpeningAnimation();
    })
}


onMounted(()=>{
    router.beforeEach(async ()=>{
        visible.value = true;
        await waitmSecound();
        refresh();
    });
    router.afterEach((to, from)=>{
        if(to.name=='Home'||to.name=='Search'||to.name=='Category'||to.name=='Archive'){
            watchStopHandler = startRoutingWatch(doesReadyHomeView);
        } else if(to.name=='Article'){
            watchStopHandler = startRoutingWatch(doesReadyArticleView);
        }
    });
})
</script>
