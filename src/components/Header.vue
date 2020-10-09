<template>
    <header itemscope="itemscope" itemtype="http://schema.org/WPHeader" :class="{visible: header_is_visible}">
        <div id="site-title-bar"  class="inner">
            <a href="/">{{siteTitle}}</a>
            <button class="nav-button" type="button" @click="menuOpen"><i class="fas fa-bars"></i></button>
        </div>
        <transition>
            <nav id="global-nav" v-show="is_opend.menu" :class="{slided: is_opend.sub!=-1}">
                <ul class="inner-side" @click.self="subMenuClose">
                    <li v-for="(item, index) in menu" :key="index" @mouseover="subMenuOpen" @mouseleave="subMenuClose" itemprop="name">
                        <p v-if="item.children.length>0" :index="index" @click="subMenuFlip">{{item.title}}</p>
                        <router-link v-else-if="item.children.length==0&&item.same_origin" @click.native="menuClose" itemprop="url" :to="item.path">{{item.title}}</router-link>
                        <a v-else-if="!item.same_origin" itemprop="url" :href="item.url">{{item.title}}</a>

                        <transition>
                            <ul class="inner-side" v-if="item.children.length>0" v-show="is_opend.sub==index">
                                <li v-for="(subitem, subindex) in item.children" :key="subindex" itemprop="name">
                                    <router-link @click.native="menuClose" itemprop="url" :to="subitem.path">{{subitem.title}}</router-link>
                                </li>
                            </ul>
                        </transition>
                    </li>
                </ul>
            </nav>
        </transition>
        <transition><div id="menu-bg" v-show="is_opend.menu" @click="menuClose" /></transition>
    </header>
</template>







<style lang="scss">
    header{
        background-color: white;
        position: sticky;
        z-index: 2;
        top: -45px;
        transition: .3s;
        a, p, button{
            color: $transparent-gray;
            line-height: 1;
        }
        @include tablet{
            top: -66.25px;
        }
        @include desktop{
            position: sticky;
            top: -156px;
        }
    }
    header.visible{
        top: 0;
        box-shadow: 0px 0px 10px $text-color-dark;
        @include desktop{
            top: -96px;
        }
    }



    #site-title-bar{
        a, button{
            font-size: 20px;
            @include tablet{
                font-size: 30px;
            }
            @include desktop{
                font-size: 45px;
                transition: .5s;
                &:hover{
                    color: $text-color-dark;
                }
            }
        }
        display: flex;
        justify-content: space-between;
        align-items: center;
        @include desktop{
            justify-content: center;
            border-bottom: 1px solid $thin-transparent-gray;
        }

        .nav-button{
            padding: 0;
            background-color: transparent;
            border: none;
            outline: none;
            @include desktop{
                display: none;
            }
        }
    }





    #global-nav{
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        z-index: 3;
        transition: .5s;
        a, p{
            padding: 10px 0;
            width: 100%;
            display: block;
            cursor: pointer;
            font-size: 18px;
        }
        ul{
            background-color: white;
            width: 150px;
            height: 100%;
            position: relative;
            ul{
                position: absolute;
                top: 0;
                bottom: 0;
                right: 0;
                transform: translateX(99%);
                &.v-enter-active{transition: .5s;}
                &.v-leave-active{transition: .3s;}
                &.v-enter, &.v-leave-to{opacity: 0;transform: translateX(80%);}
                &.v-enter-to, &.v-leave{opacity: 1;transform: translateX(99%);}
            }
        }
        &.v-enter, &.v-leave-to{left: -150px;}
        &.v-enter-to, &.v-leave{left: 0;}

        &.slided{left: -50px;}


        @include tablet{
            a, p{
                padding: 15px 0;
                font-size: 22px;
            }
            ul{
                width: 200px;
            }
            &.v-enter, &.v-leave-to{left: -200px;}
            &.slided{left: 0;}
        }


        @include desktop{
            position: static;
            display: block !important;

            a, p{
                text-align: center;
                padding: 20px 20px;
                font-size: 20px;
                transition: .5s;
                &:hover{color: $dark-gray;}
            }
            ul{
                display: flex;
                justify-content: center;
                width: 100%;
                ul{
                    a{color: white;}
                    a:hover{color: $transparent-white;}
                    background-color: $dark-blue;
                    top: 0;
                    bottom: auto;
                    right: 0;
                    left: 0;
                    transform: translateY(99%);
                    &.v-enter, &.v-leave-to{opacity: 0;transform: translateY(90%);}
                    &.v-enter-to, &.v-leave{opacity: 1;transform: translateY(99%);}
                }
            }
        }
    }





    #menu-bg{
        position: fixed;
        top: 0;bottom: 0;left: 0;right: 0;z-index: 2;
        background-color: $transparent-gray;
        &.v-enter-active, &.v-leave-active{transition: .5s;}
        &.v-enter, &.v-leave-to{opacity: 0;}
        &.v-enter-to, &.v-leave{opacity: 1;}
        @include desktop{display: none;}
    }


</style>





<script>
import { mapState } from 'vuex'

export default {
    data(){return{
        siteTitle: document.getElementsByName('site-title')[0].content,

        header_is_visible: true,
        scrolled_value: window.pageYOffset,
        is_opend: {
            menu: false,
            sub: -1,
        },

        intervals: {
            scrolling_watch: null,
        }
    }},
    mounted(){
        this.intervals.scrolling_watch = setInterval(this.scrollingWatch, 50)
    },
    computed: mapState({
        menu: state => state.menu,
    }),
    methods: {
        scrollingWatch(){
            if(window.innerWidth > 769){
                if(window.pageYOffset > 600){
                    this.header_is_visible = true
                }
                else{
                    this.header_is_visible = false
                }
            }
            else{
                const scrolled = window.pageYOffset - this.scrolled_value
                if(scrolled > 10){
                    this.scrolled_value = window.pageYOffset
                    this.header_is_visible = false
                }
                else if(scrolled < -50){
                    this.scrolled_value = window.pageYOffset
                    this.header_is_visible = true
                }
            }
        },




        menuOpen(){
            this.is_opend.menu = true
            clearInterval(this.intervals.scrolling_watch)
            document.getElementById('app').style.top = `-${window.pageYOffset}px`
            document.getElementById('app').style.position = 'fixed'
        },
        subMenuFlip(el){
            if(window.innerWidth >= 769) return
            if(this.is_opend.sub != el.target.attributes.index.value){
                this.is_opend.sub = el.target.attributes.index.value
            }
            else
                this.is_opend.sub = -1
        },
        subMenuOpen(el){
            if(window.innerWidth < 769) return
            if(el.target.attributes.index===undefined)return
            this.is_opend.sub = el.target.attributes.index.value
        },
        subMenuClose(){
            this.is_opend.sub = -1
        },
        menuClose(){
            this.is_opend.menu = false
            this.is_opend.sub = -1
            if(window.innerWidth >= 769) return
            document.getElementById('app').style.position = 'static'
            scrollTo(0, -parseInt(document.getElementById('app').style.top))
            this.intervals.scrolling_watch = setInterval(this.scrollingWatch, 50)
        },
    },
}
</script>
