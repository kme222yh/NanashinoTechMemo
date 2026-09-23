import { watch, nextTick, type WatchSource, type WatchStopHandle } from 'vue'

// Runs `f` (after the next DOM update) the first time `target` changes.
class simpleWatcher {
    private watchStopHandler: WatchStopHandle | null = null

    constructor(private target: WatchSource, private f: () => void){}

    run(): void {
        this.watchStopHandler = watch(this.target, ()=>{
            this.watchStopHandler?.();
            nextTick(this.f);
        })
    }
}


export default simpleWatcher
