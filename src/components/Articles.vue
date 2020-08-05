<template>
    <article id="articles" class="outer" itemscope="itemscope" itemtype="http://schema.org/BlogPosting" itemprop="blogPost">
        <div class="page_title inner">
            <h1>{{page_title}}</h1>
        </div>
        <div class="no-articles" v-show="articles.data.length==0">
            <p>記事が見つかりませんでした…</p>
            <p>( ；∀；)</p>
        </div>
        <div class="content inner" v-show="articles.data.length>0">
            <div :class="{'article-link':true, 'inner':true, 'visible': index<=articles.show_until}" v-for="(article, index) in articles.data" :key="index">
                <small><time itemprop="datePublished">{{article.date}}</time></small>
                <h2 itemprop="name headline">
                    <router-link :to="{name: 'Article', params: {post_id: article.id}}" itemprop="url" itemscope :title="article.title">{{article.title}}</router-link>
                </h2>
                <div class="media" itemprop="image" itemscope itemtype="http://schema.org/ImageObject">
                    <router-link :to="{name: 'Article', params: {post_id: article.id}}" itemprop="url" itemscope :title="article.title" :style="{'background-image': `url(${article.media})`}"/>
                </div>
                <p class="category-tag"><router-link :to="{name: 'Category', params: {category: article.categories[0].slug}}">{{article.categories[0].name}}</router-link></p>
            </div>
        </div>
        <div class="load_button" v-if="articles.all_out==false" @click="$store.state.articles.load=true">
            <p>さらに読み込む…</p>
        </div>
    </article>
</template>





<style lang="scss">
    #articles .article-link{
        background-color: white;
        margin-bottom: 40px;
        text-align: center;
        color: $transparent-gray;
        small{display: block;}
        h2{margin: 10px 0 20px 0;}
        .category-tag{
            margin: 20px 0 10px 0;
            a{
                padding: 5px 20px;
                border: 1px solid;
                border-radius: 5px;
            }
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

        opacity: 0;
        transform: translateY(5%) scale(0.98);
        &.visible{
            transition: 1s;
            opacity: 1;
            transform: none;
        }

        @include tablet{
            .media{
                height: 250px;
            }
        }
        @include desktop{
            width: 48%;
            a{
                transition: .5s;
                &:hover{color: $dark-gray;}
            }

            &.v-enter-active{transition: 1s;}
            &.v-enter{opacity: 0; transform: translateY(5%) scale(0.98);}
            &.v-enter-to{opacity: 1; transform: none;}
        }
    }

    #articles{
        min-height: 70vh;
        position: relative;
        .page_title{
            h1{
                border-bottom: 1px solid;
                color: $transparent-gray;
                font-size: 20px;
                @include tablet{font-size: 25px;}
                @include desktop{font-size: 35px;}
            }
        }
    }
    #articles .content{
        @include desktop{
            width: 100%;
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
        }
    }

    #articles .load_button{
        display: flex;
        justify-content: center;
        p{
            cursor: pointer;
            padding: 5px 20px;
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
    computed: {
        ...mapState({
            articles: state => state.articles,
            page_title: state => state.page_title,
        }),
    },
}
</script>
