<template>
    <article id="articles" itemscope="itemscope" itemtype="http://schema.org/BlogPosting" itemprop="blogPost">
        <div class="page_title">
            <h1 class="outer inner-side">{{page_title}}</h1>
        </div>
        <div class="no-articles outer" v-show="articles.data.length==0">
            <p>記事が見つかりませんでした…</p>
            <p>( ；∀；)</p>
        </div>
        <div class="content" v-show="articles.data.length>0">
            <article-link :class="{'hidden': index>articles.show_until}" v-for="(article, index) in articles.data" :key="index"
                :id="article.id"
                :date="article.date"
                :title="article.title"
                :media="article.media"
                :categories="article.categories"
            />
        </div>
        <div class="load_button" v-if="articles.all_out==false" @click="$store.state.articles.load=true">
            <p>さらに読み込む…</p>
        </div>
    </article>
</template>





<style lang="scss">
    #articles{
        min-height: 70vh;
        position: relative;
        border-bottom: 1px solid $thin-transparent-gray;
        padding-bottom: 40px;
        .page_title{
            border-bottom: 1px solid $thin-transparent-gray;
            h1{
                color: $transparent-gray;
                font-size: 20px;
                @include tablet{font-size: 25px;}
                @include desktop{font-size: 35px;}
            }
        }
    }
    #articles .content{
        margin-top: 20px;
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
    }

    #articles .load_button{
        margin-top: 40px;

        display: flex;
        justify-content: center;
        p{
            cursor: pointer;
            padding: 0px 30px;
            border: 1px solid;
            border-radius: 5px;
            color: $transparent-gray;
            @include desktop{
                transition: .5s;
                &:hover{color: $dark-gray;}
            }
        }
    }

    #articles .no-articles{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        text-align: center;
        width: 100%;
        p{
            color: $transparent-gray;
            font-size: 20px;
        }
    }
</style>





<script>
import { mapState } from 'vuex'

export default {
    components: {
        ArticleLink: require('../parts/ArticleLink.vue').default,
    },
    computed: {
        ...mapState({
            articles: state => state.articles,
            page_title: state => state.page_title,
        }),
    },
}
</script>
