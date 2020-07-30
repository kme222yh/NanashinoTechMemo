<template>
    <div id="article">
        <top-view
            :title="title"
            :date="date"
            :date_modified="date_modified"
            :media="media"
            :category="category"
            :tags="tags"
        />
        <article-content v-if="content" :content="content"></article-content>
    </div>
</template>



<style lang="scss">
    #article{
    }
</style>




<script>
    import { mapActions } from 'vuex'

    export default{
        components: {
            TopView: require('../components/TopView.vue').default,
            ArticleContent: require('../components/ArticleContent.vue').default,
        },
        data(){return {
            id: null,
            date: '',
            date_modified: null,
            title: '',
            content: null,
            media: '',
            category: '',
            tags: [],
        }},
        async mounted(){
            const res = await window.axios.get(this.getRequestPath)
            this.content = res.data.content
            this.title = res.data.title
            this.date = res.data.date
            this.date_modified = res.data.date_modified
            this.media = res.data.media
            this.category = res.data.category
            this.tags = res.data.tags
            this.openingAnimationHide()
        },
        beforeDestroy(){
            this.openingAnimationVisible()
        },
        computed: {
            getRequestPath(){
                return `${window.home_url}/wp-json/vendor/v1/article/${this.$route.params.post_id}`
            },
        },
        methods: {
            ...mapActions({
                openingAnimationVisible: 'opening_animation_visible',
                openingAnimationHide: 'opening_animation_hide',
            }),
        }
    }
</script>
