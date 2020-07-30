<template>
    <header :class="{visible: header_is_visible, minimize: header_minimize}">
        <div class="content">
            <h1> <a href="/">{{siteTitle}}</a> </h1>
            <div id="mobile-nav">
                <button type="button" name="menu" @click="menuOpen"><i class="fas fa-bars"></i></button>
            </div>
            <transition>
                <nav id="header-nav" v-show="is_opend.menu" :class="{slided: is_opend_sub_menu}">
                    <ul>
                        <li @click="menuClose"> <router-link :to="{name: 'Home'}">Home</router-link> </li>
                        <li @click="menuClose"> <router-link :to="{name: 'About'}">About</router-link> </li>
                        <li @mouseover="CategoriesOpen" @mouseleave="CategoriesClose"> <p @click="CategoriesFlip">Categories</p>
                            <transition>
                                <ul class="categories" v-show="is_opend.sub.categories">
                                    <li v-for="category in categories" :key="category.id" @click="menuClose"> <router-link :to="{name: 'Category', params: {category: category.slug}}">{{category.name}}</router-link> </li>
                                </ul>
                            </transition>
                        </li>
                        <li @mouseover="TagsOpen" @mouseleave="TagsClose"> <p @click="TagsFlip">Tags</p>
                            <transition>
                                <ul class="tags" v-show="is_opend.sub.tags">
                                    <li v-for="tag in tags" :key="tag.id" @click="menuClose"> <router-link :to="{name: 'Tag', params: {tag: tag.slug}}">{{tag.name}}</router-link> </li>
                                </ul>
                            </transition>
                        </li>
                        <li> <a href="https://portfolio.katuura.info">Portfolio</a> </li>
                    </ul>
                </nav>
            </transition>
            <transition><div id="menu-bg" v-show="is_opend.menu" @click="menuClose" /></transition>
        </div>
    </header>
</template>





<style lang="scss">
    header{
        background-color: $main-color;
        position: sticky;
        z-index: 2;
        top: -34px;
        transition: .3s;
        .content{
            @include outer-limit;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        h1{
            @include outer-base;
            @include header-title;
            a{@include unlink;}
        }
        @include tablet{
            top: -46px;
        }
        @include desktop{
            top: -103px;
        }
    }
    header.visible{
        top: 0;
        box-shadow: 0px 0px 10px $text-color-dark;
    }
    header.minimize{
        h1{display: none;}
    }


    #mobile-nav{
        display: flex;
        button{
            @include nav-text;
            background-color: transparent;
            border: none;
            padding: 0 5px;
            &:focus{
                outline: none;
            }
        }
        @include desktop{display: none;}
    }



    #header-nav{
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        z-index: 3;
        transition: .5s;
        a, p{
            @include nav-text;
            padding: 10px 0;
            width: 100%;
            display: block;
            box-sizing: border-box;
            cursor: pointer;
        }
        ul ul a{@include sub-nav-text;}

        ul{
            @include outer-nav;
            min-width: 160px;
            height: 100%;
            background-color: $main-color;
            position: relative;

            .categories a{
                border-bottom: 1px solid $text-color-dark;
                padding: 15px 0;
            }
            .tags{
                a{
                    border: 1px solid $text-color-dark;
                    border-radius: 30px;
                    padding: 5px;
                    margin-bottom: 15px;
                }
                li:last-child a{
                    margin-bottom: 0;
                }
            }

            ul{
                position: absolute;
                top: 0;
                right: 0;
                transform: translateX(100%);
                overflow-y: scroll;

                a{
                    text-align: center;
                }

                &.v-enter-active, &.v-leave-active{
                    transition: .5s;
                }
                &.v-enter, &.v-leave-to{
                    opacity: 0;
                    transform: translateX(80%);
                }
                &.v-enter-to, &.v-leave{
                    opacity: 1;
                    transform: translateX(100%);
                }
            }
        }

        &.v-enter-active, &.v-leave-active{
            transition: .5s;
        }
        &.v-enter, &.v-leave-to{
            left: -160px;
        }
        &.v-enter-to, &.v-leave{
            left: 0;
        }

        @include tablet{
            ul{
                min-width: 200px;
            }
            &.v-enter, &.v-leave-to{
                left: -200px;
            }
        }

        @include desktop{
            position: static;
            display: block !important;
            ul{
                display: flex;
                position: static;
                a, p{
                    padding: 30px 15px;
                }
                .categories{
                    li{
                        border-left: 1px solid $text-color-light;
                        &:last-child{border-right: 1px solid $text-color-light;}
                    }
                    a{
                        border-bottom: none;
                        padding: 10px 30px;
                    }
                }
                .tags{
                    li{margin: 10px;}
                    a{
                        border: 1px solid $text-color-light;
                        padding: 5px 15px;
                        margin-bottom: 0;
                    }
                }
                li:hover p{color: $text-color-dark-hover;}

                ul{
                    overflow-y: hidden;
                    @include outer-base;
                    background-color: $sub-color;
                    transition: .3s;
                    top: auto;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    min-height: 50px;
                    height: auto;
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: center;
                    transform: translateY(100%);
                    &.v-enter-active{
                        transition: .5s;
                    }
                    &.v-leave-active{
                        transition: .3s;
                    }
                    &.v-enter, &.v-leave-to{
                        opacity: 0;
                        transform: translateY(95%);
                    }
                    &.v-enter-to, &.v-leave{
                        opacity: 1;
                        transform: translateY(100%);
                    }
                }
            }
        }
    }
    #header-nav.slided{
        left: -50px;
        @include tablet{
            left: 0;
        }
    }
    header.minimize #header-nav{
        width: 100%;
        ul{
            justify-content: center;
        }
        &>ul>li>a, &>ul>li>p{
            padding-top: 20px;
            padding-bottom: 20px;
        }
    }


    #menu-bg{
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 2;
        background-color: $text-color-dark;
        &.v-enter-active, &.v-leave-active{
            transition: .5s;
        }
        &.v-enter, &.v-leave-to{
            opacity: 0;
        }
        &.v-enter-to, &.v-leave{
            opacity: 1;
        }
        @include desktop{
            display: none;
        }
    }
