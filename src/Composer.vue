<template>
    <div></div>
</template>

<style scoped>
    div{display: none;}
</style>

<script>
    import { mapState } from 'vuex'


    export default{
        data(){return{
            intervals: {
                scroll: null,
            }
        }},






        async created(){
            await Promise.all([this.fetchCategories(), this.fetchTags(), this.fetchFooterWidget()])

            if(this.$route.name == "Article"){
                await this.fetchArticle()
                document.getElementById("top-view").scrollIntoView(true)
            }
            else if(this.$route.name == "About"){
                await this.fetchAbout()
                document.getElementById("top-view").scrollIntoView(true)
            }
            else{
                await this.fetchArticles()
                this.intervals.scroll = setInterval(this.scrollingWatch, 100)
            }

            console.log("I'm composer. welcome to our site.")
            const el = document.getElementById('opening-animation')
            el.classList.add('hide')
        },
        mounted(){
            this.$router.beforeEach(async (to, from, next)=>{
                clearInterval(this.intervals.scroll)
                this.loadingAnimationVisible()
                await this.waitmSecound()
                next()
            })
            this.$router.afterEach(async ()=>{
                if(this.$route.name == "Article"){
                    await this.fetchArticle()
                    document.getElementById("top-view").scrollIntoView(true)
                }
                else if(this.$route.name == "About"){
                    await this.fetchAbout()
                    document.getElementById("top-view").scrollIntoView(true)
                }
                else{
                    await this.refreshArticles()
                    document.getElementsByClassName("search-form")[0].scrollIntoView(true)
                    this.intervals.scroll = setInterval(this.scrollingWatch, 100)
                }
                this.loadingAnimationHide()
            })
        },
        watch: {
            async search_word(){
                this.loadingAnimationVisible()
                await this.waitmSecound()
                await this.refreshArticles()
                document.getElementsByClassName("search-form")[0].scrollIntoView(true)
                this.loadingAnimationHide()
            }
        },






        computed: mapState({
            search_word: state => state.search_word,
        }),







        methods: {
            async fetchCategories(){
                let res = {data: {length: 1}}
                for(let page=1; res.data.length != 0; page++){
                    res = await window.axios.get(`${window.home_url}/wp-json/wp/v2/categories?page=${page}`)
                    this.$store.state.categories = this.$store.state.categories.concat(res.data)
                }
                console.log('categories was fetched')
                return new Promise(f=>{f()})
            },
            async fetchTags(){
                let res = {data: {length: 1}}
                for(let page=1; res.data.length != 0; page++){
                    res = await window.axios.get(`${window.home_url}/wp-json/wp/v2/tags?page=${page}`)
                    this.$store.state.tags = this.$store.state.tags.concat(res.data)
                }
                console.log('tags was fetched')
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
                return new Promise(f=>{f()})
            },
            async refreshArticles(){
                this.$store.state.articles.data = []
                this.$store.state.articles.all_out = false
                this.$store.state.articles.next_page = 1
                return this.fetchArticles()
            },
            async fetchArticle(){
                const endpoint = `${window.home_url}/wp-json/vendor/v1/article/${this.$route.params.post_id}`
                const res = await window.axios.get(endpoint)
                this.$store.state.article = res.data
                console.log('article was fetched')
                return new Promise(f=>{f()})
            },
            async fetchAbout(){
                const endpoint = `${window.home_url}/wp-json/vendor/v1/about`
                const res = await window.axios.get(endpoint)
                this.$store.state.article = res.data
                console.log('about page was fetched')
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
            async scrollingWatch(){
                if(this.$store.state.articles.all_out == true){
                    clearInterval(this.intervals.scroll)
                    this.footerVisible()
                }
                const scrollHeight = Math.max(
                    document.body.scrollHeight, document.documentElement.scrollHeight,
                    document.body.offsetHeight, document.documentElement.offsetHeight,
                    document.body.clientHeight, document.documentElement.clientHeight
                );
                const pageMostBottom = scrollHeight - window.innerHeight;
                const scrollTop = window.pageYOffset;
                if (scrollTop >= pageMostBottom){
                    clearInterval(this.intervals.scroll)
                    await this.fetchArticles()
                    if(this.$store.state.articles.all_out == false)
                        this.intervals.scroll = setInterval(this.scrollingWatch, 100)
                    else
                        this.footerVisible()
                }
            },





            footerHide(){this.$store.state.footer_visible = false},
            footerVisible(){this.$store.state.footer_visible = true},


            loadingAnimationHide(){this.$store.state.loading_animation_visible = false},
            loadingAnimationVisible(){this.$store.state.loading_animation_visible = true},


            waitmSecound(s=500){
                return new Promise((resolve)=>{
                    setTimeout(resolve, s)
                })
            },
        },
    }
</script>
