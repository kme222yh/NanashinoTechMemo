import { defineStore } from 'pinia'

export const useTeleportReadyStore = defineStore('teleportReady', {
    state: ()=>{return {
        ready: [],
    }},
    getters: {
        isReady(){
            // return true of not true;
            return something => {return this.ready[something]};
        }
    },
    actions: {
        readyToGo(something){
            this.ready[something] = true;
        },
    }
})
