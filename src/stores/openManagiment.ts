import { defineStore } from 'pinia'

const notscroll = (e: Event) => {
	e.preventDefault();
}

export const useOpenManagimentStore = defineStore('openManagiment', {
    state: ()=>({
        nowOpened: null as string | null,
    }),
    getters: {
        // isOpened('name') => whether 'name' is opened, isOpened() => the opened name or null
        isOpened(state){
            function isOpened(): string | null
            function isOpened(something: string): boolean
            function isOpened(something?: string){
                if(something){
                    return state.nowOpened == something;
                } else {
                    return state.nowOpened;
                }
            }
            return isOpened;
        }
    },
    actions: {
        open(something: string){
            this.nowOpened = something;
            document.addEventListener("wheel", notscroll, { passive: false });
            document.addEventListener("touchmove", notscroll, { passive: false });
        },
        close(){
            this.nowOpened = null;
            document.removeEventListener("wheel", notscroll);
            document.removeEventListener("touchmove", notscroll);
        },
        toggle(something: string){
            if(this.nowOpened == something){
                this.close();
            } else {
                this.open(something);
            }
        },
    }
})
