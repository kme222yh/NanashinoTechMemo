<template>
    <div class="breadcrumb">
        <div class="breadcrumb-body">
            <span>
                <router-link :to="{name: 'Home'}"><span><i class="fas fa-home"></i></span></router-link>
                &gt;&nbsp;
            </span>
            <span v-if="category_slug" class="breadcrumbs">
                <router-link :to="{name: 'Category', params: {category: props.category_slug}}"><span>{{category}}</span></router-link>
                &gt;&nbsp;
            </span>
            <span>{{title}}</span>
        </div>
    </div>
</template>


<style lang="scss">
    .breadcrumb{
        &-body{
            @include outerBody;
            padding-top: 40px;
        }
        a{
            color: $text-blue;
            &:hover{
                text-decoration: underline;
            }
        }
    }
</style>


<script setup>
import { defineProps, computed } from 'vue'
const props = defineProps({
    category: String,
    category_slug: String,
    title: String,
})
</script>
