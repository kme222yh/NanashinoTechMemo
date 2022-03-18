<template>
    <div class="messanger">
        <ul class="messanger-body">
            <transition-group>
                <li class="messanger-item" v-for="message in messages" :key="message.key" @click="processMessage(message.key)">
                    <p class="messanger-text" :class="message.type">
                        {{ message.text }}
                    </p>
                </li>
            </transition-group>
        </ul>
    </div>
</template>


<style lang="scss">
.messanger{
    position: fixed;
    top: 100px;
    left: 0;
    right: 0;
    z-index: 101;
    &-body{
        @include outerBody;
        max-width: 600px;
        display: flex;
        flex-direction: column-reverse;
    }
    &-item{
        &.v-enter-active, &.v-leave-active{
            transition: .3s;
        }
        &.v-enter-from, &.v-leave-to{
            opacity: 0;
            max-height: 0;
            margin-bottom: 0;
        }
        &.v-enter-from{transform: translateY(-30px);}
        &.v-leave-to{transform: translateY(10px);}
        &.v-enter-to, &.v-leave-from{
            opacity: 1;
            max-height: 60px;
            transform: none;
            margin-bottom: 20px;
        }
    }
    &-text{
        @include box-shadow;
        font-size: 20px;
        text-align: center;
        border-radius: 50px;
        padding: 15px;
        line-height: 1.5;
        margin-bottom: 20px;
        color: $text-dark;

        &:before{
            font-family: "Font Awesome 5 Free";
            -webkit-font-smoothing: antialiased;
            display: inline-block;
            font-style: normal;
            font-variant: normal;
            text-rendering: auto;
            line-height: 1;
            font-weight: bold;
            margin-right: 10px;
        }

        &.warning{
            background-color: $text-warning;
            color: $text-light;
            &:before{content: "\f06a";}
        }
        &.success{
            background-color: $text-success;
            color: $text-transparent-gray;
            &:before{content: "\f00c";}
        }
        &.info{
            background-color: $text-info;
            color: $text-transparent-gray;
            &:before{content: "\f129";}
        }
    }
}
</style>


<script setup>
import { ref, computed, watch } from 'vue'
import { useMessangerStore } from '@/stores/Messanger'
const messages = ref([]);
const messangerStore = useMessangerStore();
const messageQueue = computed(() => messangerStore.messageQueue);

const processMessage = (key) => {
    const index = messages.value.findIndex(message => message.key == key);
    clearTimeout(messages.value[index].timeoutId);
    messages.value.splice(index, 1);
};
const getMessage = () => {
    if(messangerStore.doesExist == false) return;
    let message = messangerStore.pop();
    message.timeoutId = setTimeout(()=>{
        processMessage(message.key);
    }, 5000);
    messages.value.push(message);
};

watch(messageQueue, getMessage, {deep: true});
</script>
