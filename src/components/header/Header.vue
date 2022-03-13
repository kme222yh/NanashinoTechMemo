<template>
    <header class="header" :class="{visible: headerVisible}">
        <div class="header-body">

            <SiteTitleBar/>
            <GlobalNav/>

        </div>
    </header>
</template>


<style lang="scss">
.header{
    @include box-shadow;
    position: sticky;
    z-index: 2;
    top: -156px;
    transition: .3s;
    @include tablet{
        top: -66.25px;
    }
    @include mobile{
        top: -45px;
    }
    &.visible{
        top: -91px;
        @include box-shadow;
        @include tablet{
            top: 0px;
        }
    }
}
</style>


<script setup>
import { ref, onMounted } from 'vue'

import SiteTitleBar from './SiteTitleBar.vue'
import GlobalNav from './GlobalNav.vue'

// switch visibility acording to value of scrolled.
const headerVisible = ref(false);
const scrolledValue = ref(0);
const scrollingWatch = ()=>{
    if(window.innerWidth > 850){
        if(window.pageYOffset > 600){headerVisible.value = true}
        else{headerVisible.value = false}
    }
    else{
        const scrolled = window.pageYOffset - scrolledValue.value
        if(scrolled > 10){
            scrolledValue.value = window.pageYOffset
            headerVisible.value = false
        }
        else if(scrolled < -30){
            scrolledValue.value = window.pageYOffset
            headerVisible.value = true
        }
    }
};

// start watching scroll
onMounted(()=>{setInterval(scrollingWatch, 100);})
</script>
