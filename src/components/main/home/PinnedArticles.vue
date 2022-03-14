<template>
    <section class="pinnedArticles">
        <h1 style="display: none;">Pinned articles</h1>
        <div class="pinnedArticles-body" @touchstart="swipeStart" @touchmove="swiping" @touchend="swipeEnd"  @mousedown="slideStart" @mousemove="sliding" @mouseup="swipeEnd">

            <transition-group>
                <div class="pinnedArticles-item" v-for="(article, index) in articles" :key="index+0" v-show="visibleArticle==index" :style="{'background-image': article.bgStyle }">
                    <h2 class="pinnedArticles-item-title"><router-link to="/">{{article.title}}</router-link></h2>
                    <router-link class="pinnedArticles-item-category" v-if="article.category_slug" to="/">{{article.category}}</router-link>
                    <div class="pinnedArticles-item-date">
                        <small class="wrote"><i class="fas fa-pen"></i> {{article.date}}</small>
                        <small class="modified" v-if="article.date!=article.date_modified"><i class="fas fa-sync-alt"></i> {{article.date_modified}}</small>
                    </div>
                </div>
            </transition-group>

            <div class="pinnedArticles-item pinnedArticles-dammy"/>

            <div class="pinnedArticles-control next" @click="pinnedArticleNext"><i class="fas fa-chevron-right"></i></div>
            <div class="pinnedArticles-control previous" @click="pinnedArticlePrevious"><i class="fas fa-chevron-left"></i></div>
        </div>
    </section>
</template>


<style lang="scss">
.pinnedArticles{
    position: relative;
    overflow: hidden;
    &-body{

    }
    &-item{
        position: absolute;
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

        a,small{
            user-select: none;
        }
        transform: scale(1.05);
        &.v-enter-active, &.v-leave-active{
            transition: 2s;
        }
        &.v-enter-from{
            transform: scale(1);
            opacity: 0;
        }
        &.v-enter-to{
            transform: scale(1.05);
            opacity: 1;
        }
        &.v-leave-from{
            transform: scale(1.05);
            opacity: 1;
        }
        &.v-leave-to{
            transform: scale(1.1);
            opacity: 0;
        }
    }
    &-dammy{
        pointer-events: none;
        position: static;
        opacity: 0;
    }
    &-control{
        position: absolute;
        cursor: pointer;
        display: block;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        z-index: 2;
        background-color: $bg-transparent-white;
        width: 70px;
        height: 70px;
        font-size: 20px;
        border-radius: 4px;
        display: flex;
        justify-content: center;
        align-items: center;
        transition: .5s;
        &.next{
            right: 0;
            transform: translate(100%, -50%);
        }
        &.previous{
            left: 0;
            transform: translate(-100%, -50%);
        }
        &:hover{background-color: $bg-white;}
        @include tablet{
            display: none;
        }
    }
    &:hover{
        .next{transform: translate(-20%, -50%);}
        .previous{transform: translate(20%, -50%);}
    }
}
</style>


<script setup>
import { onMounted, ref } from 'vue'
import Endpoints from '@/config/endpoints'

const articles = ref([]);


const visibleArticle = ref(0);
const pinnedArticleChangeInterval = ref(null);
const pinnedArticleChange = (next)=>{
    if(next == true){
        if(visibleArticle.value >= articles.value.length-1){
            visibleArticle.value = 0
        } else {
            visibleArticle.value ++
        }
    } else {
        if(visibleArticle.value <= 0){
            visibleArticle.value = articles.value.length-1
        } else {
            visibleArticle.value --
        }
    }
}
const pinnedArticleNext = ()=>{
    clearInterval(pinnedArticleChangeInterval.value);
    pinnedArticleChange(true);
    pinnedArticleChangeInterval.value = setInterval(()=>pinnedArticleChange(true), 10000);
}
const pinnedArticlePrevious = ()=>{
    clearInterval(pinnedArticleChangeInterval.value);
    pinnedArticleChange(false);
    pinnedArticleChangeInterval.value = setInterval(()=>pinnedArticleChange(true), 10000);
}


const pointerStart = ref(0);
const pointerEnd = ref(0);
const swipeStart = (e)=>{
    pointerStart.value = e.touches[0].pageX;
    pointerEnd.value = e.touches[0].pageX
}
const swiping = (e)=>{
    pointerEnd.value = e.changedTouches[0].pageX
}
const swipeEnd = ()=>{
    const th = 30
    if(pointerEnd.value - pointerStart.value > th){
        pinnedArticlePrevious()
    }
    else if (pointerEnd.value - pointerStart.value < -th){
        pinnedArticleNext()
    }
}
const slideStart = (e)=>{
    pointerStart.value = e.pageX;
    pointerEnd.value = e.pageX
}
const sliding = (e)=>{
    pointerEnd.value = e.pageX
}


onMounted(()=>{
    // obtain pinned article data.
    axios.get(Endpoints.pinnedMenu).then((res)=>{
        articles.value = res.data;
        for (const key of Object.keys(articles.value)) {
            articles.value[key].bgStyle = 'linear-gradient(rgba(18, 47, 61, 0.5), rgba(18, 47, 61, 0.5))';
            if(articles.value[key].media) articles.value[key].bgStyle += `,url(${articles.value[key].media})`;
        }
    });
    // start pinned article changing
    pinnedArticleChangeInterval.value = setInterval(()=>pinnedArticleChange(true), 10000);
});
</script>
