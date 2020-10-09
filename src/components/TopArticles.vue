<template>
    <section id="top-article">
        <h1 style="display: none;">Pinned articles</h1>

        <div class="articles" @touchstart="swipeStart" @touchmove="swiping" @touchend="swipeEnd"  @mousedown="slideStart" @mousemove="sliding" @mouseup="swipeEnd">
            <transition-group>
                <top-view v-for="(article, index) in articles" :key="index+0" v-show="visible==index"
                    :media="article.media"
                    :title="article.title"
                    :id="article.id"
                    :date="article.date"
                    :date_modified="article.date_modified"
                    :category="article.category"
                    :category_slug="article.category_slug"
                />
            </transition-group>

            <top-view class="damy"/>

            <div class="controller right" @click="nextArticle"><i class="fas fa-chevron-right"></i></div>
            <div class="controller left" @click="previousArticle"><i class="fas fa-chevron-left"></i></div>
        </div>


    </section>
</template>





<style lang="scss">
    #top-article{
        overflow: hidden;
    }
    #top-article .articles{
        position: relative;
        .top-view{
            a,small{
                user-select: none;
            }
            position: absolute;
            transform: scale(1.05);
            &.v-enter-active, &.v-leave-active{
                transition: 2s;
            }
            &.v-enter{
                transform: scale(1);
                opacity: 0;
            }
            &.v-enter-to{
                transform: scale(1.05);
                opacity: 1;
            }
            &.v-leave{
                transform: scale(1.05);
                opacity: 1;
            }
            &.v-leave-to{
                transform: scale(1.1);
                opacity: 0;
            }
        }
        .top-view.damy{
            pointer-events: none;
            position: static;
            opacity: 0;
        }

        .controller{
            display: none;
            @include tablet{
                cursor: pointer;
                display: block;
                position: absolute;
                top: 50%;
                transform: translateY(-50%);
                z-index: 2;
                background-color: $transparent-white;
                width: 70px;
                height: 70px;
                font-size: 20px;
                border-radius: 4px;
                display: flex;
                justify-content: center;
                align-items: center;
                transition: .5s;
                &.right{
                    right: 0;
                    transform: translate(100%, -50%);
                }
                &.left{
                    left: 0;
                    transform: translate(-100%, -50%);
                }
            }
        }
        @include tablet{
            &:hover{
                .right{
                    transform: translate(-20%, -50%);
                }
                .left{
                    transform: translate(20%, -50%);
                }
                .controller:hover{
                        color: $dark-blue;
                        background-color: $white-gray;
                }
            }
        }
    }
</style>





<script>
import { mapState } from 'vuex'


export default {
    components: {
        TopView: require('../parts/TopView.vue').default,
    },
    data(){return{
        visible: 0,
        interval: null,

        pointer_start: 0,
        pointer_end: 0,

        mouse_is_down: false,
    }},
    mounted(){
        this.interval = setInterval(this.f, 10000)
    },
    beforeDestroy(){
        clearInterval(this.interval)
    },
    computed: mapState({
        'articles': state => state.pinned,
    }),
    methods: {
        nextArticle(){
            clearInterval(this.interval)
            if(this.visible >= this.articles.length-1)
                this.visible = 0
            else
                this.visible ++
            this.interval = setInterval(this.f, 10000)
        },
        previousArticle(){
            clearInterval(this.interval)
            if(this.visible <= 0)
                this.visible = this.articles.length-1
            else
                this.visible --
            this.interval = setInterval(this.f, 10000)
        },


        swipeStart(e){
            this.pointer_start = e.touches[0].pageX;
            this.pointer_end = e.touches[0].pageX
        },
        swiping(e){
            this.pointer_end = e.changedTouches[0].pageX
        },
        swipeEnd(){
            const th = 30
            if(this.pointer_end - this.pointer_start > th){
                this.previousArticle()
            }
            else if (this.pointer_end - this.pointer_start < -th){
                this.nextArticle()
            }
        },
        slideStart(e){
            this.pointer_start = e.pageX;
            this.pointer_end = e.pageX
        },
        sliding(e){
            this.pointer_end = e.pageX
        },


        f(){
            if(this.visible >= this.articles.length-1)
                this.visible = 0
            else
                this.visible ++
        },
    }
}
</script>
