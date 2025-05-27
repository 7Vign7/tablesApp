import { makeAutoObservable} from "mobx";

class CounterStore {
    count = 0;

    get total(){
        return this.count * 2;
    }

    constructor() {
       makeAutoObservable(this);
    }

    increment(value:number) {
            this.count += value;
    }
    decrement(value:number) {
        this.count -= value;
    }
}
export default new CounterStore();