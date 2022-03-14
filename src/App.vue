<script setup>
import { RouterView } from 'vue-router'
import Header from '@/components/header/Header.vue'
import Footer from '@/components/footer/Footer.vue'
</script>


<template>
    <Header/>
    <RouterView/>
    <Footer/>
</template>


<style lang="scss">
@import '@/assets/css/reset.css';

@import url('https://fonts.googleapis.com/css2?family=M+PLUS+Rounded+1c:wght@300&display=swap');
@import url('https://fonts.googleapis.com/css2?family=M+PLUS+1p:wght@500&display=swap');

#app{
    width: 100%;
}

body{
    font-family: 'M PLUS Rounded 1c', sans-serif;
    color: $text-dark;
    background-color: $bg-light;
    line-height: 2;
    font-size: 15px;
}

h2, h3, h4, h5{
    font-size: 20px;
}
small{
    font-size: 12px;
}
a{
    color: inherit;
    text-decoration: none;
}

input, select, textarea, button{
    -moz-appearance: none;
    -webkit-appearance: none;
}
</style>
