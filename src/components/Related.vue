<template>
    <section v-if="related.length" id="related-articles" class="outer">
        <div class="inner">
            <h4>関連記事</h4>
            <div class="content">
                <div class="article-link inner" v-for="(article, index) in related" :key="index">
                    <div class="media" itemprop="image" itemscope itemtype="http://schema.org/ImageObject">
                        <router-link :to="{name: 'Article', params: {post_id: article.id}}" itemprop="url" itemscope :title="article.title.rendered" :style="{'background-image': `url(${article['_embedded']['wp:featuredmedia'][0]['source_url']})`}"/>
                    </div>
                    <h5><router-link :to="{name: 'Article', params: {post_id: article.id}}" itemprop="url" itemscope :title="article.title.rendered">{{article.title.rendered}}</router-link></h5>
                </div>
            </div>
        </div>
    </section>
</template>



<style lang="scss">

    #related-articles{
        padding: 50px 0;
        background-color: white;
        color: $transparent-gray;
        h4{
            border-bottom: solid 1px;
            margin-bottom: 10px;
            padding-left: 10px;
        }
        .media{
            width: 100%;
            height: 150px;
            margin-bottom: 10px;
            a{
                display: block;
                height: 100%;
                width: 100%;
                background-position: center;
                background-size: cover;
            }
        }
        .article-link{
            // border-radius: 5px;
            border: 1px solid $dark-white;
            margin: 50px 0;
        }

        @include tablet{
            .content{
                display: flex;
                justify-content: space-between;
                flex-wrap: wrap;
            }
            .media{
                height: 200px;
            }
            .article-link{
                width: 48%;
            }
        }
        @include desktop{
            .article-link{
                width: 32%;
            }
            a{
                transition: .5s;
            }
            a:hover{
                color: $dark-gray;
            }
        }
    }

</style>



<script>
    import { mapState } from 'vuex'

    export default{
        computed: mapState({
            related: state => state.related,
        }),
    }
</script>
