import { defineStore } from 'pinia'

export const useAjaxReadyStore = defineStore('ajaxReady', {
    state: ()=>{return {
        base: [],   // permanently not refreshed
        page: [],   // refresh before each change of route
    }},
    getters: {
        isReady(){
            // return true of not true;
            return something => {return this.page[something];};
        }
    },
    actions: {
        ready(something, base=false){
            if(base){
                this.base[something] = true;
            }
            this.page[something] = true;
        },
        refresh(){
            this.page = [];
            this.page = { ...this.base };
        },
    }
})
