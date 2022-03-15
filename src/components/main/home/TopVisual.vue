<template>
    <div class="topVisual" :style="{'background-image': bgStyle }">
        <h2 class="topVisual-title">
            <router-link v-if="props.id" :to="{name: 'Article', params: {post_id: props.id}}">{{props.title}}</router-link>
            <p v-else>{{props.title}}</p>
        </h2>

        <router-link class="topVisual-category" v-if="props.category_slug" :to="{name: 'Category', params: {category: props.category_slug}}">{{props.category}}</router-link>
        <p class="topVisual-category" v-else-if="props.category">{{props.category}}</p>
        
        <div class="topVisual-date">
            <small class="wrote"><i class="fas fa-pen"></i> {{props.date}}</small>
            <small class="modified" v-if="props.date!=props.date_modified"><i class="fas fa-sync-alt"></i> {{props.date_modified}}</small>
        </div>
    </div>
</template>


<style lang="scss">
.topVisual{
    position: relative;
    width: 100%;
    height: 500px;
    background-size :cover;
    background-position: center;
    background-repeat: no-repeat;
    display: flex;
    flex-direction: column;
    justify-content: center;
    &-title{
        text-align: center;
        color: $text-light;
        font-size: 40px;
        @include tablet{font-size: 30px;}
        @include mobile{font-size: 25px;}
    }
    &-category{
        color: $text-light;
        position: absolute;
        top: 80px;
        right: 50%;
        transform: translateX(50%);
        font-size: 20px;
        padding: 0px 30px;
        border: 1px solid;
        border-radius: 5px;
    }
    &-date{
        color: $text-light;
        position: absolute;
        bottom: 130px;
        right: 50%;
        transform: translateX(50%);
        width: 100%;
        text-align: center;
        .wrote, .modified{font-size: 14px;}
        .modified{
            margin-left: 20px;
            &::before{
                position: absolute;
                top: 50%;
                transform: translateY(-50%);
                left: 50%;
                width: 1px;
                height: 10px;
                background-color: $bg-transparent-white;
                content: '';
            }
        }
    }
    a{
        transition: .5s;
        &:hover{
            color: $bg-transparent-white;
        }
    }
}
</style>


<script setup>
import { defineProps, computed } from 'vue'
const props = defineProps({
    id: String,
    title: String,
    category: String,
    category_slug: String,
    date: String,
    date_modified: String,
    media: String,
})

const bgStyle = computed(()=>{
    let style = 'linear-gradient(rgba(18, 47, 61, 0.5), rgba(18, 47, 61, 0.5))';
    if(props.media) style += `,url(${props.media})`
    return style;
});
</script>
