import { makeAutoObservable, runInAction } from "mobx";
import {getTables} from "../api/getTables.tsx";
import {fromPromise, type IPromiseBasedObservable} from "mobx-utils";
export class TableStore {
    mama = {}
    constructor() {
        makeAutoObservable(this);
    }
    getMim=  ()=>{
        this.mama = fromPromise(getTables())
        console.log(this.mama)
    }

}

export default new TableStore();