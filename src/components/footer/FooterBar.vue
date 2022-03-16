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


<script setup>
import { ref, onMounted, inject } from 'vue'
import Endpoints from '@/config/endpoints'

import { useAjaxReadyStore } from '@/stores/ajaxReady'
const ajaxReadyStore = useAjaxReadyStore();

const copyright = `copyright ©︎ ${(new Date).getFullYear()} ${document.title}.`;

const menus = inject('footerMenu');

const scrollToTop = ()=>{
    const f = function(t){
        return -(f.L/f.T/f.T/f.T)*t*t*(2*t-3*f.T) + f.C
    }
    f.T = 800
    f.L = -scrollY
    f.C = scrollY
    const sct = (t)=>{
        window.scrollTo(0, sct.f(t))
        if(t<sct.f.T)
            setTimeout(sct, 10, t+10)
        else
            window.scrollTo(0, f.C+f.L)
    }
    sct.f = f
    sct(0)
};
</script>
