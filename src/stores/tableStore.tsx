import { makeAutoObservable, runInAction } from "mobx";
import {getTables} from "../api/getTables.tsx";
import type {Row} from "../types/table"

export class TableStore {
    table: Row[] = []
    isLoading: boolean = false;
    maxNumberOfFields:Row["numberOfFields"] = 5
    constructor() {
        makeAutoObservable(this);
    }
    getMim= async ()=>{
        try{
            this.isLoading = true;
            const res = await getTables();
            runInAction(()=>{
                this.table = res;
                this.isLoading = false;
            })
        }
        catch(error){
            this.isLoading = false;
            console.error("Что-то не так с сервером:(",error)
        }
    }
}

export default new TableStore();