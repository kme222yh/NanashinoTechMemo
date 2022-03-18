<template>
    <transition>
        <div class="stayBackground" v-show="props.visible">
            <div class="stayBackground-body">
                <div class="lds-facebook"><div></div><div></div><div></div></div>
            </div>
        </div>
    </transition>
</template>


<style lang="scss">
.stayBackground{
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 997;
    &-body{
        height: 100%;
        width: 100%;
        background-color: $bg-transparent-gray;
        opacity: 0.7;
    }

    &.v-enter-active, &.v-leave-active{
        transition: .6s;
    }
    &.v-enter-from, &.v-leave-to{
        opacity: 0;
    }
    &.v-enter-to, &.v-leave-from{
        opacity: 1;
    }




    .lds-facebook {
      display: inline-block;
      position: relative;
      width: 80px;
      height: 80px;

      position: absolute;
        top: 50%;
        right: 50%;
        transform: translate(50%,-50%) scale(1.5);
    }
    .lds-facebook div {
      display: inline-block;
      position: absolute;
      left: 8px;
      width: 16px;
      background: #fff;
      animation: lds-facebook 1.2s cubic-bezier(0, 0.5, 0.5, 1) infinite;
    }
    .lds-facebook div:nth-child(1) {
      left: 8px;
      animation-delay: -0.24s;
    }
    .lds-facebook div:nth-child(2) {
      left: 32px;
      animation-delay: -0.12s;
    }
    .lds-facebook div:nth-child(3) {
      left: 56px;
      animation-delay: 0;
    }
    @keyframes lds-facebook {
      0% {
        top: 8px;
        height: 64px;
      }
      50%, 100% {
        top: 24px;
        height: 32px;
      }
    }
}
</style>


<script setup>
import { defineProps } from 'vue'
const props = defineProps({
    visible: Boolean,
})
</script>
