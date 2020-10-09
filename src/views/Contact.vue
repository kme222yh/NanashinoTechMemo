<template>
    <main id="contact" class="" itemprop="mainContentOfPage" itemscope="itemscope" itemtype="http://schema.org/Blog">

        <breadcrumb class="top-bcn"
            article="Contact"
        />

        <mini-title class="inner-side" :htag_level="1">Contact</mini-title>


        <form method="post" class="outer inner">
            <transition><p class="error" v-if="error.name">Name is required</p></transition>
            <p><input type="text" v-model="form.name" placeholder="name"></p>
            <transition><p class="error" v-if="error.email">Please fix your email</p></transition>
            <p><input type="email" v-model="form.email" placeholder="e-mail"></p>
            <transition><p class="error" v-if="error.subject">Subject is required</p></transition>
            <p><input type="text" v-model="form.subject" placeholder="subject"></p>
            <transition><p class="error" v-if="error.message">Please fill out your message</p></transition>
            <p><textarea name="message" v-model="form.message" rows="8" placeholder="message"></textarea></p>
            <transition><p class="send" v-if="send">Your message has been sent successfully.</p></transition>
            <p><button :class="{available: !send}" type="button" :disabled="send" name="button" @click="button_action">{{button_message}}</button></p>
        </form>

        <breadcrumb class="top-bcn"
            article="Contact"
        />

    </main>
</template>





<style lang="scss">
    #contact form{
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;

        p{
            width: 100%;
            text-align: center;
            margin-bottom: 50px;
        }

        input, textarea, button, .error, .send{
            width: 100%;
            max-width: 900px;
            box-sizing: border-box;
            padding: 0 10px;
            border-radius: 5px;

            font-family: 'M PLUS Rounded 1c', sans-serif;
            font-size: 20px;
            line-height: 2;

            transition: .5s;

            outline: none;
            &:focus{
                outline: none;
            }
        }

        input, textarea{
            border: 1px solid white;
            background-color: white;
            color: $dark-gray;
            &:focus{
                box-shadow: 0 0 0px 3px $transparent-gray;
                border: 1px solid $transparent-gray;
                color: $dark-gray;
            }
        }

        button{
            background-color: transparent;
            border: 1px solid;
            color: $transparent-gray;
            &.available:hover{
                color: $dark-gray;
            }
        }


        .error, .send{
            margin-bottom: 10px;
            text-align: left;
            &.v-enter-active, &.v-leave-active{
                transition: .5s;
            }
            &.v-enter, &.v-leave-to{
                opacity: 0;
                margin-bottom: 0;
                height: 0;
            }
            &.v-enter-to, &.v-leave{
                opacity: 1;
                margin-bottom: 10px;
                height: 40px;
            }
        }

        .error{
            color: #FF573D;
        }

        .send{
            color: #45CC54;
        }
    }
</style>




<script>
    const axios = require('axios')
    axios.defaults.withCredentials = true;
    const mailer_host = 'https://mailer.reuhul.org/'
    // const mailer_host = 'http://127.0.0.1:8000/'


    export default{
        components: {
            Breadcrumb: require('../components/Breadcrumb.vue').default,
            MiniTitle: require('../parts/MiniTitle.vue').default,
        },
        data: ()=>{return {
            button_message: "I'm not a bot.",
            maybe_you_are_bot: true,

            form: {
                _token: null,
                name: '',
                email: '',
                subject: '',
                message: '',
            },

            error: {
                name: false,
                email: false,
                subject: false,
                message: false,
            },

            sending: false,
            send: false,
        }},
        methods: {
            button_action(){
                if(this.maybe_you_are_bot){
                    axios.get(mailer_host + 'ppapi/ppapi/issue_token').then((res)=>{
                        this.maybe_you_are_bot = false
                        this.form._token=res.data
                        setTimeout(this.decrease, 10)
                    })
                }
                else if(this.validation()){
                    this.sending = true
                    let params = new URLSearchParams();
                    for (let key in this.form) {
                        params.append(key, this.form[key])
                    }
                    axios.post( mailer_host, params).then(()=>{
                        this.sending = false
                        this.send = true
                        // this.scrollToTop()
                    })
                    // this.sending = false
                    // this.send = true
                }
            },

            validation(){
                this.error.name = false
                this.error.subject = false
                this.error.message = false
                this.error.email = false;
                let result = true
                if(!this.form.name){
                    this.error.name = true
                    result = result&false
                }
                if(!this.form.subject){
                    this.error.subject = true
                    result = result&false
                }
                if(!this.form.message){
                    this.error.message = true
                    result = result&false
                }
                var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                if(!re.test(this.form.email)){
                    this.error.email = true
                    result = result&false
                }
                return result
            },

            decrease(){
                this.button_message = this.button_message.substr(1,this.button_message.length-1)
                if(this.button_message.length > 1)
                    setTimeout(this.decrease, 80)
                else
                    setTimeout(this.increase, 500)
            },
            increase(){
                this.button_message = 'submit'.substr(6-this.button_message.length-1,this.button_message.length+1)
                if(this.button_message.length < 6)
                    setTimeout(this.increase, 110)
            },
        }
    }
</script>
