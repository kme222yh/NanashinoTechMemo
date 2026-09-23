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


<script setup lang="ts">
import SiteTitleBar from './SiteTitleBar.vue'
import GlobalNav from './GlobalNav.vue'
import useHeaderVisibility from '@/composables/useHeaderVisibility'

import { useOpenManagimentStore } from '@/stores/openManagiment'
const openManagimentStore = useOpenManagimentStore();

import { useTeleportReadyStore } from '@/stores/teleportReady'
const teleportReadyStore = useTeleportReadyStore();

// switch header visibility / global nav position by scroll and resize
const { visible: isHeaderVisible, teleportGlobalNav: doesGlobalNavTeleport } =
    useHeaderVisibility(() => openManagimentStore.isOpened('globalMenu'));
</script>
