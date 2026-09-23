<template>
    <div class="siteTitleBar">
        <div class="siteTitleBar-body">
            <a class="siteTitleBar-text" href="/">
                {{ siteTitle }}
            </a>
            <GlobalMenuButton id="globalMenuButton" />
        </div>
    </div>
</template>


<style lang="scss">
.siteTitleBar{
    background-color: $bg-white;
    &-body{
        @include outerBody;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    &-text{
        font-size: 45px;
        transition: .5s;
        color: $text-transparent-gray;
        &:hover{
            color: $text-dark;
        }
    }

    @include tablet{
        &-body{
            justify-content: space-between;
        }
        &-text{
            font-size: 30px;
            display: initial;
        }
    }
}
</style>


<script setup lang="ts">
import GlobalMenuButton from './GlobalMenuButton.vue'
import { getMeta } from '@/config/meta'

const siteTitle = getMeta('site-title');
</script>
