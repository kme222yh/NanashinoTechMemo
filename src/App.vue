<script setup>
// import templates
import { RouterView } from 'vue-router'
import Header from '@/components/header/Header.vue'
import Footer from '@/components/footer/Footer.vue'
import GrayBackground from '@/components/other/GrayBackground.vue'
import ScreenTransition from '@/components/other/ScreenTransition.vue'


import { onMounted, provide, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
const router = useRouter();
const route = useRoute();


// fetch layout data from endpoint and provide to child components.
import ep from '@/config/endpoints'
import { useAjaxReadyStore } from '@/stores/ajaxReady'
const ars = useAjaxReadyStore();
const epAppKeys = [ // axios.get(ep.app) returns ...
    'archives',
    'categories',
    'footerMenu',
    'footerWidget',
    'globalMenu',
    'pinnedArticles',
];
let epRefObject = [];   // holds values as an arrays to dynamically define reactive variables.
for (const key of epAppKeys) {
    epRefObject[key] = ref([]);
    provide(key, epRefObject[key]);
}
const fetchLayoutData = async ()=>{
    const res = await axios.get(ep.app);
    const app = res.data;
    for(const key of epAppKeys){
        epRefObject[key].value = app[key];
    }
    ars.ready(ep.app, true);
}


// Control the javascript that wp depends on.
import { loadScripts, unLoadScript } from '@/config/wpJavascriptDependency'
import usePageDisplayReady from '@/config/pageDisplayReady'
const { doesAppReady } = usePageDisplayReady();
import sw from '@/helper/simpleWatcher'
const appWatcher = new sw(doesAppReady, loadScripts);


// add function to event hook
onMounted(fetchLayoutData);
router.beforeEach(unLoadScript);
router.afterEach(()=>appWatcher.run());
</script>


<template>
    <Header/>
    <RouterView :key="route.fullPath" />
    <Footer/>
    <GrayBackground />
    <ScreenTransition />
</template>


<style lang="scss">
@import '@/assets/css/reset.css';

@import url('https://fonts.googleapis.com/css2?family=M+PLUS+Rounded+1c:wght@300&display=swap');
@import url('https://fonts.googleapis.com/css2?family=M+PLUS+1p:wght@500&display=swap');

#app{
    width: 100%;
}

body{
    font-family: 'M PLUS Rounded 1c', sans-serif;
    color: $text-dark;
    background-color: $bg-light;
    line-height: 2;
    font-size: 15px;
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
