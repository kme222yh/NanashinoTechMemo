<template>
    <footer v-show="is_visible" role="contentinfo" itemscope="itemscope" itemtype="http://schema.org/WPFooter">
        <div id="footer-widget"><ul class="outer inner" v-html="widget"/></div>
        <div id="end-bar">
            <ul id="footer-menu">
                <li v-for="(item, index) in menu" :key="index" itemprop="name">
                    <router-link v-if="item.same_origin" itemprop="url" :to="item.path">{{item.title}}</router-link>
                    <a v-else itemprop="url" :href="item.url">{{item.title}}</a>
                </li>
            </ul>
            <small id="footer-copyright">{{copyright}}</small>

            <button type="button" class="scroll" @click="scrollToTop"><i class="fas fa-caret-up"></i></button>
        </div>
    </footer>
</template>





<style lang="scss">
    #footer-widget{
        padding: 30px 0;
        background-color: white;
        color: $transparent-gray;
        h2{
            @include MiniTitle;
        }
        li{list-style: none;}
        .widget{
            margin-bottom: 50px;
            &:last-child{margin-bottom: 0;}
        }
        @include desktop{
            &>ul{
                display: flex;
                justify-content: space-between;
            }
            .widget{
                max-width: $footer-widget-max-width;
                width: 31%;
                margin-bottom: 0;
            }
        }
    }

    #end-bar{
        background-color: $dark-blue;
        color: $white-gray;
        font-size: 12px;
        padding: 40px 0;

        position: relative;

        .scroll{
            position: absolute;
            top: -20px;
            left: 50%;
            transform: translateX(-50%);

            width: 50px;
            height: 50px;
            border-radius: 25px;
            border: none;
            background-color: $dark-gray;

            color: white;
            font-size: 20px;

            outline: none;
            cursor: pointer;

            @include desktop{
                transition: .5s;
                &:hover{
                    top: -23px;
                }
            }
        }
    }

    #footer-menu{
        margin-bottom: 30px;

        display: flex;
        justify-content: center;
        list-style: none;
        li{
            margin-right: 15px;
            position: relative;
            &::after{
                position: absolute;
                top: 7px;
                right: -8px;
                width: 1px;
                height: 10px;
                background-color: $transparent-white;
                content: '';
            }
        }
        li:last-child{
            margin-right: 0;
            &::after{
                content: none;
            }
        }

        @include desktop{
            li{
                transition: .5s;
                &:hover{
                    color: $transparent-white;
                }
            }
        }
    }

    #footer-copyright{
        display: block;
        font-size: inherit;
        text-align: center;
    }
</style>






<script>
import { mapState } from 'vuex'

export default{
    data(){return{
        copyright: '',
    }},
    created(){
        this.copyright = `copyright ©︎ ${(new Date).getFullYear()} ${document.title}.`
    },
    computed: mapState({
        is_visible: state => state.footer_visible,
        widget: state => state.widgets.footer,
        menu: state => state.footermenu,
    }),
    methods: {
        scrollToTop(){
            const f = function(t){
                return -(f.L/f.T/f.T/f.T)*t*t*(2*t-3*f.T) + f.C
            }
            f.T = 1000
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
        },
    }
}

</script>
