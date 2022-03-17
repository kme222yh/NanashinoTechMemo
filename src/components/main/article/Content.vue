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
            background-color: $bg-transparent-gray;
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
            background-color: $bg-transparent-gray;
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
        font-size: 18px;
        padding: 20px 10px 20px 40px;
        margin-bottom: 40px;
        border: 2px dashed $bg-transparent-gray;
        border-radius: 5px;
        li{margin: 8px 0;}
    }

    // Table of Contents Plus [wordpress plugin]
    #toc_container{
        ul{
            border: none;
            font-size: 16px;
            a{
                color: $text-blue;
            }
        }
        @include mobile{
            width: 100%;
        }
    }

}
</style>


<script setup>
import { defineProps, onMounted } from 'vue'
const props = defineProps({
    content: String,
})

const tryOverWriteTocLink = ()=>{
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
    } else {
        setTimeout(tryOverWriteTocLink, 700);
    }
}
const startTryOverWriteTocLink = ()=>{setTimeout(tryOverWriteTocLink, 500)};


onMounted(startTryOverWriteTocLink);
</script>
