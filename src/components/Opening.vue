<template>
    <transition>
        <div class="opening-animation" v-show="visible">
            <div class="lds-ripple"><div></div><div></div></div>
        </div>
    </transition>
</template>





<style lang="scss">
    .opening-animation{
        position: fixed;
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
        z-index: 999;
        background-color: $main-color;



        &.v-leave-active{
            transition: 1s;
        }
        &.v-leave{
            opacity: 1;
        }
        &.v-leave-to{
            opacity: 0;
        }




        // https://loading.io/css/
        .lds-ripple {
          display: inline-block;
          position: relative;
          width: 80px;
          height: 80px;
          top: 40%;
          left: 50%;
          transform: translateX(-50%);
        }
        .lds-ripple div {
          position: absolute;
          border: 4px solid $text-color-dark;
          opacity: 1;
          border-radius: 50%;
          animation: lds-ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
        }
        .lds-ripple div:nth-child(2) {
          animation-delay: -0.5s;
        }
        @keyframes lds-ripple {
          0% {
            top: 36px;
            left: 36px;
            width: 0;
            height: 0;
            opacity: 1;
          }
          100% {
            top: 0px;
            left: 0px;
            width: 72px;
            height: 72px;
            opacity: 0;
          }
        }
    }
</style>




<script>
    import { mapGetters } from 'vuex'

    export default{
        computed: mapGetters({visible: 'is_opening_animation_visible'}),
    }
</script>
