<template>
    <transition>
        <nav class="globalNav" v-show="openManagimentStore.isOpened('globalMenu')">
            <ul class="globalNav-body">
                <li class="globalNav-item" v-for="(item, index) in menus" :key="index">
                    <router-link class="globalNav-link" :to="item.path" v-if="item.same_origin" @click="openManagimentStore.close()">{{item.title}}</router-link>
                    <a class="globalNav-link" v-else :href="item.url">{{item.title}}</a>
                </li>
            </ul>
        </nav>
    </transition>
</template>


<style lang="scss">
.globalNav{
    background-color: $bg-white;
    border-top: 1px $bg-thin-transparent-gray solid;
    &-body{
        display: flex;
        justify-content: center;
    }
    &-link{
        display: block;
        text-align: center;
        line-height: 3;
        padding: 0 20px;
        font-size: 20px;
        transition: .5s;
        color: $text-transparent-gray;
        &:hover{color: $text-dark;}
    }

    @include desktop{
        display: block !important;
    }

    @include tablet{
        position: absolute;
        right: calc(50% - 18px);
        top: calc(100% + 40px);
        border-radius: 7px;
        border-top: none;
        &-body{
            display: block;
            &:before{
                content: '';
                background: url('@/assets/img/triangle.svg');
                background-size: cover;
                position: absolute;
                right: -2px;
                bottom: calc(100% - 6px);
                width: 40px;
                height: 34px;
            }
        }
        &-item{
            min-width: 190px;
        }
        &-link{
            white-space: nowrap;
            padding: 0 30px;
        }
        &.v-enter-active, &.v-leave-active{
            transition: .3s;
        }
        &.v-enter-from, &.v-leave-to{
            opacity: 0;
            transform: scale(0.95) translateY(-30px);
        }
        &.v-enter-to, &.v-leave-from{
            opacity: 1;
            transform: translateY(0px);
        }
    }
}
</style>


<script setup>
import { onMounted, ref, inject } from 'vue'

const menus = inject('globalMenu');

// importing openManagimentStore
import { useOpenManagimentStore } from '@/stores/openManagiment'
const openManagimentStore = useOpenManagimentStore();
</script>
