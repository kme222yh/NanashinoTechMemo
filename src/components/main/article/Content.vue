<template>
    <section class="content">
        <div class="content-body" v-html="props.content"></div>
    </section>
</template>


<style lang="scss">
.content{
    &-body{
        @include outerBody;
        background-color: white;
        min-height: 50vh;
        padding-top: 70px;
        padding-bottom: 70px;

        font-size: 18px;
        &>*{
            margin: 1.5em 0;
        }
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
        background-color: $bg-light;
        color: $text-dark;
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


    h2,h3,p.subheading{
        @include innerBody;
        position: relative;
        line-height: 1.4;
        margin-top: 3em;
    }
    h2{
        font-size: 26px;
        &::after{
            position: absolute;
            left: 0;
            right: 0;
            top: calc(100% + 5px);
            height: 9px;
            width: 100%;
            border-radius: 10px;
            background-color: $bg-transparent-gray;
            content: '';
        }
    }
    h3{
        padding-left: 15px;
        &::before{
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            left: 0;
            display: block;
            height: 90%;
            width: 9px;
            border-radius: 10px;
            background-color: $bg-transparent-gray;
            content: '';
        }
    }
    p.subheading{
        padding-left: 15px;
        &::before{
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            left: 0;
            display: block;
            height: 65%;
            width: 9px;
            border-radius: 6px;
            background-color: $bg-transparent-gray;
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
        padding: 20px 0;
        @include innerBody;
        font-size: 18px;
        margin-bottom: 40px;
        border: 2px dashed $bg-transparent-gray;
        border-radius: 5px;
        li{
            line-height: 1.7;
            margin-bottom: 20px;
            margin-left: 15px;
            position :relative;
            &::before{
                content: "";
                position: absolute;
                left: -20px;
                top: 11px;
                height: 8px;
                width: 8px;
                background-color: #122f3d80;
                border-radius: 5px;
            }
            &:last-child{
                margin-bottom: 0;
            }
        }
    }

    .wp-block-image{
        position: relative;
        transition: .3s;
        &:hover{
            opacity: .9;
        }
        a{
            position: absolute;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
        }
    }

    // Table of Contents Plus [wordpress plugin]
    #toc_container{
        ul{
            border: none;
            font-size: 16px;
            a{
                color: $text-blue;
            }
            li::before{content: none;}
        }
        @include mobile{
            width: 100%;
        }
    }



    @include tablet{
        ul{
            li{
                margin-left: 23px;
            }
        }
    }
    @include mobile{
        ul{
            li{
                margin-left: 25px;
            }
        }
    }

}
</style>


<script setup>
import { defineProps, onMounted, onUnmounted } from 'vue'
const props = defineProps({
    content: String,
})


const overWriteTocLink = ()=>{
    const $toc = document.getElementById('toc_container');
    if($toc){
        const $aList = $toc.querySelectorAll('a');
        for(const $a of $aList){
            $a.addEventListener('click', e=>{
                const id = e.currentTarget.getAttribute('href').substr(1);
                document.getElementById(id).scrollIntoView();
                window.scrollBy(0, -70)
                e.preventDefault();
            })
        }
    }
}
const overWriteImgLink = ()=>{
    const $article = document.getElementsByClassName('content-body')[0];
    const $imgList = $article.getElementsByClassName('wp-block-image');
    for(const $img of $imgList){
        const $a = document.createElement('a');
        $a.target = '_brank';
        $a.href = $img.children[0].src;
        $img.style =
        $img.appendChild($a);
    }
}


import { loadScripts, unLoadScript } from '@/config/wpJavascriptDependency'
import st from '@/helper/simpleTrier'
const contentWatcher = new st;
contentWatcher.do(()=>{
    loadScripts('hcb');
    overWriteTocLink();
    overWriteImgLink();
}).when(()=>{
    return document.getElementsByClassName('content-body')[0].children.length>0
})


onMounted(()=>{
    contentWatcher.run();
});
onUnmounted(()=>{
    unLoadScript('hcb');
})
</script>
