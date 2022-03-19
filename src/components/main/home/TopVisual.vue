<template>
    <div class="topVisual" :style="{'background-image': bgStyle }">
        <div class="topVisual-body">
            <h2 class="topVisual-title">
                <router-link v-if="props.id" :to="{name: 'Article', params: {post_id: props.id}}">{{props.title}}</router-link>
                <p v-else>{{props.title}}</p>
            </h2>

            <router-link class="topVisual-category" v-if="props.category_slug" :to="{name: 'Category', params: {category: props.category_slug}}">{{props.category}}</router-link>
            <p class="topVisual-category" v-else-if="props.category">{{props.category}}</p>

            <div class="topVisual-date">
                <small class="wrote"><i class="fas fa-pen"></i> {{props.date}}</small>
                <small class="modified" v-if="props.date!=props.date_modified"><i class="fas fa-sync-alt"></i> {{props.date_modified}}</small>
            </div>
        </div>
    </div>
</template>


<style lang="scss">
.topVisual{
    width: 100%;
    background-size :cover;
    background-position: center;
    background-repeat: no-repeat;
    &-body{
        @include innerBody;
        max-width: 100vw;
        height: 500px;
        margin: 0 auto;
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
    &-title{
        text-align: center;
        color: $text-light;
        font-size: 40px;
        line-height: 1.5;
    }
    &-category{
        color: $text-light;
        position: absolute;
        top: 50%;
        right: 50%;
        transform: translate(50%, -135px);
        font-size: 20px;
        padding: 0px 30px;
        border: 1px solid;
        border-radius: 5px;
    }
    &-date{
        color: $text-light;
        position: absolute;
        top: 50%;
        right: 50%;
        transform: translate(50%, 90px);
        width: 100%;
        text-align: center;
        .wrote, .modified{font-size: 14px;}
        .modified{
            margin-left: 20px;
            &::before{
                position: absolute;
                top: 50%;
                transform: translateY(-50%);
                left: 50%;
                width: 1px;
                height: 10px;
                background-color: $bg-transparent-white;
                content: '';
            }
        }
    }
    a{
        transition: .5s;
        &:hover{
            color: $bg-transparent-white;
        }
    }


    @include tablet{
        &-body{
            height: 450px;
        }
        &-title{
            font-size: 30px;
        }
        &-category{
            font-size: 18px;
            transform: translate(50%, -120px);
        }
        &-date{
            transform: translate(50%, 80px);
        }
    }
    @include mobile{
        &-body{
            height: 400px;
        }
        &-title{
            font-size: 25px;
        }
        &-category{
            font-size: 17px;
            transform: translate(50%, -110px);
        }
        &-date{
            font-size: 13px;
            transform: translate(50%, 75px);
        }
    }
}
</style>


<script setup>
import { defineProps, computed } from 'vue'
const props = defineProps({
    id: Number,
    title: String,
    category: String,
    category_slug: String,
    date: String,
    date_modified: String,
    media: String,
})

const bgStyle = computed(()=>{
    let style = 'linear-gradient(rgba(18, 47, 61, 0.5), rgba(18, 47, 61, 0.5))';
    if(props.media) style += `,url(${props.media})`
    return style;
});
</script>
