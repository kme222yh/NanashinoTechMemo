<template>
    <div class="loading-animation"/>
</template>





<style lang="scss">
    .loading-animation{
        position: absolute;
        top: 0;
        right: 0;
        width: 100%;
        height: 100%;
        background-color: $bg-color;

        display: flex;
        align-items: center;
        justify-content: center;



        &.v-leave-active{
            transition: 1s;
        }
        &.v-leave{
            opacity: 1;
        }
        &.v-leave-to{
            opacity: 0;
        }
    }
</style>
