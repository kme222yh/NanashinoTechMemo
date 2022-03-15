<template>
    <header class="header" :class="{visible: isHeaderVisible}">
        <div class="header-body">

            <SiteTitleBar/>

            <Teleport to=".globalMenuButton" v-if="teleportReadyStore.isReady('globalMenuButton')" :disabled="doesGlobalNavTeleport==false">
                <GlobalNav/>
            </Teleport>

        </div>
    </header>
</template>


<style lang="scss">
.header{
    position: sticky;
    z-index: 101;
    top: -156px;
    transition: .3s;

    &.visible{
        @include box-shadow;
        .globalNav{@include box-shadow;}
        top: -91px;
    }

    @include tablet{
        top: -61px;
        .globalNav{@include box-shadow;}
        &.visible{
            top: 0px;
        }
    }
}
</style>


<script setup>
import { ref, onMounted, computed } from 'vue'
import valuables from '@/assets/sass/exports.module.scss'

import SiteTitleBar from './SiteTitleBar.vue'
import GlobalNav from './GlobalNav.vue'

// switch header visibility
import { useOpenManagimentStore } from '@/stores/openManagiment'
const openManagimentStore = useOpenManagimentStore();
const headerVisiblity = ref(false);
const switchHeaderVisibility = ()=>{
    if(window.innerWidth > Number(valuables.breakpointsTablet.replace(/[^0-9]/g, ''))){
        headerVisiblity.value = window.pageYOffset > 600;
    } else {
        if(openManagimentStore.isOpened('globalMenu')){
            headerVisiblity.value = true;
        } else {
            headerVisiblity.value = window.pageYOffset > 600;
        }
    }
}
const headerVisibleByScrolling = ref(false);
const scrolledValue = ref(0);
const scrollingWatch = ()=>{
    const scrolled = window.pageYOffset - scrolledValue.value
    if(scrolled > 10){
        scrolledValue.value = window.pageYOffset
        headerVisibleByScrolling.value = false
    }
    else if(scrolled < -20){
        scrolledValue.value = window.pageYOffset
        headerVisibleByScrolling.value = true
    }
};
const isHeaderVisible = computed(()=>{
    if(window.innerWidth > Number(valuables.breakpointsTablet.replace(/[^0-9]/g, ''))){
        return headerVisiblity.value;
    } else {
        return headerVisiblity.value && headerVisibleByScrolling.value;
    }
});

// watch ready to teleport
import { useTeleportReadyStore } from '@/stores/teleportReady'
const teleportReadyStore = useTeleportReadyStore();
const doesGlobalNavTeleport = ref(false);
const switchGloballNavTeleport = () => {
    doesGlobalNavTeleport.value = window.innerWidth < Number(valuables.breakpointsTablet.replace(/[^0-9]/g, ''));
}

// start switching visibility
onMounted(()=>{
    setInterval(()=>{
        scrollingWatch();
        switchHeaderVisibility();
        switchGloballNavTeleport();
    }, 400);
})
</script>
