<template>
    <form class="contactForm">
        <div class="contactForm-body">
            <transition><p class="error" v-if="error.name">Name is required</p></transition>
            <input class="contactForm-input" type="text" v-model="form.name" placeholder="name">
            <transition><p class="error" v-if="error.email">Please fix your email</p></transition>
            <input class="contactForm-input" type="email" v-model="form.email" placeholder="e-mail">
            <transition><p class="error" v-if="error.subject">Subject is required</p></transition>
            <input class="contactForm-input" type="text" v-model="form.subject" placeholder="subject">
            <transition><p class="error" v-if="error.message">Please fill out your message</p></transition>
            <textarea class="contactForm-input" name="message" v-model="form.message" rows="8" placeholder="message"></textarea>
            <transition><p class="send" v-if="send">Your message has been sent successfully.</p></transition>
            <div class="contactForm-button" :class="{available: !send}" @click="button_action">{{buttonMessage}}</div>
        </div>
    </form>
</template>


<style lang="scss">
.contactForm{
    &-body{
        @include outerBody;
        max-width: 800px;
        padding-top: 30px;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
    }
    &-input, &-button{
        width: 100%;
        box-sizing: border-box;
        padding: 0 10px;
        border-radius: 5px;
        font-size: 20px;
        line-height: 2;
        transition: .5s;
        margin-bottom: 50px;
    }
    &-input{
        border: 1px solid $bg-white;
        background-color: $bg-white;
        color: $text-dark;
        &:focus{
            box-shadow: 0 0 0px 3px $text-transparent-gray;
            border: 1px solid $text-transparent-gray;
            color: $text-dark;
        }
    }
    &-button{
        text-align: center;
        background-color: transparent;
        color: $text-transparent-gray;
        border: 1px solid;
        &.available{
            cursor: pointer;
            &:hover{
                color: $text-dark;
            }
        }
    }
}


    // .error, .send{
    //     margin-bottom: 10px;
    //     text-align: left;
    //     &.v-enter-active, &.v-leave-active{
    //         transition: .5s;
    //     }
    //     &.v-enter, &.v-leave-to{
    //         opacity: 0;
    //         margin-bottom: 0;
    //         height: 0;
    //     }
    //     &.v-enter-to, &.v-leave{
    //         opacity: 1;
    //         margin-bottom: 10px;
    //         height: 40px;
    //     }
    // }
    //
    // .error{
    //     color: #FF573D;
    // }
    //
    // .send{
    //     color: #45CC54;
    // }
</style>


<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import ep from '@/config/endpoints.js'


const form = ref({
    _token: null,
    name: '',
    email: '',
    subject: '',
    message: '',
});
const error = ref({
    name: false,
    email: false,
    subject: false,
    message: false,
});
const sending = ref(false);
const send = ref(false);
const buttonMessage = ref("I'm not a bot.");
const mayBeyouAreBot = ref(true);




const button_action = ()=>{
    if(mayBeyouAreBot.value){
        axios.get(ep.mailer).then((res)=>{
            mayBeyouAreBot.value = false
            form.value._token=res.data
            setTimeout(decrease, 10);
        })
    }
    // else if(this.validation()){
    //     this.sending = true
    //     let params = new URLSearchParams();
    //     for (let key in this.form) {
    //         params.append(key, this.form[key])
    //     }
    //     axios.post( mailer_host, params).then(()=>{
    //         this.sending = false
    //         this.send = true
    //     })
    // }
}


const decrease = ()=>{
    buttonMessage.value = buttonMessage.value.substr(1,buttonMessage.value.length-1)
    if(buttonMessage.value.length > 1)
        setTimeout(decrease, 80)
    else
        setTimeout(increase, 500)
}
const increase = ()=>{
    buttonMessage.value = 'submit'.substr(6-buttonMessage.value.length-1,buttonMessage.value.length+1)
    if(buttonMessage.value.length < 6)
        setTimeout(increase, 110)
}
</script>
