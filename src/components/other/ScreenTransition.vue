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


        &.v-enter-active{
            transition: .5s;
        }
        &.v-leave-active{
            transition: .7s;
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


const waitmSecound = (s=500)=>{
    return new Promise((resolve)=>{
        setTimeout(resolve, s)
    })
}


let finishOpeningAnimation = ()=>{
    const el = document.getElementById('opening-animation');
    el.classList.add('hide');
    setTimeout(()=>{el.style.display="none"}, 1010);
}


import usePageDisplayReady from '@/config/pageDisplayReady'
const { doesAppReady, refresh } = usePageDisplayReady();
import { loadScripts, unLoadScript } from '@/config/wpJavascriptDependency'
import sw from '@/helper/simpleWatcher'
const visible = ref(false);
const finishScreenTransition = ()=>{
    visible.value = false;
    finishOpeningAnimation();
    finishOpeningAnimation = ()=>{};
}
const appWatcher = new sw(doesAppReady, finishScreenTransition);


router.beforeEach(async (to, from)=>{
    if(from.name && to.fullPath == from.fullPath){
        return;
    }
    visible.value = true;
    refresh();
    if(to.name == 'NotFound' || to.name == 'Contact'){
        setTimeout(finishScreenTransition, 500);
    } else {
        appWatcher.run();
    }
    await waitmSecound();
});
</script>
