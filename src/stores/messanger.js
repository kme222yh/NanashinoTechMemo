import { defineStore } from 'pinia'

export const useMessangerStore = defineStore('Messanger', {
    state: ()=>{return {
        messageQueue: [],
    }},
    getters: {
        doesExist(){return this.messageQueue.length > 0;},
    },
    actions: {
        pop(){return this.messageQueue.shift();},
        push(message, type){
            this.messageQueue.push({
                text: message,
                type: type,
                key:(new Date()).getTime(),
                timeoutId:null,
            });
        },
        clear(){
            this.messageQueue = [];
        },
    }
})
