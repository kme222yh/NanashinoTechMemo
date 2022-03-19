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
import { ref, onMounted, inject, nextTick } from 'vue'
import Endpoints from '@/config/endpoints'

import { useAjaxReadyStore } from '@/stores/ajaxReady'
const ajaxReadyStore = useAjaxReadyStore();

import { useRouter } from 'vue-router'
const router = useRouter();


// Control the javascript that wp depends on.
import usePageDisplayReady from '@/config/pageDisplayReady'
const { doesAppReady } = usePageDisplayReady();
import sw from '@/helper/simpleWatcher'
const appWatcher = new sw(doesAppReady, ()=>{
    // wpp widget setup
    nextTick(()=>{document.dispatchEvent((new Event('DOMContentLoaded')))})
});


// over write links of wpp widget
const overWritten = ref(false);
const tryOverWriteWppLink = ()=>{
    const $wpp = document.getElementsByClassName('popular-posts-sr')[0];
    if($wpp && $wpp.shadowRoot){
        const $aList = $wpp.shadowRoot.querySelectorAll('a');
        for(const $a of $aList){
            $a.addEventListener('click', e=>{
                const url = (new URL(e.currentTarget.getAttribute('href'))).pathname;
                if(url != window.location.pathname){
                    router.push(url);
                }
                e.preventDefault();
            })
        }
        overWritten.value = true;
    } else {
        startTryOverWriteWppLink();
    }
}
const startTryOverWriteWppLink = ()=>{setTimeout(tryOverWriteWppLink, 500)};


const widget = inject('footerWidget');


onMounted(async ()=>{
    appWatcher.run()
    startTryOverWriteWppLink();
})
</script>
