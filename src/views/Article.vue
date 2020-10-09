<template>
    <main id="article" class="" itemprop="mainContentOfPage" itemscope="itemscope" itemtype="http://schema.org/Blog">

        <breadcrumb class="top-bcn"
            :category="article.category"
            :category_slug="article.category_slug"
            :article="article.title"
        />

        <article class="section" itemscope="itemscope" itemtype="http://schema.org/BlogPosting" itemprop="blogPost">

            <top-view class="outer"
                :media="article.media"
                :title="article.title"
                :id="article.id"
                :date="article.date"
                :date_modified="article.date_modified"
                :category="article.category"
                :category_slug="article.category_slug"
            >
                <template v-slot:h-tag>
                    <h1 class="inner" itemprop="name headline">{{article.title}}</h1>
                </template>
                <template>
                    <figure style="display: none">
                        <span itemscope itemtype='http://schema.org/ImageObject' itemprop="image" >
                            <img :src="article.media" alt="">
                        </span>
                    </figure>
                </template>
            </top-view>

            <div id="article-content" class="outer inner-side section" itemprop="articleBody" v-html="article.content"/>

            <Related/>
        </article>

        <breadcrumb class="bottom-bcn"
            :category="article.category"
            :category_slug="article.category_slug"
            :article="article.title"
        />

    </main>
</template>





<style lang="scss">
    #article{
        .top-bcn{
            margin-top: 40px;
        }
    }


    #article-content{
        background-color: white;
        min-height: 50vh;
        padding-top: 70px;
        padding-bottom: 70px;


        .wp-block-embed, .wp-block-image {
            max-width: 100%;
            iframe, img{
                width: 100%;
                max-width: 500px;
            }
            img{
                height: auto !important;
            }
        }


        .wp-block-quote{
            background-color: $bg-color;
            color: $text-color-dark;
            padding: 20px 10px 20px 80px;
            border-radius: 5px;
            position: relative;
            &:before{
                font-family: "Font Awesome 5 Free";
                content: '\f10d';
                font-weight: 900;
                margin-right: 10px;
                position: absolute;
                left: 30px;
                top: 20px;
            }
            p{
                margin-bottom: 20px;
            }
        }


        h2,h3{
            padding-left: 20px;
            margin: 80px 0 30px 0;
        }
        h2{
            font-size: 26px;
            margin-bottom: 10px;
            &::after{
                margin-left: -20px;
                display: block;
                height: 9px;
                width: 100%;
                border-radius: 10px;
                background-color: $transparent-gray;
                content: '';
            }
        }
        h3{
            margin-top: 60px;
            position: relative;
            &::before{
                position: absolute;
                top: 50%;
                transform: translateY(-50%);
                left: 0;
                display: block;
                height: 90%;
                width: 9px;
                border-radius: 10px;
                background-color: $transparent-gray;
                content: '';
            }
        }

        p{
            font-size: 18px;
            margin-bottom: 40px;
        }

        p.subheading{
            padding-left: 20px;
            margin-bottom: 20px;

            position: relative;
            &::before{
                position: absolute;
                top: 50%;
                transform: translateY(-50%);
                left: 0;
                display: block;
                height: 15px;
                width: 9px;
                border-radius: 3px;
                // border: 3px solid $transparent-gray;
                background-color: $transparent-gray;
                content: '';
            }
        }

        a{
            color: #1e90ff;
            text-decoration: none;
            word-break: break-all;
        }

        strong{
            font-family: 'M PLUS 1p', sans-serif;
        }

        small{

        }

        ul, ol{
            font-size: 18px;
            padding: 20px 10px 20px 40px;
            margin-bottom: 40px;
            border: 2px dashed $transparent-gray;
            border-radius: 5px;
            li{margin: 8px 0;}
        }
    }


</style>




<script>
    import { mapState } from 'vuex'

    export default{
        components: {
            Related: require('../components/Related.vue').default,
            TopView: require('../parts/TopView.vue').default,
            Breadcrumb: require('../components/Breadcrumb.vue').default,
        },
        computed: mapState({
            article: state => state.article,
        }),
    }
</script>
