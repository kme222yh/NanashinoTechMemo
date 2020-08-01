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
    import { mapState } from 'vuex'

    export default{
        components: {
            TopView: require('../components/TopView.vue').default,
            ArticleContent: require('../components/ArticleContent.vue').default,
        },
        computed: mapState({
            content: state => state.article.content,
            title: state => state.article.title,
            date: state => state.article.date,
            date_modified: state => state.article.date_modified,
            media: state => state.article.media,
            category: state => state.article.category,
            tags: state => state.article.tags,
        }),
    }
</script>
