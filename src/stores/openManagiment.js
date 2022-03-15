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
            console.log('prevent scroll !!');
        },
        close(){
            this.nowOpened = null;
            document.removeEventListener("wheel", notscroll, { passive: false });
            document.removeEventListener("touchmove", notscroll, { passive: false });
            console.log('allow to scroll !!');
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
