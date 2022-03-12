<template>
    <div class="siteTitleBar">
        <div class="siteTitleBar-body">
            <a class="siteTitleBar-text" href="/">
                {{ siteTitle }}
            </a>
            <button class="siteTitleBar-button" type="button" @click="openGlobalMenu"><i class="fas fa-bars"></i></button>
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
    }
    &-text, &-button{
        font-size: 45px;
        transition: .5s;
        color: $text-transparent-gray;
        &:hover{
            color: $text-dark;
        }
    }
    &-button{
        cursor: pointer;
        display: none;
    }

    @include tablet{
        &-body{
            justify-content: space-between;
        }
        &-text, &-button{
            font-size: 30px;
            display: initial;
        }
    }

    @include mobile{
        &-text, &-button{
            font-size: 20px;
        }
    }
}
</style>


<script setup>
import { ref, defineProps } from 'vue'
const siteTitle = ref(document.getElementsByName('site-title')[0].content);
const openGlobalMenu = () => {
    console.log('open!!!!');
};
</script>
