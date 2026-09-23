<script setup lang="ts">
import axios from 'axios'
// import templates
import { RouterView, useRoute } from 'vue-router'
import Header from '@/components/header/Header.vue'
import Footer from '@/components/footer/Footer.vue'
import GrayBackground from '@/components/other/GrayBackground.vue'
import ScreenTransition from '@/components/other/ScreenTransition.vue'


import { onMounted, provide, ref } from 'vue'
const route = useRoute();


// fetch layout data from endpoint and provide to child components.
import ep from '@/config/endpoints'
import { appDataKeys } from '@/injectionKeys'
import type { AppData } from '@/types/api'
import { useAjaxReadyStore } from '@/stores/ajaxReady'
const ars = useAjaxReadyStore();

const appData = {
    globalMenu: ref<AppData['globalMenu']>([]),
    footerMenu: ref<AppData['footerMenu']>([]),
    footerWidget: ref<AppData['footerWidget']>(''),
    archives: ref<AppData['archives']>([]),
    categories: ref<AppData['categories']>({}),
    pinnedArticles: ref<AppData['pinnedArticles']>([]),
};
provide(appDataKeys.globalMenu, appData.globalMenu);
provide(appDataKeys.footerMenu, appData.footerMenu);
provide(appDataKeys.footerWidget, appData.footerWidget);
provide(appDataKeys.archives, appData.archives);
provide(appDataKeys.categories, appData.categories);
provide(appDataKeys.pinnedArticles, appData.pinnedArticles);

const fetchLayoutData = async ()=>{
    const { data } = await axios.get<AppData>(ep.app);
    appData.globalMenu.value = data.globalMenu;
    appData.footerMenu.value = data.footerMenu;
    appData.footerWidget.value = data.footerWidget;
    appData.archives.value = data.archives;
    appData.categories.value = data.categories;
    appData.pinnedArticles.value = data.pinnedArticles;
    ars.ready(ep.app, true);
}


onMounted(fetchLayoutData);
</script>


<template>
    <Header/>
    <RouterView :key="route.fullPath" />
    <Footer/>
    <GrayBackground />
    <ScreenTransition />
</template>


<style lang="scss">
#app{
    width: 100%;
}

body{
    font-family: 'M PLUS Rounded 1c', sans-serif;
    color: $text-dark;
    background-color: $bg-light;
    line-height: 2;
    font-size: 15px;
    letter-spacing: .03em;
}

h2, h3, h4, h5{
    font-size: 20px;
}
small{
    font-size: 12px;
}
a{
    color: inherit;
    text-decoration: none;
}

input, select, textarea, button{
    -moz-appearance: none;
    -webkit-appearance: none;
}
</style>
