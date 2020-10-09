<template>
    <div class="article-link">
        <small><time itemprop="datePublished">{{date}}</time></small>
        <component :is="htag" itemprop="name headline">
            <router-link :to="{name: 'Article', params: {post_id: id}}" itemprop="url" itemscope :title="title">{{title}}</router-link>
        </component>
        <div class="media" itemprop="image" itemscope itemtype="http://schema.org/ImageObject">
            <router-link :to="{name: 'Article', params: {post_id: id}}" itemprop="url" itemscope :title="title" :style="{'background-image': `url(${media})`}"/>
        </div>
        <p class="category-tag">
            <router-link :to="{name: 'Category', params: {category: categories[0].slug}}">{{categories[0].name}}</router-link>
        </p>
    </div>
</template>



<style lang="scss">
    .article-link{
        background-color: white;

        box-sizing: border-box;
        text-align: center;
        width: 550px;
        margin: 20px;
        padding: 25px;
        border-radius: 15px;

        color: $transparent-gray;


        h2, h5, h3, h4{
            margin: 35px 0;
            color: $dark-gray;
        }


        .media{
            width: 100%;
            height: 200px;
            a{
                display: block;
                height: 100%;
                width :100%;
                background-position: center;
                background-size: cover;
            }
        }


        .category-tag{
            margin-top: 30px;
            color: $dark-gray;
        }



        transition: 1s;
        opacity: 1;
        transform: none;
        &.hidden{
            opacity: 0;
            transform: translateY(5%) scale(0.98);
        }


        @include desktop{
            h2, h5, h3, h4, .media, .category-tag{
                transition: .5s;
            }
            h2:hover, h3:hover, .category-tag:hover{
                color: $transparent-gray;
            }
            .media:hover{
                opacity: 0.8;
            }
        }
    }
</style>



<script>
    export default {
        props: {
            date: String,
            id: Number,
            title: String,
            media: String,
            categories: Array,
            htag_level: {
                type: Number,
                default: 2,
            },
        },
        computed: {
            htag() {
              return `h${this.htag_level}`
            }
        }
    }
</script>
