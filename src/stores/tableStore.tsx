import { makeAutoObservable, runInAction } from "mobx";
import {getLimitedTable} from "../api/get/getLimitedTable.tsx";
import type {Row} from "../types/table"
import {checkMaxNumberOfFields} from "../utils/utils.ts";

export class TableStore {
    table: Row[] = []
    isLoading: boolean = false;
    lastRow = 0;
    maxNumberOfFields:Row["numberOfFields"] = 5
    notNewRow = false;
    constructor() {
        makeAutoObservable(this);
    }

    getTable= async ()=>{
        if(this.isLoading)return;
        try{
            this.isLoading = true;
            const res = await getLimitedTable(this.lastRow)
            console.log(res.headers['x-total-count']);
            const newTable = [...this.table,...res];
            this.lastRow = newTable.length
            console.log(this.lastRow);
            runInAction(()=>{
                this.table = newTable
                if(this.maxNumberOfFields !== 15){
                    this.maxNumberOfFields = checkMaxNumberOfFields(this.maxNumberOfFields,res) //подумать куда грамотнее это можно засунуть, а то какой-то калхоз
                }
            })
        }
        catch(error){
            console.error(`Что-то не так с сервером:( Ошибка:${error}`)
        }
        finally {
            this.isLoading = false;
        }
    }
}

export default new TableStore();