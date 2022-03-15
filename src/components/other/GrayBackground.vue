<template>
    <transition>
        <div class="graybackground" v-show="openManagimentStore.isOpened()">
            <div class="graybackground-body" @click="openManagimentStore.close()" />
        </div>
    </transition>
</template>


<style lang="scss">
.graybackground{
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 100;
    &-body{
        height: 100%;
        width: 100%;
        background-color: $bg-dark;
        opacity: 0.4;
    }

    &.v-enter-active, &.v-leave-active{
        transition: .3s;
    }
    &.v-enter-from, &.v-leave-to{
        opacity: 0;
    }
    &.v-enter-to, &.v-leave-from{
        opacity: 1;
    }
}
</style>


<script setup>
import { useOpenManagimentStore } from '@/stores/openManagiment'
const openManagimentStore = useOpenManagimentStore();
</script>
