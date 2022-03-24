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
        this.interval = interval;
        this.setIntervalId = setInterval(()=>{
            if(this.condition()){
                clearInterval(this.setIntervalId);
                this.f();
            }
        }, this.interval);
    }
}


export default simpleTrier
