import { makeAutoObservable, runInAction } from "mobx";
import {getLimitedTable} from "../api/get/getLimitedTable.tsx";
import type {Row} from "../types/table"
import {checkMaxNumberOfFields} from "../utils/utils.ts";

export class TableStore {
    table: Row[] = []
    isLoading: boolean = false;
    errorTable: unknown = {};
    lastRow = 0;
    maxNumberOfFields:Row["numberOfFields"] = 5
    constructor() {
        makeAutoObservable(this);
    }
    getTable= async ()=>{
        try{
            this.isLoading = true;
            const res = await getLimitedTable(this.lastRow);
            this.lastRow = res.length;
            runInAction(()=>{
                this.table = res;
                console.log(this.table);
                if(this.maxNumberOfFields !== 15){ //{
                    this.maxNumberOfFields = checkMaxNumberOfFields(this.maxNumberOfFields,res) //подумать куда грамотнее это можно засунуть, а то какой-то калхоз
                } //}
                this.isLoading = false;
            })
        }
        catch(error){
            this.isLoading = false;
            this.errorTable = error;
            console.error(`Что-то не так с сервером:( Ошибка:${error}`)
        }
    }
    getNewRow= async ()=>{
        try {
            this.isLoading = true;
            const res = await getLimitedTable(this.lastRow);
            this.lastRow = this.lastRow + res.length;
            runInAction(()=>{
                this.table = [...this.table, ...res];
                console.log(this.table);
                if(this.maxNumberOfFields !== 15){ //{
                    this.maxNumberOfFields = checkMaxNumberOfFields(this.maxNumberOfFields,res) //подумать куда грамотнее это можно засунуть, а то какой-то калхоз
                } //}
                this.isLoading = false;
            })
        }catch(error){
            this.isLoading = false;
            this.errorTable = error;
            console.error(`Что-то не так с сервером:( Ошибка:${error}`)
        }
    }
}

export default new TableStore();