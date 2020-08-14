<template>
    <footer v-show="is_visible" role="contentinfo" itemscope="itemscope" itemtype="http://schema.org/WPFooter">
        <div id="footer-widget"><ul class="outer inner" v-html="widget"/></div>
        <div id="footer-copyright">
            <small class="outer inner">{{copyright}}</small>
        </div>
    </footer>
</template>





<style lang="scss">
    #footer-widget{
        padding: 50px 0;
        background-color: white;
        color: $transparent-gray;
        h2{
            color: $text-color-dark;
            // border-left: 5px solid;
            border-bottom: 1px solid;
            color: inherit;
            margin-bottom: 10px;
            padding-left: 10px;
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
                width: 31%;
                margin-bottom: 0;
            }
        }
    }

    #footer-copyright{
        background-color: $dark-blue;
        small{
            display: block;
            text-align: center;
            color: $white-gray;
        }
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
    }),
}

</script>
