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
            article_dependency: [
                "https://platform.twitter.com/widgets.js",
                `${window.home_url}/wp-content/plugins/highlighting-code-block/assets/js/prism.js?ver=1.2.1`,
                `${window.home_url}/wp-content/plugins/highlighting-code-block/build/js/hcb_script.js?ver=1.2.1`,
            ],
            scripts: [],
        }},


        async created(){
            await this.fetchSiteInfo()

            if(this.$route.name == "NotFound"){
                console.log("。・゜・(ノД`)・゜・。")
            }
            else if(this.$route.name == "Article"){
                await this.fetchArticleInfo()
                document.getElementsByClassName("top-view")[0].scrollIntoView(true)
            }
            else if(this.$route.name == "Category" && !(this.$route.params.category in this.$store.state.categories)){
                this.$router.push({name: "NotFound"})
            }
            else
                await this.fetchArticles()
            this.pageTitleFix()
            // console.log("Hello, I'm composer. welcome to our website.")
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
                if(this.$route.name == "NotFound"){
                    console.log("。・゜・(ノД`)・゜・。")
                }
                else if(this.$route.name == "Article"){
                    await this.fetchArticleInfo()
                    document.getElementsByClassName("top-view")[0].scrollIntoView(true)
                }
                else if(this.$route.name == "Contact"){
                    // await this.fetchArticleInfo()
                    window.scrollTo(0, 0)
                }
                else{
                    await this.refreshArticles()
                    document.getElementsByClassName("search-form")[0].scrollIntoView(true)
                }
                this.pageTitleFix()
                this.screenTransitionEnd()
            })
        },
        watch: {
            async articles_load(){
                if(this.articles_load == false) return
                this.$store.state.articles.load = false
                await this.fetchArticles()
            },
        },






        computed: mapState({
            articles_load: state => state.articles.load,
        }),







        methods: {
            async fetchSiteInfo(){
                const endpoint = `${window.home_url}/wp-json/vendor/v1/base`
                const res = await window.axios.get(endpoint)
                this.$store.state.menu = res.data.menu.global
                this.$store.state.pinned = res.data.menu.pinned
                this.$store.state.footermenu = res.data.menu.footer
                this.$store.state.widgets.footer = res.data.widgets.footer
                this.$store.state.widgets.side_bar = res.data.widgets.side_bar
                this.$store.state.archives = res.data.archives
                this.$store.state.categories = res.data.categories

                let twitter_src = document.createElement('script')
                twitter_src.src = "https://platform.twitter.com/widgets.js"
                twitter_src.type = "text/javascript";
                document.getElementsByTagName("head")[0].appendChild(twitter_src);

                // console.log('site information was fetched')
                return new Promise(f=>{f()})
            },
            async fetchArticleInfo(){
                for(let index in this.scripts)
                    document.getElementsByTagName("head")[0].removeChild(this.scripts[index]);
                this.scripts = []
                try{
                    let endpoint = `${window.home_url}/wp-json/vendor/v1/article/${this.$route.params.post_id}`
                    const res = await window.axios.get(endpoint)
                    this.$store.state.article = res.data

                    for(let index in this.article_dependency){
                        this.scripts[index] = document.createElement('script')
                        this.scripts[index].src = this.article_dependency[index]
                        this.scripts[index].type = "text/javascript";
                        document.getElementsByTagName("head")[0].appendChild(this.scripts[index]);
                    }

                    // console.log('article was fetched')

                    if(/^[-]?([1-9]\d*|0)(\.\d+)?$/.test(this.$route.params.post_id)){
                        endpoint = `${window.home_url}/wp-json/yarpp/v1/related/${this.$route.params.post_id}?_embed&limit=10`
                        window.axios.get(endpoint).then(res=>{
                            this.$store.state.related = res.data
                            // console.log('related articles was fetched')
                        })

                        endpoint = `${window.home_url}/wp-json/wordpress-popular-posts/v1/popular-posts?wpp_id=${this.$route.params.post_id}`
                        window.axios.post(endpoint)
                    }
                    else
                        this.$store.state.related = []
                } catch(e){
                    this.gotoNotfound()
                }
                return new Promise(f=>{f()})
            },
            async fetchArticles(){
                const endpoint = `${window.home_url}/wp-json/vendor/v1/articles${this.search_option_query()}`
                const res = await window.axios.get(endpoint)
                this.$store.state.articles.data = this.$store.state.articles.data.concat(res.data.articles)
                this.$store.state.articles.all_out = res.data.all_out
                this.$store.state.articles.next_page = res.data.next_page
                // console.log('articles was fetched')
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







            search_option_query(){
                const articles = this.$store.state.articles
                let query = `?per_page=${articles.per_page}&page=${articles.next_page}`
                if(this.$route.name == 'Category')
                    query += `&category=${this.$route.params.category}`
                else if(this.$route.name == 'Archives')
                    query += `&year=${this.$route.params.year}&month=${this.$route.params.month}`
                else if(this.$route.name == 'Search')
                    query += `&search=${this.$route.query.s}`
                return query
            },




            pageTitleFix(){
                if(this.$route.name == 'Category'){
                    this.$store.state.page_title = `${this.$store.state.categories[this.$route.params.category]}に関する記事`
                }
                else if(this.$route.name == 'Archives'){
                    this.$store.state.page_title = `${this.$route.params.year}年${this.$route.params.month}月に投稿された記事`
                }
                else if(this.$route.name == 'Search'){
                    this.$store.state.page_title = `「${this.$route.query.s}」の検索結果`
                }
                else{
                    this.$store.state.page_title = ''
                }
            },




            gotoNotfound(){
                this.$router.push({name: 'NotFound'})
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
