<template>
    <section id="top-article">

        <article style="background-image: linear-gradient(to top, rgba(0,0,0,0), 30%, rgba(18, 47, 61, 0.8)), url(http://localhost:8888/wp-content/uploads/2020/07/vue-js.jpg);">
            <div class="content">
                <div class="info">
                    <small> <i class="far fa-clock"></i> 2020-7-18</small>
                    <div class="categoreis"><i class="fas fa-tags"></i><p>vue.js</p><p>javascript</p></div>
                </div>
                <h2>Vue.jsでホゲホゲ！！</h2>
                <p class="discription">box-shadowは簡単ですが、簡単さゆえにできないこともたくさんあります。 下の図（左）は、市松模様の上に水色のbox-shadowで影を落としたものです。 表現によってはこれもありですが、影としてよりリアルなのは（右）の方ではないでしょうか？</p>
            </div>
        </article>


        <!-- <div id="carousel-controller">
            <div><i class="fas fa-chevron-left"></i></div>
            <div><i class="fas fa-circle"></i></div>
            <div><i class="fas fa-circle"></i></div>
            <div><i class="fas fa-circle"></i></div>
            <div><i class="fas fa-circle"></i></div>
            <div><i class="fas fa-chevron-right"></i></div>
        </div> -->
    </section>
</template>





<style lang="scss">
    #top-article{
        position: relative;
        z-index: 1;
        min-height: 500px;
        height: 35vw;
        article{
            height: 100%;
            background-position: center;
            background-size: auto 100%;
            transition: .8s;
            .content{
                @include outer-limit;
                @include outer-base;
                padding-top: 50px !important;
                box-sizing: border-box;
                &>p{
                    @include main-text;
                }
            }
            h2{
                @include main-top-title;
                text-align: center;
                margin-bottom: 40px;
            }
            .info, .categoreis{
                display: flex;
                justify-content: center;
                align-items: center;
                i{
                    margin-right: 5px;
                }
            }
            .info{
                @include main-top-small;
                small, div{
                    margin-right: 30px;
                }
                margin-bottom: 40px;
            }
            .categoreis{
                p{
                    @include category_tag;
                    border: 1px solid $text-color-light;
                }
            }

            &:hover{
                background-size: auto 110%;
            }
        }
    }


    #carousel-controller{
        position: absolute;
        bottom: 30px;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        justify-content: center;
        align-items: center;
        height: 50px;
        background-color: rgba(18, 47, 61, 0.6);
        border-radius: 25px;
        padding: 0 20px;
        div{
            margin: 0 20px;
        }
        i{
            font-size: 13x;
        }
        div:first-of-type i, #carousel-controller div:last-of-type i{
            font-size: 30px;
        }
    }
</style>





<script>
export default {
}
</script>
