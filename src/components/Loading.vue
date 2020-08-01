<template>
    <transition>
        <div id="loading-animation" v-if="visible"></div>
    </transition>
</template>





<style lang="scss">
    #loading-animation{
        position: fixed;
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
        z-index: 999;
        background-color: $bg-color;



        &.v-leave-active, &.v-enter-active{
            transition: .5s;
        }
        &.v-leave, &.v-enter-to{
            opacity: 1;
        }
        &.v-leave-to, &.v-enter{
            opacity: 0;
        }
    }
</style>




<script>
    import { mapState } from 'vuex'

    export default{
        computed: mapState({visible: state => state.loading_animation_visible}),
    }
</script>
