<template>
    <nav class="globalNav">
        <ul class="globalNav-body">
            <li class="globalNav-item" v-for="(item, index) in menus" :key="index">
                <router-link class="globalNav-link" :to="item.path" v-if="item.same_origin">{{item.title}}</router-link>
                <a class="globalNav-link" v-else :href="item.url">{{item.title}}</a>
            </li>
        </ul>
    </nav>
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

    @include tablet{
        &-body{

        }
        &-item{

        }
        &-link{

        }
    }

    @include mobile{
        &-body{

        }
        &-item{

        }
        &-link{

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
</script>
