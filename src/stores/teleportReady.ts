import { defineStore } from 'pinia'

export const useTeleportReadyStore = defineStore('teleportReady', {
    state: ()=>({
        ready: {} as Record<string, boolean>,
    }),
    getters: {
        isReady(state){
            return (something: string): boolean | undefined => state.ready[something];
        }
    },
    actions: {
        readyToGo(something: string){
            this.ready[something] = true;
        },
    }
})
