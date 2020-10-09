<template>
    <div class="top-view" :style="{'background-image': media===undefined?'':`linear-gradient(rgba(18, 47, 61, 0.5), rgba(18, 47, 61, 0.5)), url(${media})`}">
        <div v-if="media!==undefined" class="outer inner">
            <slot name="h-tag">
                <h2 class="inner"><router-link :to="{name: 'Article', params: {post_id: id}}">{{title}}</router-link></h2>
            </slot>
            <div class="date">
                <small class="wrote"><i class="fas fa-pen"></i> {{date}}</small>
                <small class="modified" v-if="date!=date_modified"><i class="fas fa-sync-alt"></i> {{date_modified}}</small>
            </div>
            <router-link v-if="category_slug!==undefined" :to="{name: 'Category', params: {category: category_slug}}" class="category">{{category}}</router-link>

            <slot/>
        </div>
    </div>
</template>





<style lang="scss">
.top-view{
    width: 100%;
    height: 500px;
    background-size :cover;
    background-position: center;
    background-repeat: no-repeat;

    color: white;

    &>.inner{
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;

        position: relative;
    }

    h2, h1{
        text-align: center;
        color: white;
        font-size: 25px;
        @include tablet{
            font-size: 30px;
        }
        @include desktop{
            font-size: 40px;
        }
    }


    .date{
        position: absolute;
        bottom: 130px;
        right: 50%;
        transform: translateX(50%);

        width: 100%;
        text-align: center;

        .modified{
            margin-left: 20px;
            &::before{
                position: absolute;
                top: 50%;
                transform: translateY(-50%);
                left: 50%;
                width: 1px;
                height: 10px;
                background-color: $transparent-white;
                content: '';
            }
        }
    }


    .category{
        position: absolute;
        top: 80px;
        right: 50%;
        transform: translateX(50%);
        font-size: 20px;
        padding: 0px 30px;
        border: 1px solid;
        border-radius: 5px;
    }

    @include desktop{
        a{
            transition: .5s;
            &:hover{
                color: $transparent-white;
            }
        }
    }
}
</style>






<script>
    export default {
        props: {
            media: String,
            title: String,
            id: Number,
            date: String,
            date_modified: String,
            category: String,
            category_slug: String,
        }
    }
</script>
