<template>
    <div class="globalMenuButton" :class="{opened: openManagimentStore.isOpened('globalMenu')}">
        <div class="globalMenuButton-body" @click="openManagimentStore.toggle('globalMenu')">
            <div class="hamburger">
                <hr>
                <hr>
                <hr>
            </div>
        </div>
    </div>
</template>


<style lang="scss">
.globalMenuButton{
    display: none;
    position: relative;

    &-body{
        height: 40px;
        width: 40px;
        box-sizing: border-box;
        border-radius: 7px;
        border: 2px $text-transparent-gray solid;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .hamburger{
        height: 16px;
        width: 18px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        hr{
            transition: .2s;
            background-color: $text-transparent-gray;
            height: 2px;
            border-radius: 2px;
            width: 100%;
            margin: 0;
            border: none;
        }
    }

    &.opened{
        .hamburger{
            hr:nth-child(2){
                width: 0;
            }
            hr:nth-child(1){
                transform: translateY(7.5px) rotate(45deg);
            }
            hr:nth-child(3){
                transform: translateY(-7px) rotate(-45deg);
            }
        }
    }

    @include tablet{
        display: block;
    }
}
</style>


<script setup>
import { ref, onMounted } from 'vue'

// importing openManagimentStore
import { useOpenManagimentStore } from '@/stores/openManagiment'
const openManagimentStore = useOpenManagimentStore();

// importing useTeleportReadyStore
import { useTeleportReadyStore } from '@/stores/teleportReady'
const teleportReadyStore = useTeleportReadyStore();

onMounted(()=>{
    teleportReadyStore.readyToGo('globalMenuButton');
});
</script>
