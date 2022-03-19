<template>
    <section class="pinnedArticles">
        <div class="pinnedArticles-body" @touchstart="swipeStart" @touchmove="swiping" @touchend="swipeEnd"  @mousedown="slideStart" @mousemove="sliding" @mouseup="swipeEnd">

            <transition-group>
                <TopVisual v-for="(article, index) in articles" :key="index+0" v-show="visible.index==index" :class="visible.moveTo"
                    :id="article.id"
                    :title="article.title"
                    :category="article.category"
                    :category_slug="article.category_slug"
                    :date="article.date"
                    :date_modified="article.date_modified"
                    :media="article.media"
                />
            </transition-group>

            <TopVisual class="pinnedArticles-dammy"/>

            <div class="pinnedArticles-control next" @click="pinnedArticleNext"><i class="fas fa-chevron-right"></i></div>
            <div class="pinnedArticles-control previous" @click="pinnedArticlePrevious"><i class="fas fa-chevron-left"></i></div>
        </div>
    </section>
</template>


<style lang="scss">
.pinnedArticles{
    &-body{
        position: relative;
        overflow: hidden;
    }
    .topVisual{
        $slideDis : 50px;
        width: calc(100% + $slideDis + $slideDis);
        position: absolute;
        right: -$slideDis;
        left: -$slideDis;
        a,small{
            user-select: none;
        }
        &.v-enter-active, &.v-leave-active{
            transition: 1.5s;
        }
        &.v-enter-from, &.v-leave-to{
            opacity: 0;
        }
        &.v-enter-to, &.v-leave-from{
            opacity: 1;
            transform: translateX(0);
        }
        &.right{
            &.v-enter-from{
                transform: translateX(-$slideDis);
            }
            &.v-leave-to{
                transform: translateX($slideDis);
            }
        }
        &.left{
            &.v-enter-from{
                transform: translateX($slideDis);
            }
            &.v-leave-to{
                transform: translateX(-$slideDis);
            }
        }
    }
    &-dammy{
        pointer-events: none;
        position: static !important;
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
    &:hover &-control.next{
        transform: translate(-20%, -50%);
    }
    &:hover &-control.previous{
        transform: translate(20%, -50%);
    }
}
</style>


<script setup>
// import template
import TopVisual from './TopVisual.vue'


import { onMounted, ref, onUnmounted, inject } from 'vue'


const articles = inject('pinnedArticles');


onMounted(()=>{
    pinnedArticleChangeInterval.value = setInterval(()=>pinnedArticleChange(true), 10000);
});


// switch visibled article
const visible = ref({index: 0, moveTo: 0})
const pinnedArticleChangeInterval = ref(null);
const pinnedArticleChange = (next)=>{
    if(next == true){
        if(visible.value.index >= articles.value.length-1){
            visible.value.index = 0
        } else {
            visible.value.index ++
        }
        visible.value.moveTo = 'left';
    } else {
        if(visible.value.index <= 0){
            visible.value.index = articles.value.length-1
        } else {
            visible.value.index --
        }
        visible.value.moveTo = 'right';
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
// switch visibled article by swipe
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
</script>
