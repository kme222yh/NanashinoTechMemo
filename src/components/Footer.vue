<template>
    <footer>
        <div id="footer_widget"><ul v-html="widget"/></div>
        <div id="footer-copyright" v-show="is_visible">
            <small>Copyright Katuura 2019 All right receved.</small>
        </div>
    </footer>
</template>





<style lang="scss">
    #footer_widget{
        background-color: white;
        ul{
            @include outer-limit;
            box-sizing: border-box;
            padding: 50px 10px;
        }
        li{
            list-style: none;
            margin-bottom: 50px;
        }
        h2{
            @include article-title;
            color: $text-color-dark;
            line-height: 1.5;
            border-left: 5px solid $text-color-dark;
            margin-bottom: 10px;
            padding-left: 10px;
        }
        p{
            @include article-small;
            color: $text-color-dark;
            line-height: 2;
        }
        iframe{
            width: auto;
            height: auto;
        }
        @include tablet{
            ul{
                display: flex;
                justify-content: space-between;
            }
            li{
                width: 48%;
                margin-bottom: 0;
            }
        }
    }
    #footer-copyright{
        background-color: $text-color-dark-hover;
        @include article-small;
        text-align: center;
        padding: 20px 0;
    }
</style>






<script>
import { mapState } from 'vuex'

export default{
    data(){return{
        widget: null,
        twitter_src: null,
    }},
    computed: {
        ...mapState({is_visible: 'footer_visible'})
    },
    async created(){
        const endpoint = `${window.home_url}/wp-json/vendor/v1/widget/footer`
        const res = await window.axios.get(endpoint)
        this.widget = res.data
        this.twitter_src = document.createElement('script')
        this.twitter_src.src = "https://platform.twitter.com/widgets.js"
        this.twitter_src.type = "text/javascript";
        document.getElementsByTagName("head")[0].appendChild(this.twitter_src);
    },
}

</script>
