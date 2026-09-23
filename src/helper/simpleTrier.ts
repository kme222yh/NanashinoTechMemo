// Polls `condition` and runs the action once when it becomes true.
class simpleTrier {
    private setIntervalId: ReturnType<typeof setInterval> | null = null
    private condition: () => unknown = () => true
    private f: () => void = () => {}
    private interval = 100

    when(condition: () => unknown): this {
        this.condition = condition;
        return this;
    }

    do(f: () => void): this {
        this.f = f;
        return this;
    }

    run(interval=100): void {
        this.stop();
        this.interval = interval;
        this.setIntervalId = setInterval(()=>{
            if(this.condition()){
                this.stop();
                this.f();
            }
        }, this.interval);
    }

    stop(): void {
        if(this.setIntervalId !== null) clearInterval(this.setIntervalId);
        this.setIntervalId = null;
    }
}


export default simpleTrier
