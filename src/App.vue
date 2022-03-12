<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>


<template>
    <div class="test">
        <div class="test-body">
            <div class="hoge">

            </div>
        </div>
    </div>
</template>


<style lang="scss">
@import '@/assets/css/reset.css';

.test{
    height: 1000px;
    width: 100%;
    background-color: gray;
    &-body{
        @include outerBody;
        height: 100%;
        background-color: white;
        padding-top: 50px;
    }

    .hoge{
        width: 100%;
        height: 100%;
        background-color: green;
    }
}
</style>
