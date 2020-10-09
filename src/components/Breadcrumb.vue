<template>
    <div class="breadcrumb outer inner-side">
        <span class="" itemscope itemtype="http://data-vocabulary.org/Breadcrumb">
            <router-link itemprop="url" to="/"><span itemprop="title"><i class="fas fa-home"></i></span></router-link>
            &gt;&nbsp;
        </span>
        <span v-if="category_slug!==undefined" class="breadcrumbs" itemscope itemtype="http://data-vocabulary.org/Breadcrumb">
            <router-link :to="{name: 'Category', params: {category: category_slug}}"><span itemprop="title">{{category}}</span></router-link>
            &gt;&nbsp;
        </span>
        <span>{{article}}</span>
    </div>
</template>





<style lang="scss">
    .breadcrumb{
        a{
            color: #1e90ff;
            &:hover{
                @include desktop{
                    text-decoration: underline;
                }
            }
        }
    }
</style>




<script>
    export default {
        props: {
            category: String,
            category_slug: String,
            article: String,
        }
    }
</script>
