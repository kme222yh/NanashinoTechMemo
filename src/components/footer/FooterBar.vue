<template>
    <div class="fooerBar">
        <div class="fooerBar-body">

            <div class="footerNav">
                <ul class="footerNav-body">
                    <li class="footerNav-item" v-for="(item, index) in menus" :key="index">
                        <router-link class="footerNav-link" :to="item.path" v-if="item.same_origin">{{item.title}}</router-link>
                        <a class="footerNav-link" v-else :href="item.url">{{item.title}}</a>
                    </li>
                </ul>
            </div>

            <div class="copyright">
                <small class="copyright-text">{{ copyright }}</small>
            </div>

            <button type="button" class="topButton" @click="scrollToTop"><i class="fas fa-caret-up"></i></button>

        </div>
    </div>
</template>


<style lang="scss">
.fooerBar{
    padding: 40px 0;
    background-color: $bg-dark;
    color: $text-light;
    position: relative;
    &-body{
        @include outerBody;
    }

    .footerNav{
        margin-bottom: 30px;
        &-body{
            display: flex;
            justify-content: center;
        }
        &-item{
            border-right: 1px solid $text-transparent-white;
            &:last-child{
                border-right: none;
            }
        }
        &-link{
            font-size: 12px;
            line-height: 1;
            display: block;
            padding: 0 7.5px;
            transition: .5s;
            &:hover{
                color: $text-transparent-white;
            }
        }
    }

    .copyright{
        text-align: center;
    }

    .topButton{
        position: absolute;
        top: -20px;
        left: 50%;
        transform: translateX(-50%);
        width: 50px;
        height: 50px;
        border-radius: 25px;
        background-color: $bg-dark;
        color: $text-light;
        font-size: 20px;
        cursor: pointer;
        transition: .5s;
        text-align: center;
        &:hover{
            top: -25px;
        }
    }

    @include tablet{
        padding: 30px 0;
        .footerNav{
            margin-bottom: 20px;
        }
    }
}
</style>


<script setup lang="ts">
import { inject, ref } from 'vue'
import { getMeta } from '@/config/meta'
import { appDataKeys } from '@/injectionKeys'

const siteTitle = getMeta('site-title');
const copyright = `copyright ©︎ ${(new Date).getFullYear()} ${siteTitle}.`;

const menus = inject(appDataKeys.footerMenu, ref([]));

// scroll to the top in 800ms with cubic easing
const SCROLL_DURATION = 800;
const scrollToTop = ()=>{
    const start = window.scrollY;
    const positionAt = (t: number) => start - start * t * t * (3 * SCROLL_DURATION - 2 * t) / SCROLL_DURATION ** 3;
    const step = (t: number)=>{
        if(t < SCROLL_DURATION){
            window.scrollTo(0, positionAt(t));
            setTimeout(step, 10, t + 10);
        } else {
            window.scrollTo(0, 0);
        }
    }
    step(0);
};
</script>
