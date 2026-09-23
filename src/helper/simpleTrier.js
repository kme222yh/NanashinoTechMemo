class simpleTrier {
    constructor(){
        this.setIntervalId = null;
        this.condition = ()=>true;
        this.f = ()=>{};
    }

    when(condition){
        this.condition = condition;
        return this;
    }

    do(f){
        this.f = f;
        return this;
    }

    run(interval=100){
        this.stop();
        this.interval = interval;
        this.setIntervalId = setInterval(()=>{
            if(this.condition()){
                this.stop();
                this.f();
            }
        }, this.interval);
    }

    stop(){
        clearInterval(this.setIntervalId);
        this.setIntervalId = null;
    }
}


export default simpleTrier
