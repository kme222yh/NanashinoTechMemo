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
import { ref, onMounted } from 'vue'

import { useRouter } from 'vue-router'
const router = useRouter();

const visible = ref(false);

const waitmSecound = (s=500)=>{
    return new Promise((resolve)=>{
        setTimeout(resolve, s)
    })
}

onMounted(()=>{
    router.beforeEach(async ()=>{
        visible.value = true;
        await waitmSecound();
    });
    router.afterEach(async ()=>{
        await waitmSecound();
        visible.value = false;
    });
})
</script>
