<template>
    <div class="footerWidget">
        <ul class="footerWidget-body" v-html="widget"></ul>
    </div>
</template>


<style lang="scss">
.footerWidget{
    padding: 40px 0 55px;
    background-color: $bg-white;
    color: $bg-transparent-gray;
    &-body{
        @include outerBody;
        display: flex;
        justify-content: space-between;
    }

    .widget_block{
        max-width: $footer-widget-max-width;
        width: 31%;
        h2{
            text-align: center;
            margin-bottom: 20px;
            &::after{
                display: block;
                margin: 0 auto;
                margin-top: 10px;
                height: 9px;
                max-width : $footer-widget-max-width;
                width: 100%;
                border-radius: 10px;
                background-color: $bg-transparent-gray;
                content: '';
            }
        }
    }

    @include tablet{
        padding: 30px 0 55px;
        &-body{
            display: block;
        }

        .widget_block{
            max-width: 100%;
            width: 100%;
            margin-bottom: 50px;
            &:last-child{
                margin-bottom: 0;
            }
            .wp-block-group__inner-container{
                text-align: center;
            }
        }
    }
}
</style>


<script setup>
import { ref, onMounted, inject } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter();


const widget = inject('footerWidget');


import { loadScripts, unLoadScript } from '@/config/wpJavascriptDependency'
import st from '@/helper/simpleTrier'
const widgetWatcher = new st;
widgetWatcher.do(()=>{
    document.dispatchEvent((new Event('DOMContentLoaded')));
    loadScripts('twitter');
}).when(()=>document.getElementsByClassName('widget').length>0);
const wppWatcher = new st;
wppWatcher.do(()=>{
    const $wpp = document.getElementsByClassName('popular-posts-sr')[0];
    const $aList = $wpp.shadowRoot.querySelectorAll('a');
    for(const $a of $aList){
        const $aList = $wpp.shadowRoot.querySelectorAll('a');
        $a.addEventListener('click', e=>{
            const url = (new URL(e.currentTarget.getAttribute('href'))).pathname;
            if(url != window.location.pathname){
                router.push(url);
            }
            e.preventDefault();
        })
    }
}).when(()=>{
    const $wpp = document.getElementsByClassName('popular-posts-sr')[0];
    return $wpp && $wpp.shadowRoot;
});


onMounted(()=>{
    widgetWatcher.run()
    wppWatcher.run();
})
</script>
