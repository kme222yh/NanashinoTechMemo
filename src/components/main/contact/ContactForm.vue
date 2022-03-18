<template>
    <form class="contactForm">
        <div class="contactForm-body">
            <div class="contactForm-row">
                <transition><p class="contactForm-error" v-if="error.name">{{error.name}}</p></transition>
                <input class="contactForm-input" type="text" v-model="form.name" placeholder="name">
            </div>
            <div class="contactForm-row">
                <transition><p class="contactForm-error" v-if="error.email">{{error.email}}</p></transition>
                <input class="contactForm-input" type="email" v-model="form.email" placeholder="email">
            </div>
            <div class="contactForm-row">
                <transition><p class="contactForm-error" v-if="error.subject">{{error.subject}}</p></transition>
                <input class="contactForm-input" type="text" v-model="form.subject" placeholder="subject">
            </div>
            <div class="contactForm-row">
                <transition><p class="contactForm-error" v-if="error.message">{{error.message}}</p></transition>
                <textarea class="contactForm-input" name="message" v-model="form.message" rows="8" placeholder="message"></textarea>
            </div>
            <div class="contactForm-row">
                <transition><p class="contactForm-send" v-if="send">Your message has been sent successfully.</p></transition>
                <div class="contactForm-button" :class="{disabled: send}" @click="button_action">{{buttonMessage}}</div>
            </div>
        </div>
        <StayBackground :visible="sending"/>
    </form>
</template>


<style lang="scss">
.contactForm{
    &-body{
        @include outerBody;
        max-width: 800px;
        padding-top: 30px;
    }
    &-row{
        margin-bottom: 40px;
        position: relative;
    }
    &-input, &-button, &-error, &-send{
        @include innerBody;
        width: 100%;
        border-radius: 5px;
        font-size: 20px;
        line-height: 2;
        transition: .5s;
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
        &::placeholder{
            color: $text-transparent-gray;
        }
    }
    &-button{
        text-align: center;
        background-color: transparent;
        border: 1px solid;
        color: $text-transparent-gray;
        cursor: pointer;
        &:hover{color: $text-dark;}
        &.disabled{
            cursor: none;
            pointer-events: none;
            &:hover{color: $text-transparent-gray;}
        }
    }
    &-error, &-send{
        position: absolute;
        top: -2em;
        color: $text-warning;
        font-size: 15px;
        &.v-enter-from, &.v-leave-to{
            opacity: 0;
        }
        &.v-enter-to, &.v-leave-from{
            opacity: 1;
        }
    }
    &-send{
        color: $text-green;
    }
}
</style>


<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import ep from '@/config/endpoints.js'
import AxiosMailer from 'axios'
AxiosMailer.defaults.withCredentials = true;

import StayBackground from '@/components/other/StayBackground.vue'

import { useMessangerStore } from '@/stores/Messanger'
const messangerStore = useMessangerStore();


const form = ref({
    _token: null,
    name: '',
    email: '',
    subject: '',
    message: '',
});
const error = ref({
    name: '',
    email: '',
    subject: '',
    message: '',
});
const sending = ref(false);
const send = ref(false);
const buttonMessage = ref("I'm not a bot.");
const mayBeyouAreBot = ref(true);



const validation = ()=>{
    error.value.name = '';
    error.value.subject = '';
    error.value.message = '';
    error.value.email = '';
    let result = true
    if(!form.value.name){
        error.value.name = 'Required';
        result = result&false;
    }
    if(!form.value.subject){
        error.value.subject = 'Required';
        result = result&false;
    }
    if(!form.value.message){
        error.value.message = 'Required';
        result = result&false;
    }
    var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(!form.value.email){
        error.value.email = 'Required';
        result = result&false;
    } else if(!re.test(form.value.email)){
        error.value.email = 'Please enter correct email address'
        result = result&false
    }

    return result
}
const button_action = ()=>{
    if(mayBeyouAreBot.value){
        sending.value = true;
        AxiosMailer.get(ep.mailerIssueToken).then((res)=>{
            mayBeyouAreBot.value = false
            form.value._token=res.data
            setTimeout(decrease, 10);
            setTimeout(()=>{
                sending.value = false;
                messangerStore.push('Submit button activated', 'info');
            }, 1500);
        }).catch(()=>{
            setTimeout(()=>{
                sending.value = false;
                messangerStore.push('Failed to acquire token', 'warning');
            }, 500);
        })
    } else if (validation()){
        sending.value = true
        let params = new URLSearchParams();
        for (let key in form.value) {
            params.append(key, form.value[key])
        }
        AxiosMailer.post(ep.mailerSend, params).then(()=>{
            sending.value = false
            send.value = true
            messangerStore.push('Your inquiry has been completed', 'success');
        }).catch(()=>{
            setTimeout(()=>{
                sending.value = false;
                messangerStore.push('Transmission failed', 'warning');
            }, 500);
        })
    } else {
        messangerStore.push('Please confirm your inquiry', 'warning');
    }
}


const decrease = ()=>{
    buttonMessage.value = buttonMessage.value.substr(1,buttonMessage.value.length-1)
    if(buttonMessage.value.length > 1)
        setTimeout(decrease, 80)
    else
        setTimeout(increase, 400)
}
const increase = ()=>{
    buttonMessage.value = 'submit'.substr(6-buttonMessage.value.length-1,buttonMessage.value.length+1)
    if(buttonMessage.value.length < 6)
        setTimeout(increase, 110)
}
</script>
