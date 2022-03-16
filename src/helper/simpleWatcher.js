import { watch, nextTick } from 'vue'

class simpleWatcher {
    constructor(target, f){
        this.watchStopHandler = null;
        this.target = target;
        this.f = f;
    }

    run(){
        this.watchStopHandler = watch(this.target, ()=>{
            this.watchStopHandler();
            nextTick(this.f);
        })
    }
}


export default simpleWatcher
