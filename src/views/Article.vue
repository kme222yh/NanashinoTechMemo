<template>
    <main id="article" class="section" itemprop="mainContentOfPage" itemscope="itemscope" itemtype="http://schema.org/Blog">
        <article itemscope="itemscope" itemtype="http://schema.org/BlogPosting" itemprop="blogPost">
            <div id="top-view" class="jumbotron section" :style="{'background-image': `linear-gradient(rgba(18, 47, 61, 0.5), rgba(18, 47, 61, 0.5)), url(${article.media})`}">
                <div class="outer inner">
                    <h1 itemprop="name headline">{{article.title}}</h1>
                    <div class="date">
                        <small class="wrote"><font-awesome-icon icon="pen-fancy"/> {{article.date}}</small>
                        <small class="modified" v-if="article.date!=article.date_modified"><font-awesome-icon icon="sync"/> {{article.date_modified}}</small>
                    </div>
                    <router-link v-if="article.category" :to="{name: 'Category', params: {category: article.category_slug}}" class="category">{{article.category}}</router-link>

                    <figure style="display: none">
                        <span itemscope itemtype='http://schema.org/ImageObject' itemprop="image" >
                            <img :src="article.media" alt="">
                        </span>
                    </figure>
                </div>
            </div>
            <div id="article-content" class="outer inner-side section" itemprop="articleBody" v-html="article.content"/>

            <Related></Related>
        </article>
    </main>
</template>





<style lang="scss">
    #article-content{
        background-color: white;
        // border-radius: 5px;
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
            padding-left: 10px;
            margin: 80px 0 30px 0;
        }
        h2{
            border-left: 10px solid $transparent-gray;
            border-bottom: 2px dashed $transparent-gray;
            border-top: 2px dashed $transparent-gray;
        }
        h3{
            border-left: 8px solid $transparent-gray;
            margin-top: 60px;
        }

        p{
            margin-bottom: 40px;
        }

        p.subheading{
            border-left: 8px double $transparent-gray;
            padding-left: 20px;
            margin-bottom: 20px;
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
            padding: 20px 10px 20px 40px;
            margin-bottom: 40px;
            border: 2px dashed $transparent-gray;
            border-radius: 5px;
            li{margin: 10px 0;}
        }
    }


</style>




<script>
    import { mapState } from 'vuex'

    export default{
        components: {
            Related: require('../components/Related.vue').default,
        },
        computed: mapState({
            article: state => state.article,
        }),
        // data(){return{
        //     scripts: [
        //         "https://platform.twitter.com/widgets.js",
        //         "http://localhost:8888/wp-content/plugins/highlighting-code-block/assets/js/prism.js?ver=1.2.1",
        //         "http://localhost:8888/wp-content/plugins/highlighting-code-block/build/js/hcb_script.js?ver=1.2.1",
        //     ],
        // }},
        // watch: {
        //     article(){
        //         for(let index in this.scripts){
        //             const src = this.scripts[index]
        //             this.scripts[index] = document.createElement('script')
        //             this.scripts[index].src = src
        //             this.scripts[index].type = "text/javascript";
        //             document.getElementsByTagName("head")[0].appendChild(this.scripts[index]);
        //         }
        //     }
        // },
        // beforeDestroy(){
        //     console.log('destroy!!')
        //     for(let index in this.scripts){
        //         document.getElementsByTagName("head")[0].removeChild(this.scripts[index]);
        //     }
        // },
    }
</script>
