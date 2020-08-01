<template>
    <section id="articles">
        <h2>{{page_title}}</h2>
        <div class="content">
            <article v-for="article in articles.data" :key="article.id" :style="{'background-image': `linear-gradient(rgba(0,0,0,0), 40%, rgba(18, 47, 61, 0.8)), url(${article.media})`}">
                <router-link :to="{name: 'Article', params: {post_id: article.id}}">
                    <h3>{{article.title}}</h3>
                    <small class="date">{{article.date}}</small>
                    <div class="categoreis" v-show="article.tags.length!=0"><small v-for="tag in article.tags" :key="tag.id">{{tag.name}}</small></div>
                </router-link>
            </article>
        </div>
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
            // opacity: 0;
            // transform: translateY(50px);
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
import { mapState } from 'vuex'

export default {
    data(){return{
        page_title_default: 'Latest articles',
        page_title: 'Latest articles',
    }},
    computed: {
        ...mapState({
            articles: state => state.articles,
            // searchWord: state => state.search,
        }),
    },
}
</script>
