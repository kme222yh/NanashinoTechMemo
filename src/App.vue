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
    }


    h2, h3, h4, h5{
        font-size: 20px;
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


    input, select, textarea, button{
        -moz-appearance: none;
        -webkit-appearance: none;
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
