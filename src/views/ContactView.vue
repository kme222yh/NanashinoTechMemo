<template>
    <main class="contactView">
        <div class="contactView-body">
            <h1 class="contactView-title">Contact</h1>
            <ContactForm/>
            <Breadcrumb title="Contact" />
        </div>
    </main>
</template>


<style lang="scss">
.contactView{
    padding-top: 30px;
    &-title{
        @include outerBody;
        font-size: 25px;
        color: $text-transparent-gray;
        text-align: center;
        margin-bottom: 20px;
        &::after{
            display: block;
            margin: 0 auto;
            margin-top: 10px;
            height: 9px;
            max-width : $footer-widget-max-width;
            width: 100%;
            border-radius: 10px;
            background-color: $bg-transparent-gray;
            content: '';
        }
    }
}
</style>


<script setup>
import Breadcrumb from '@/components/main/article/Breadcrumb.vue'
import ContactForm from '@/components/main/contact/ContactForm.vue'
</script>
