<template>
    <transition>
        <div class="screenTransition" v-if="visible">
            <div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
        </div>
    </transition>
</template>


<style lang="scss">
    .screenTransition{
        position: fixed;
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
        z-index: 999;
        background-color: $bg-light;


        &.v-enter-active, &.v-leave-active{
            transition: .7s;
        }
        &.v-leave-from, &.v-enter-to{
            opacity: 1;
        }
        &.v-leave-to, &.v-enter-from{
            opacity: 0;
        }


        .lds-ellipsis {
            display: inline-block;
            position: relative;
            width: 80px;
            height: 80px;

            position: absolute;
            top: 50%;
            right: 50%;
            transform: translate(50%,-50%) scale(1.5);
        }
        .lds-ellipsis div {
          position: absolute;
          top: 33px;
          width: 13px;
          height: 13px;
          border-radius: 50%;
          background: $bg-transparent-gray;
          animation-timing-function: cubic-bezier(0, 1, 1, 0);
        }
        .lds-ellipsis div:nth-child(1) {
          left: 8px;
          animation: lds-ellipsis1 0.6s infinite;
        }
        .lds-ellipsis div:nth-child(2) {
          left: 8px;
          animation: lds-ellipsis2 0.6s infinite;
        }
        .lds-ellipsis div:nth-child(3) {
          left: 32px;
          animation: lds-ellipsis2 0.6s infinite;
        }
        .lds-ellipsis div:nth-child(4) {
          left: 56px;
          animation: lds-ellipsis3 0.6s infinite;
        }
        @keyframes lds-ellipsis1 {
          0% {
            transform: scale(0);
          }
          100% {
            transform: scale(1);
          }
        }
        @keyframes lds-ellipsis3 {
          0% {
            transform: scale(1);
          }
          100% {
            transform: scale(0);
          }
        }
        @keyframes lds-ellipsis2 {
          0% {
            transform: translate(0, 0);
          }
          100% {
            transform: translate(24px, 0);
          }
        }
    }
</style>


<script setup>
import { ref, onMounted, watch, computed, nextTick } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter();


const waitmSecound = (s)=>{
    return new Promise((resolve)=>{
        setTimeout(resolve, s)
    })
}


let finishOpeningAnimation = ()=>{
    const el = document.getElementById('opening-animation');
    setTimeout(()=>{el.classList.add('hide')}, 1000);
    setTimeout(()=>{el.style.display="none"}, 2000);
}


import usePageDisplayReady from '@/config/pageDisplayReady'
const { doesAppReady, refresh } = usePageDisplayReady();
import { loadScripts, unLoadScript } from '@/config/wpJavascriptDependency'
import sw from '@/helper/simpleWatcher'
const visible = ref(false);
const finishScreenTransition = async ()=>{
    await nextTick();
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
    await nextTick();
    await waitmSecound(800);
    refresh();
    if(to.name=='NotFound' || to.name=='Contact' || to.hash | to.path==from.path){
        setTimeout(finishScreenTransition, 500);
    } else {
        appWatcher.run();
    }
});
</script>
