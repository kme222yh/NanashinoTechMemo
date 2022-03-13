import { defineStore } from 'pinia'

export const useOpenManagimentStore = defineStore('openManagiment', {
    state: ()=>{return {
        nowOpened: null,
    }},
    getters: {
        isOpened(){
            return something => {return this.nowOpened == something;};
        }
    },
    actions: {
        open(something){
            this.nowOpened = something;
        },
        close(){
            this.nowOpened = null;
        },
        toggle(something){
            if(this.nowOpened == something){
                this.nowOpened = null;
            } else {
                this.nowOpened = something;
            }
        },
    }
})
