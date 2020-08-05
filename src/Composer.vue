<template>
    <div/>
</template>

<style scoped>
    div{display: none;}
</style>

<script>
    import { mapState } from 'vuex'


    export default{
        data(){return{
            search_word_change_ignore: false,


            article_dependency: [
                "https://platform.twitter.com/widgets.js",
                "http://localhost:8888/wp-content/plugins/highlighting-code-block/assets/js/prism.js?ver=1.2.1",
                "http://localhost:8888/wp-content/plugins/highlighting-code-block/build/js/hcb_script.js?ver=1.2.1",
            ],
            scripts: [],
        }},


        async created(){
            await Promise.all([this.fetchMenu(), this.fetchFooterWidget()])

            if(this.$route.name == "Article"){
                this.fetchRelated()
                await this.fetchArticle()
                document.getElementById("top-view").scrollIntoView(true)
            }
            else if(this.$route.name == "About"){
                await this.fetchAbout()
                document.getElementById("top-view").scrollIntoView(true)
            }
            else{
                await Promise.all([this.fetchArticles(), this.fetchPinnedArticle()])
            }

            if(this.$route.name == "Category")
                this.$store.state.page_title = `${this.$route.params.category}に関する記事`

            console.log("Hello, I'm composer. welcome to our website.")
            const el = document.getElementById('opening-animation')
            el.classList.add('hide')
            setTimeout(()=>{el.style.display="none"}, 1010)
        },
        mounted(){
            this.$router.beforeEach(async (to, from, next)=>{
                this.screenTransitionStart()
                await this.waitmSecound()
                next()
            })
            this.$router.afterEach(async ()=>{
                this.search_word_change_ignore = true
                this.$store.state.search_word = ''
                this.$store.state.page_title = ''
                if(this.$route.name == "Article"){
                    this.fetchRelated()
                    await this.fetchArticle()
                    document.getElementById("top-view").scrollIntoView(true)
                }
                else if(this.$route.name == "About"){
                    this.fetchRelated()
                    await this.fetchAbout()
                    document.getElementById("top-view").scrollIntoView(true)
                }
                else{
                    await Promise.all([this.refreshArticles(), this.fetchPinnedArticle()])
                    document.getElementsByClassName("search-form")[0].scrollIntoView(true)
                }
                if(this.$route.name == "Category")
                    this.$store.state.page_title = `${this.$route.params.category}に関する記事`
                this.search_word_change_ignore = false
                this.screenTransitionEnd()
            })
        },
        watch: {
            async search_word(){
                if(this.search_word_change_ignore == true) return
                this.screenTransitionStart()
                await this.waitmSecound()
                await this.refreshArticles()
                document.getElementsByClassName("search-form")[0].scrollIntoView(true)
                if(this.search_word == ''){
                    if(this.$route.name == "Category")
                        this.$store.state.page_title = `${this.$route.params.category}に関する記事`
                    else
                        this.$store.state.page_title = ''
                }
                else{
                    if(this.$route.name == "Category")
                        this.$store.state.page_title = `${this.$route.params.category}と${this.search_word}に関する記事`
                    else
                        this.$store.state.page_title = `${this.search_word}に関する記事`
                }
                this.screenTransitionEnd()
            },
            async articles_load(){
                if(this.articles_load == false) return
                this.$store.state.articles.load = false
                await this.fetchArticles()
            },
        },






        computed: mapState({
            search_word: state => state.search_word,
            articles_load: state => state.articles.load,
        }),







        methods: {
            async fetchMenu(){
                const endpoint = `${window.home_url}/wp-json/vendor/v1/menu/global`
                const res = await window.axios.get(endpoint)
                this.$store.state.menu = res.data
                console.log('menu was fetched')
                return new Promise(f=>{f()})
            },
            async fetchPinnedArticle(){
                const endpoint = `${window.home_url}/wp-json/vendor/v1/menu/pinned`
                const res = await window.axios.get(endpoint)
                this.$store.state.pinned = res.data
                console.log('pinned articles was fetched')
                return new Promise(f=>{f()})
            },
            async fetchFooterWidget(){
                const endpoint = `${window.home_url}/wp-json/vendor/v1/widget/footer`
                const res = await window.axios.get(endpoint)
                this.$store.state.widget.footer = res.data
                let twitter_src = document.createElement('script')
                twitter_src.src = "https://platform.twitter.com/widgets.js"
                twitter_src.type = "text/javascript";
                document.getElementsByTagName("head")[0].appendChild(twitter_src);
                console.log('footer widged was fetched')
                return new Promise(f=>{f()})
            },
            async fetchArticles(){
                const endpoint = `${window.home_url}/wp-json/vendor/v1/articles${this.search_option_query()}`
                const res = await window.axios.get(endpoint)
                this.$store.state.articles.data = this.$store.state.articles.data.concat(res.data.articles)
                this.$store.state.articles.all_out = res.data.all_out
                this.$store.state.articles.next_page = res.data.next_page
                console.log('articles was fetched')
                const f = ()=>{
                    if(this.$store.state.articles.show_until < this.$store.state.articles.data.length-1){
                        this.$store.state.articles.show_until++
                        setTimeout(f, 300)
                    }
                }
                setTimeout(f, 500)
                return new Promise(f=>{f()})
            },
            async refreshArticles(){
                this.$store.state.articles.data = []
                this.$store.state.articles.all_out = false
                this.$store.state.articles.next_page = 1
                this.$store.state.articles.show_until = -1
                return this.fetchArticles()
            },
            async fetchArticle(){
                for(let index in this.scripts){
                    document.getElementsByTagName("head")[0].removeChild(this.scripts[index]);
                }
                this.scripts = []
                const endpoint = `${window.home_url}/wp-json/vendor/v1/article/${this.$route.params.post_id}`
                const res = await window.axios.get(endpoint)
                this.$store.state.article = res.data
                console.log('article was fetched')
                for(let index in this.article_dependency){
                    this.scripts[index] = document.createElement('script')
                    this.scripts[index].src = this.article_dependency[index]
                    this.scripts[index].type = "text/javascript";
                    document.getElementsByTagName("head")[0].appendChild(this.scripts[index]);
                }
                return new Promise(f=>{f()})
            },
            async fetchAbout(){
                const endpoint = `${window.home_url}/wp-json/vendor/v1/about`
                const res = await window.axios.get(endpoint)
                this.$store.state.article = res.data
                console.log('about page was fetched')
                return new Promise(f=>{f()})
            },
            async fetchRelated(){
                if(this.$route.name == "About"){
                    this.$store.state.related = []
                    console.log('related articles was not fetched')
                    return
                }
                const endpoint = `${window.home_url}/wp-json/yarpp/v1/related/${this.$route.params.post_id}?_embed&limit=10`
                const res = await window.axios.get(endpoint)
                this.$store.state.related = res.data
                console.log('related articles was fetched')
                return new Promise(f=>{f()})
            },









            search_option_query(){
                const articles = this.$store.state.articles
                let query = `?per_page=${articles.per_page}&page=${articles.next_page}&search=${this.search_word}`
                if(this.$route.name == 'Tag')
                    query += `&tag=${this.$route.params.tag}`
                else if(this.$route.name == 'Category')
                    query += `&category=${this.$route.params.category}`
                return query
            },





            footerHide(){this.$store.state.footer_visible = false},
            footerVisible(){this.$store.state.footer_visible = true},


            screenTransitionEnd(){this.$store.state.during_screen_transition = false},
            screenTransitionStart(){this.$store.state.during_screen_transition = true},


            waitmSecound(s=500){
                return new Promise((resolve)=>{
                    setTimeout(resolve, s)
                })
            },
        },
    }
</script>
