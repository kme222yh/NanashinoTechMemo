<template>
    <div id="app">
        <Composer/>
        <ScreenTransition/>
        <Header/>
        <router-view/>
        <Footer/>
    </div>
</template>





<style lang="scss">
    @import url('https://fonts.googleapis.com/css2?family=M+PLUS+Rounded+1c:wght@300&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=M+PLUS+1p:wght@500&display=swap');


    #app{
        width: 100%;
    }


    body{
        font-family: 'M PLUS Rounded 1c', sans-serif;
        color: $text-color-dark;
        background-color: $bg-color;

        line-height: 2;
        font-size: 15px;
        @include tablet{
            font-size: 18px;
        }
        @include desktop{
            font-size: 20px;
        }
    }


    h2, h3, h4{
        font-size: 20px;
        @include tablet{
            font-size: 22px;
        }
        @include desktop{
            font-size: 26px;
        }
    }


    small{
        font-size: 12px;
        @include tablet{
            font-size: 14px;
        }
    }


    a{
        color: inherit;
        text-decoration: none;
    }


    .outer{
        max-width: $desktop-max;
        margin: 0 auto;
    }
    .inner{
        box-sizing: border-box;
        padding: 10px;
        @include tablet{
            padding: 18px;
        }
        @include desktop{
            padding: 25px;
        }
    }
    .inner-side{
        box-sizing: border-box;
        padding: 0 10px;
        @include tablet{
            padding: 0 18px;
        }
        @include desktop{
            padding: 0 25px;
        }
    }


    .section{
        margin-bottom: 100px;
    }



    .jumbotron{
        position: relative;
        // margin-bottom: 100px;////////////////
        width: 100%;
        height: 400px;
        color: white;
        line-height: 2;
        background-size :cover;
        background-position: center;
        background-repeat: no-repeat;
        .outer{
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
        }
        h2, h1{
            text-align: center;
            padding: 0 20px;
            font-size: 25px;
        }
        .category{
            position: absolute;
            top: 50px;
            left: 50%;
            transform: translateX(-50%);
            font-size: 18px;
            padding: 5px 20px;
            border: 1px solid;
            border-radius: 5px;
        }
        .modified{margin-left: 20px;}
        @include tablet{
            height: 450px;
            h2, h1{font-size: 30px;}
            .category{font-size: 20px;}
        }
        @include desktop{
            height: 500px;
            h2, h1{font-size: 36;}
            .category{font-size: 22px;}
            a{
                transition: .5s;
                &:hover{color: $dark-white;}
            }
        }
        @include jumbotron{
            min-height: 35vw;
            h2, h1{
                font-size: 43px;
            }
        }
    }



</style>





<script>
    require('./assets/sass/reset.css')

    export default {
        components: {
            Composer: require('./Composer.vue').default,
            ScreenTransition: require('./components/ScreenTransition.vue').default,
            Header: require('./components/Header.vue').default,
            Footer: require('./components/Footer.vue').default,
        },
    }
</script>
