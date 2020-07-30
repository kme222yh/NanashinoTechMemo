<template>
    <section id="articles">
        <h2>{{page_title}}</h2>
        <div class="content">
            <article v-for="(article, index) in articles.data" :key="article.id" :class="{visible: articles.visible_up_to >= index}" :style="{'background-image': `linear-gradient(rgba(0,0,0,0), 40%, rgba(18, 47, 61, 0.8)), url(${article.media})`}">
                <router-link :to="{name: 'Article', params: {post_id: article.id}}">
                    <h3>{{article.title}}</h3>
                    <small class="date">{{article.date}}</small>
                    <div class="categoreis" v-show="article.tags.length!=0"><small v-for="tag in article.tags" :key="tag.id">{{tag.name}}</small></div>
                </router-link>
            </article>
        </div>
        <transition><Loading v-show="this.articles.data.length==0&&articles.is_all_loaded==false"/></transition>
    </section>
</template>





<style lang="scss">
    #articles{
        @include outer-base;
        position: relative;
        overflow: hidden;
        min-height: 90vh;

        h2{
            @include main-title;
            color: $text-color-dark;
            border-bottom: 1px solid $text-color-dark;
            margin-bottom: 30px;
        }

        article{
            width: 100%;
            height: 100vw;
            margin-bottom: 30px;
            border-radius: 5px;
            box-sizing: border-box;
            padding: 30px 20px;
            background-position: center;
            background-size: auto 100%;
            opacity: 0;
            transform: translateY(50px);
            h3{
                @include article-title;
                display: block;
                width: 100%;
                margin-bottom: 10px;
                border: none;
            }
            a{
                @include unlink;
                height: 100%;
                display: flex;
                flex-direction: column;
                justify-content: flex-end;
            }
            small, .categoreis{
                @include article-small;
                margin-right: 10px;
            }
            .date::before{
                font-family: "Font Awesome 5 Free";
                content: '\f017';
                font-weight: 400;
                margin-right: 10px;
            }
            .categoreis{
                margin-top: 15px;
                display: flex;
                align-items: center;
                flex-wrap: wrap;
                &::before{
                    font-family: "Font Awesome 5 Free";
                    content: '\f02c';
                    font-weight: 900;
                    margin-right: 10px;
                }
                small{
                    border: 1px solid $text-color-light;
                    box-sizing: border-box;
                    border-radius: 20px;
                    padding: 1px 6px;
                }
            }
        }
        article.visible{
            transition: 1s;
            opacity: 1;
            transform: none;
        }



        @include tablet{
            @include outer-limit;
            .content{
                display: flex;
                justify-content: space-between;
                flex-wrap: wrap;
            }
            article{
                width: 48%;
                height: 40vw;
                h3{margin-bottom: 5px;}
                .categoreis{margin-top: 8px;}
            }
        }

        @include desktop{
            article{
                transition: .5s;
                h3{margin-bottom: 15px;}
                .categoreis{margin-top: 20px;}
            }
            article:hover{
                background-size: auto 110%;
            }
        }

        @include jumbotron{
            article{
                width: 32%;
                height: 30vw;
                max-height: 400px;
            }
        }
    }
</style>





<script>
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
    components: {
        Loading: require('./Loading.vue').default,
    },
    data(){return{
        page_title_default: 'Latest articles',
        page_title: '',
        intervals: {
            scroll: null,
        },

        articles: {
            data: [],
            is_all_loaded: false,
            is_loading: false,
            next_page: 1,
            per_page: 12,
            visible_up_to: -1,
        }
    }},
    mounted(){
        // Promise.all([this.getArticlesFirst(), this.openingAnimationHide()])
        this.getArticlesFirst()
        this.openingAnimationHide()
    },
    beforeDestroy(){
        clearInterval(this.intervals.scroll)
        this.openingAnimationVisible()
    },
    watch: {
        $route () {
            this.getArticlesFirst()
        },
        searchWord () {
            this.getArticlesFirst()
        },
    },
    computed: {
        ...mapState('wp', {
            searchWord: state => state.options.search,
        }),

        ...mapGetters('wp', {
            category_slug2name: 'categories/slug2name',
            tag_slug2name: 'tags/slug2name',
        })
    },
    methods: {
        ...mapActions({
            footer_visible: 'footer_visible',
            footer_hide: 'footer_hide',
            openingAnimationVisible: 'opening_animation_visible',
            openingAnimationHide: 'opening_animation_hide',
        }),

        getArticlesFirst(){
            if(this.articles.is_all_loaded == false)
                clearInterval(this.intervals.scroll)
            this.footer_hide()
            this.refreshArticles()
            this.getArticles()
            this.intervals.scroll = setInterval(this.scrollingWatch, 500)
        },

        async getArticles(){
            if(this.articles.is_all_loaded) return
            this.articles.is_loading = true
            const endpoint = `${window.home_url}/wp-json/vendor/v1/articles`
            const path = endpoint + this.search_option_query()
            if(this.page_title === '')
                this.page_title = this.page_title_default
            const res = await window.axios.get(path)
            this.articles.data = this.articles.data.concat(res.data.articles)
            this.articles.is_all_loaded = res.data.all_out
            this.articles.next_page = res.data.next_page
            this.articles.is_loading = false

            const f = ()=>{
                if(this.articles.visible_up_to < this.articles.data.length-1){
                    this.articles.visible_up_to++
                    setTimeout(f, 200)
                }
            }
            setTimeout(f, 500)
        },

        refreshArticles(){
            this.articles.data = []
            this.articles.next_page = 1,
            this.articles.is_all_loaded = false
            this.articles.visible_up_to = -1
        },

        search_option_query(){
            this.page_title = ''
            let query = `?per_page=${this.articles.per_page}&page=${this.articles.next_page}&search=${this.searchWord}`
            if(this.$route.name == 'Tag'){
                this.page_title += `Tag : ${this.tag_slug2name(this.$route.params.tag)}  `
                query += `&tag=${this.$route.params.tag}`
            }
            else if(this.$route.name == 'Category'){
                this.page_title += `Category : ${this.category_slug2name(this.$route.params.category)}  `
                query += `&category=${this.$route.params.category}`
            }
            if(this.searchWord.length > 0)
                this.page_title += `Searched : "${this.searchWord}"`
            return query
        },


        scrollingWatch(){
            if(this.articles.is_all_loaded == true){
                clearInterval(this.intervals.scroll)
                this.footer_visible()
                return
            }
            const scrollHeight = Math.max(
                document.body.scrollHeight, document.documentElement.scrollHeight,
                document.body.offsetHeight, document.documentElement.offsetHeight,
                document.body.clientHeight, document.documentElement.clientHeight
            );
            const pageMostBottom = scrollHeight - window.innerHeight;
            const scrollTop = window.pageYOffset;
            if (scrollTop >= pageMostBottom && this.articles.is_loading==false)
                this.getArticles()
        },

    },
}
</script>
