<template>
    <section id="top-view" :style="{'background-image': `linear-gradient(to top, rgba(0,0,0,0), 30%, rgba(18, 47, 61, 0.8)), url(${media})`}">
        <div class="content">
            <p class="category">{{category}}</p>
            <div class="info">
                <small class="d">{{date}}</small>
                <small class="d-modified" v-if="date!=date_modified">{{date_modified}}</small>
                <p class="tags" v-if="tags.length>0"><small v-for="tag in tags" :key="tag">{{tag}}</small></p>
            </div>
            <h2>{{title}}</h2>
        </div>
    </section>
</template>





<style lang="scss">
    #top-view{
        min-height: 500px;
        height: 35vw;
        background-position: center;
        background-size: cover;
        .content{
            @include outer-limit;
            text-align: center;
            padding: 90px 10px;
            box-sizing: border-box;
        }
        .category{
            @include main-top-small;
            border: 1px solid $text-color-light;
            display: inline-block;
            margin-bottom: 30px;
            padding: 5px 20px;
            border-radius: 5px;
            &:before{
                font-family: "Font Awesome 5 Free";
                content: '\f07c';
                font-weight: 400;
                margin-right: 10px;
            }
        }
        .info{
            margin-bottom: 30px;
            &>small{
                margin: 0 10px;
            }
            .d:before, .d-modified:before{
                font-family: "Font Awesome 5 Free";
                margin-right: 5px;
            }
            .d:before{
                content: '\f017';
                font-weight: 400;
            }
            .d-modified:before{
                content: '\f079';
                font-weight: 800;
            }
        }
        .tags{
            margin-top: 20px;
            small{
                border: 1px solid $text-color-light;
                border-radius: 20px;
                padding: 1px 6px;
                margin: 0 4px;
            }
            &:before{
                font-family: "Font Awesome 5 Free";
                content: '\f02c';
                color: $text-color-light;
                font-weight: 800;
                margin-right: 5px;
            }
        }
        h2{
            @include main-top-title;
        }
        small{
            @include main-top-small;
        }


        @include desktop{
            .category, .info{
                margin-bottom: 50px;
            }
            .info{
                display: flex;
                justify-content: center;
            }
            .tags{
                margin-top: 0;
                margin-left: 20px;
            }
        }
    }
</style>






<script>
    export default{
        props: {
            title: {
                String,
                required: true,
            },
            date: {
                String,
                required: true,
            },
            date_modified: {
                String,
            },
            media: {
                String,
                required: true,
            },
            category: {
                Array,
                required: true,
            },
            tags: {
                Array,
            },
        }
    }
</script>
