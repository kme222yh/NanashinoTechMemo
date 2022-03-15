import { defineStore } from 'pinia'

const notscroll = (e) => {
	e.preventDefault();
}

export const useOpenManagimentStore = defineStore('openManagiment', {
    state: ()=>{return {
        nowOpened: null,
    }},
    getters: {
        isOpened(){
            return something => {
                if(something){
                    return this.nowOpened == something;
                } else {
                    return this.nowOpened;
                }
            };
        }
    },
    actions: {
        open(something){
            this.nowOpened = something;
            document.addEventListener("wheel", notscroll, { passive: false });
            document.addEventListener("touchmove", notscroll, { passive: false });
        },
        close(){
            this.nowOpened = null;
            document.removeEventListener("wheel", notscroll, { passive: false });
            document.removeEventListener("touchmove", notscroll, { passive: false });
        },
        toggle(something){
            if(this.nowOpened == something){
                this.close();
            } else {
                this.open(something);
            }
        },
    }
})