</style>





<script>
import { mapState, mapActions } from 'vuex'

export default {
    data(){return{
        siteTitle: document.getElementsByName('h1-title')[0].content,

        header_is_visible: true,
        header_minimize: false,
        scrolled_value: window.pageYOffset,
        is_opend: {
            menu: false,
            sub: {
                categories: false,
                tags: false,
            },
        },

        intervals: {
            scrolling_watch: null,
        }
    }},
    mounted(){
        this.getCategories()
        this.getTags()
        this.intervals.scrolling_watch = setInterval(this.scrollingWatch, 50)
        this.openingAnimationHide()
    },
    computed: {
        is_opend_sub_menu(){
            return this.is_opend.sub.categories || this.is_opend.sub.tags
        },
        ...mapState({
            categories: state => state.wp.categories.data,
            tags: state => state.wp.tags.data,
        }),
    },
    methods: {
        scrollingWatch(){
            if(window.innerWidth > 769){
                if(window.pageYOffset > 200){
                    this.header_minimize = true
                }
                else{
                    this.header_minimize = false
                }
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
        CategoriesFlip(){
            if(window.innerWidth >= 769) return
            this.is_opend.sub.categories = !this.is_opend.sub.categories
            this.is_opend.sub.tags = false
        },
        CategoriesOpen(){
            if(window.innerWidth < 769) return
            this.is_opend.sub.categories = true
        },
        CategoriesClose(){
            // if(window.innerWidth < 769) return
            this.is_opend.sub.categories = false
        },
        TagsFlip(){
            if(window.innerWidth >= 769) return
            this.is_opend.sub.tags = !this.is_opend.sub.tags
            this.is_opend.sub.categories = false
        },
        TagsOpen(){
            if(window.innerWidth < 769) return
            this.is_opend.sub.tags = true
        },
        TagsClose(){
            // if(window.innerWidth < 769) return
            this.is_opend.sub.tags = false
        },
        menuClose(){
            this.is_opend.menu = false
            this.is_opend.sub.categories = false
            this.is_opend.sub.tags = false
            if(window.innerWidth >= 769) return
            console.log('hoge')
            document.getElementById('app').style.position = 'static'
            scrollTo(0, -parseInt(document.getElementById('app').style.top))
            this.intervals.scrolling_watch = setInterval(this.scrollingWatch, 50)
        },




        ...mapActions({
            getCategories: 'wp/categories/get',
            getTags: 'wp/tags/get',
            openingAnimationHide: 'opening_animation_hide',
        }),
    },
}
</script>
