<template>
    <section v-if="related.length" id="related-articles">
        <div class="inner">
            <h4>関連記事</h4>

            <div class="content">
                <article-link v-for="(article, index) in related" :key="index"
                    :id="article.id"
                    :date="article.date"
                    :title="article['title'].rendered"
                    :media="article['_embedded']['wp:featuredmedia'][0]['source_url']"
                    :categories="article['_embedded']['wp:term'][0]"
                    :htag_level="5"
                />
            </div>
        </div>
    </section>
</template>



<style lang="scss">

    #related-articles{
        padding: 30px 0;
        border-top: 1px solid $transparent-gray;
        h4{
            @include MiniTitle;
            color: $transparent-gray;
        }

        .content{
            margin-top: 30px;
            width: 100%;
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
        }
    }

</style>



<script>
    import { mapState } from 'vuex'

    export default{
        components: {
            ArticleLink: require('../parts/ArticleLink.vue').default,
        },
        computed: mapState({
            related: state => state.related,
        }),
    }
</script>
