<template>
    <section id="article-content" v-html="content"/>
</template>





<style lang="scss">
    #article-content{
        @include outer-limit;
        box-sizing: border-box;
        min-height: 100vh;
        border-radius: 5px;
        background-color: white;

        font-family: 'M PLUS Rounded 1c', sans-serif;
        line-height: 2;
        color: $text-color-dark-hover;

        padding: 50px 20px;
        font-size: 15px;
        @include tablet{
            padding: 70px 30px;
            font-size: 18px;
        }
        @include desktop{
            font-size: 20px;
        }
        @include jumbotron{
            padding: 70px 40px;
            margin-top: 100px;
            margin-bottom: 100px;
        }

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
            font-size: 20px;
            line-height: 1.3;
            margin: 100px 0 30px 0;
            padding: 10px 0;
            padding-left: 10px;
            @include tablet{
                font-size: 25px;
                padding-left: 20px;
            }
        }
        h2{
            border-left: 10px solid $text-color-dark;
            border-bottom: 2px dashed $text-color-dark;
            border-top: 2px dashed $text-color-dark;
        }
        h3{
            border-left: 8px solid $text-color-dark;
            margin-top: 60px;
        }

        p{
            margin-bottom: 40px;
        }

        p.point{
            border-left: 8px double $text-color-dark;
            padding-left: 20px;
            margin-bottom: 20px;
        }

        a{
            color: #1e90ff;
            text-decoration: none;
            word-break: break-all;
        }

        strong{

        }

        small{

        }

        ul, ol{
            padding: 20px 10px 20px 40px;
            margin-bottom: 40px;
            border: 2px dashed $text-color-dark;
            border-radius: 5px;
            li{margin: 10px 0;}
        }


    }
</style>






<script>
    export default{
        props: {
            content: {
                String,
                required: true,
            },
        },
        data(){return{
            scripts: [
                "https://platform.twitter.com/widgets.js",
                "http://localhost:8888/wp-content/plugins/highlighting-code-block/assets/js/prism.js?ver=1.2.1",
                "http://localhost:8888/wp-content/plugins/highlighting-code-block/build/js/hcb_script.js?ver=1.2.1",
            ],
        }},
        mounted(){
            for(let index in this.scripts){
                const src = this.scripts[index]
                this.scripts[index] = document.createElement('script')
                this.scripts[index].src = src
                this.scripts[index].type = "text/javascript";
                document.getElementsByTagName("head")[0].appendChild(this.scripts[index]);
            }
        },
        beforeDestroy(){
            for(let index in this.scripts){
                document.getElementsByTagName("head")[0].removeChild(this.scripts[index]);
            }
        },
    }
</script>
