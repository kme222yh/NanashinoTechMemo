import { defineStore } from 'pinia'

export const useAjaxReadyStore = defineStore('ajaxReady', {
    state: ()=>({
        base: {} as Record<string, boolean>,   // permanently not refreshed
        page: {} as Record<string, boolean>,   // refresh before each change of route
    }),
    getters: {
        isReady(state){
            return (something: string): boolean | undefined => state.page[something];
        }
    },
    actions: {
        ready(something: string, base=false){
            if(base){
                this.base[something] = true;
            }
            this.page[something] = true;
        },
        readyOther(){
            this.ready('otherView');
        },
        refresh(){
            this.page = { ...this.base };
        },
    }
})
