<template>
    <div class="articleLink">
        <div class="articleLink-body">
            <small class="articleLink-date"><time>{{date}}</time></small>
            <component class="articleLink-title" :is="htag">
                <router-link :to="{name: 'Article', params: {post_id: id}}">{{title}}</router-link>
            </component>
            <div class="articleLink-media">
                <router-link :to="{name: 'Article', params: {post_id: id}}" :style="{'background-image': `url(${media})`}"/>
            </div>
            <p class="articleLink-category">
                <router-link :to="{name: 'Category', params: {category: categories[0].slug}}">{{categories[0].name}}</router-link>
            </p>
        </div>
    </div>
</template>


<style lang="scss">
.articleLink{
    background-color: $bg-white;
    text-align: center;
    max-width: 550px;
    width: 100%;
    padding: 25px;
    margin: 20px;
    border-radius: 15px;
    &-body{

    }
    &-date{
        display: block;
        color: $text-transparent-gray;
        font-size: 14px;
        margin-bottom: 35px;
    }
    &-title{
        color: $text-dark;
        margin-bottom: 35px;
    }
    &-media{
        width: 100%;
        height: 200px;
        margin-bottom: 30px;
        a{
            display: block;
            height: 100%;
            width :100%;
            background-position: center;
            background-size: cover;
        }
        &:hover{
            opacity: 0.8;
        }
    }

    &-title, &-category, &-media{
        transition: .3s;
    }
    &-title:hover, &-category:hover,{
        color: $text-transparent-gray;
    }
}
</style>


<script setup>
import { defineProps, computed } from 'vue'

const props = defineProps({
    date: String,
    id: Number,
    title: String,
    media: String,
    categories: Array,
    htag_level: {
        type: Number,
        default: 2,
    },
})

const htag = computed(()=>`h${props.htag_level}`);
</script>
