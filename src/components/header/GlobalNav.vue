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
    &-item{
        min-width: 150px;
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
        z-index: 10;
        right: 22px;
        top: calc(100% + 35px);
        border-radius: 7px;
        border-top: none;
        &-body{
            display: block;
            width: 210px;
            @include box-shadow;
            &:before{
                content: '';
                background: url('@/assets/img/triangle.svg');
                background-size: cover;
                position: absolute;
                right: 0;
                bottom: calc(100% - 4px);
                width: 40px;
                height: 34px;
            }
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
import { onMounted, ref } from 'vue'
import Endpoints from '@/config/endpoints'

const menus = ref([]);
onMounted(()=>{
    axios.get(Endpoints.globalMenu).then((res)=>{
        menus.value = res.data;
    })
});

// importing openManagimentStore
import { useOpenManagimentStore } from '@/stores/openManagiment'
const openManagimentStore = useOpenManagimentStore();
</script>
